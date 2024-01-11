import { useState } from "react";
import { toast } from 'react-hot-toast'
import { ShinyButton } from "..";

const ImportJsonDialogueBox = ({ isVisible, handleClick, setData, setNoOfProcesses }) => {
  const [jsonData, setJSONData] = useState('');

  const handleImport = () => {
    let data;
    
    try {
      data = JSON.parse(jsonData)
    } catch (error) {
      console.log(error)
      toast.error('Invalid JSON Data!')
      return;
    }
    
    setData(data)
    setNoOfProcesses(data.length)
    setJSONData('')
    handleClick()
  }

  return (
    <div
      className={`absolute top-0 left-0 h-screen w-full z-[1001] bg-half-transparent ${
        isVisible ? "flex" : "hidden"
      } items-center justify-center`}
      onClick={handleClick}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col min-w-[600px] rounded-xl text-xl px-10 py-10 gap-5 bg-gray-200 text-black">
          <textarea
            value={jsonData}
            name="jsonData"
            id="jsonData"
            placeholder="Enter the JSON Data"
            onChange={(e) => setJSONData(e.target.value)}
            className='text-left w-full text-gray-950 min-h-[150px] text-base focus:outline-none bg-transparent p-2 border border-black'
          />

          <div className="flex flex-row gap-5 w-fit ml-auto">
            <ShinyButton className="text-xl border border-black px-3 py-2 bg-red-400" onClick={() => { setJSONData(''), handleClick() }}>
              Cancel
            </ShinyButton>

            <ShinyButton
              className="text-xl border border-black px-3 py-2 bg-blue-300 ml-auto"
              onClick={handleImport}
            >
              Import
            </ShinyButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportJsonDialogueBox;
