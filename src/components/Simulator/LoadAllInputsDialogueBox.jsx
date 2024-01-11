import { SignIn, BookLoader } from "..";
import { useUser, SignedOut, SignedIn } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import LoadInputDialogueBox from "./LoadInputDialogueBox";
import axios from "axios";


const API_URL = import.meta.env.VITE_OS_LAB_SIMULATOR_API_URL;


const LoadAllInputsDialogueBox = ({ isVisible=false, handleClick, setData, setNoOfProcesses }) => {
  const [datasList, setDatasList] = useState([])
  const [isItemOpen, setIsItemOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(-1)
  
  const { isSignedIn, user, isLoaded } = useUser();
  if (!isLoaded) {
    toast.error('Network Error!')
    handleClick()
    return null;
  }

  const handleShowData = (ind) => {
    setIsItemOpen(true)
    setIndex(ind)
  }

  const handleLoad = async () => {
    setIsLoading(true)
    try{
      const userName=user.username;
      const res = await axios.get(`${API_URL}/getAllInputDatas/${userName}`)
      
      if(res.data.inputDatas.length) setDatasList(res.data.inputDatas)
      else{
        toast.error('No Saved Data Found!')
        handleClick()
      }
    } catch (error){
      console.log(error)
      toast.error('Error while loading!')
      handleClick()
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if(isLoaded && isSignedIn && isVisible) handleLoad()
  }, [isLoaded, isSignedIn, isVisible])
  

  return (
      <div 
        className={`absolute top-0 left-0 h-screen w-full z-[1000] bg-half-transparent ${isVisible? 'flex': 'hidden'} items-center justify-center`}
        onClick={handleClick}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <SignedOut>
            <SignIn redirectUrl='/simulator' />
          </SignedOut>

          <SignedIn>
            <div className="flex flex-col w-[600px] max-h-[80vh] rounded-xl text-xl p-6 gap-6 bg-white text-black overflow-y-auto">
              {isLoading?
                <div className="flex justify-center w-full">
                  <BookLoader />
                </div>
              : datasList.map(({ title, description, data }, index) => {
                return (
                  <button
                    key={index}
                    className="flex flex-row py-4 px-4 gap-5 items-center bg-gray-400 w-full rounded-xl"
                    onClick={() => handleShowData(index)}
                  >
                    <div className="flex flex-col gap-2 flex-grow-[1]">
                      <div className="flex w-full flex-row justify-between">
                        {title}
                        <span> No of Processes: {data.length} </span>
                      </div>

                      <div className="text-left w-full text-gray-950 text-lg overflow-hidden">
                        <span> {description.substring(0,100)} </span>
                        {(description.length > 100) && <>
                          &nbsp;
                          <span className="underline text-black text-xl">Know More...</span>
                        </>}
                      </div>
                    </div>

                    <FaChevronRight />
                  </button>
                )})
              }
            </div>

            {isItemOpen && (index >= 0 && index < datasList.length) && <LoadInputDialogueBox 
              isVisible={isItemOpen}
              handleClick={() => setIsItemOpen(false)}
              userName={user.username}
              title={datasList[index].title}
              description={datasList[index].description}
              data={datasList[index].data}
              index={index}
              refreshList={handleLoad}
              setData={setData}
              handleParentClick={handleClick}
              setNoOfProcesses={setNoOfProcesses}
            />}
          </SignedIn>
        </div>
      </div>
  )
}

export default LoadAllInputsDialogueBox