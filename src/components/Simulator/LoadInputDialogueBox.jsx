import { toast } from "react-hot-toast";
import { useState, useMemo } from "react";
import { Table } from '.';
import axios from "axios";
import ShinyButton from "../ShinyButton";

const API_URL = import.meta.env.VITE_OS_LAB_SIMULATOR_API_URL;


const LoadInputsDialogueBox = ({ isVisible=false, handleClick, userName, title: curTitle, description: curDescription, data: curData, index, refreshList, setData: setCurData, handleParentClick, setNoOfProcesses }) => {
  const columns = useMemo(() => [
    { Header: 'Process ID (Pid)', accessor: 'Pid' },
    { Header: 'Arrival Time (AT)', accessor: 'AT'},
    { Header: 'Burst Time (BT)', accessor: 'BT' },
    { Header: 'Priority (P)', accessor: 'P' },
  ], [])

  const [title, setTitle] = useState(curTitle);
  const [description, setDescription] = useState(curDescription);
  const [data, setData] = useState(curData);
  const [isEditing, setIsEditing] = useState(false);


  const handleEdit = () => {
    setIsEditing(true)
  }
  const deleteData = async () => {
    try {
      const res = await axios.delete(`${API_URL}/deleteInputData/${userName}/${index}`)
      refreshList()
      handleClick()

      return res.data.msg;
    } catch (error) {
      console.log(error)
    }
  }
  const handleDelete = () => {
    let myPromise = deleteData();

    toast.promise(myPromise, {
      loading: 'Loading...',
      success: (msg) => msg,
      error: 'Error while deleting!',
    });
  }
  const saveData = async () => {
    try{
      const updatedInputData = { title, description, data };
      const res = await axios.post(`${API_URL}/updateInputData/${userName}/${index}`, updatedInputData)
      setIsEditing(false)
      refreshList()

      return res.data.msg;
    } catch (error) {
      console.log(error);
    }
  }
  const handleSave = () => {
    if(!title || !description) return toast.error('Title & Description are required!');

    let myPromise = saveData();
    toast.promise(myPromise, {
      loading: 'Loading...',
      success: (msg) => msg,
      error: 'Error while updating!',
    });
  }
  const handleImport = () => {
    setCurData(data)
    setNoOfProcesses(data.length)
    handleClick()
    handleParentClick()
  }
  const handleCopy = () => {
    const copyData = data.map((process) => {
      return { 
        Pid: process.Pid, AT: process.AT, BT: process.BT, P: process.P
      }
    })
    navigator.clipboard.writeText(JSON.stringify(copyData))
    toast.success('Copied to clipboard!')
  }


  return (
    <div 
      className={`absolute top-0 left-0 h-screen w-full z-[1001] bg-half-transparent ${isVisible? 'flex': 'hidden'} items-center justify-center`}
      onClick={handleClick}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col min-w-[900px] min-h-[400px] rounded-xl text-xl px-10 py-10 gap-5 bg-gray-200 text-black">
            <div className="flex w-full flex-row gap-10 items-center">
                <input
                    value={title}
                    name="title"
                    id="title"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={!isEditing}
                    className={`focus:outline-none bg-transparent p-2 flex-grow-[1] ${isEditing && 'border border-black'}`}
                />
                <span> No of Processes: {data.length} </span>
            </div>

            <textarea
              value={description}
              name="description"
              id="description"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              disabled={!isEditing}
              className={`text-left w-full text-gray-950 text-lg overflow-hidden focus:outline-none bg-transparent p-2 ${isEditing? 'border border-black': 'resize-none'}`}
            />

            <div className="mt-5 text-base">
                <Table 
                    data={data} 
                    setData={setData}
                    columns={columns}
                    isDeleteRowAllowed={isEditing}
                    isDisableEditing={!isEditing}
                    thClassName='border-black'
                    crossClassName='hover:border-black hover:text-black'
                />
            </div>

            <div className="flex flex-row mt-5 justify-between">
              <div className="flex flex-row gap-3">
                <ShinyButton className="text-xl border border-black px-3 py-2 bg-red-400" onClick={handleDelete}>
                  Delete
                </ShinyButton>

                {isEditing?
                  <ShinyButton className="text-xl border border-black px-3 py-2 bg-green-400" onClick={handleSave}>
                    Save
                  </ShinyButton>
                :
                  <ShinyButton className="text-xl border border-black px-3 py-2 bg-yellow-200" onClick={handleEdit}>
                    Edit
                  </ShinyButton>
                }
              </div>

              <div className='flex flex-row gap-3'>
                <ShinyButton 
                  className="text-xl border border-black px-3 py-2 bg-violet-300" 
                  onClick={handleCopy}
                >
                  Copy
                </ShinyButton>

                <ShinyButton className="text-xl border border-black px-3 py-2 bg-blue-300" onClick={handleImport}>
                  Import
                </ShinyButton>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default LoadInputsDialogueBox