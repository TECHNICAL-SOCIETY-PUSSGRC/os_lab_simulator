import { SignIn, SpringButton } from "..";
import { useUser, SignedOut, SignedIn } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { FaRegSave } from "react-icons/fa";
import axios from "axios";

const API_URL = import.meta.env.VITE_OS_LAB_SIMULATOR_API_URL;


const SaveDialogueBox = ({ isVisible=false, handleClick, data }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { user, isLoaded } = useUser();
  if (!isLoaded) {
    toast.error('Network Error!')
    handleClick()
    return null;
  }

  const saveData = async () => {
    try {
      const userName=user.username;
      const newInputData = { title, description, data };

      const res = await axios.post(`${API_URL}/saveInputData/${userName}`, newInputData)
      handleClick()

      setTitle('')
      setDescription('')
      return res.data.msg
    } catch (error) {
      console.log(error)
    }
  }

  const handleSave = () => {
    if(!title || !description) return toast.error('Title & Description are required!');

    const myPromise = saveData();

    toast.promise(myPromise, {
      loading: 'Loading',
      success: (msg) => msg,
      error: 'Error while saving!',
    });
  }


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
            <div className="flex flex-col min-w-[600px] rounded-xl text-xl px-10 py-10 gap-5 bg-white text-black">
              <div className="flex justify-center mb-3">
                <span className="flex flex-row items-center gap-3 text-[22px] border-b-2 border-black">
                  <FaRegSave />
                  Save Current Input
                </span>
              </div>
              
              <div className="flex flex-row justify-between items-center text-lg">
                <label htmlFor="title"> Title: </label>
                <input 
                  type="text" 
                  name="title"
                  id="title"
                  placeholder="Title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="min-w-[300px] text-base py-2 px-3 bg-transparent border border-black rounded-sm" 
                />
              </div>

              <div className="flex flex-row justify-between text-lg">
                <label htmlFor="description"> Description: </label>
                <textarea 
                  name="description"
                  id="description" 
                  type="text"
                  placeholder="Description" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-w-[300px] text-base py-2 px-3 bg-transparent border border-black rounded-sm" 
                />
              </div>

              <div className="flex justify-center">
                <SpringButton 
                  handleClick={handleSave} 
                  parentChildName="mt-5 border-black" 
                  childClassName="border-black text-black"
                > 
                  Save 
                </SpringButton>
              </div>
            </div>
          </SignedIn>
        </div>
      </div>
  )
}

export default SaveDialogueBox