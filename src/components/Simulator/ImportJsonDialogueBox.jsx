import { useState } from "react";
import { ShinyButton } from "..";

const ImportJsonDialogueBox = ({ isVisible, handleClick, setData, setNoOfProcesses }) => {
  const [jsonData, setJSONData] = useState(null);

  const handleImport = () => {
    const data = JSON.parse(jsonData)
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
            placeholder="Enter the JSON Data"
            onChange={(e) => setJSONData(e.target.value)}
            className='text-left w-full text-gray-950 min-h-[150px] text-base focus:outline-none bg-transparent p-2 border border-black'
          />

          <ShinyButton
            className="text-xl border border-black px-3 py-2 bg-blue-300 ml-auto"
            onClick={handleImport}
          >
            Import
          </ShinyButton>
        </div>
      </div>
    </div>
  );
};

export default ImportJsonDialogueBox;
