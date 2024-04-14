import { useCallback, useEffect, useState, useRef } from 'react'


import './App.css'

const App = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null)

  const passwordRef = useRef(null) //Help to copy from the windows object


  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+"

  
    for(let i=0; i<length; i++){
      const index = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(index)
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed])


  const copyPasswordToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(password);
      passwordRef.current?.select() 
    } catch (error) {
      setErrorMessage('Failed to copy password. Please try again.'); 
    }
  }, [password]);


  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, charAllowed])
  

  return (
   <div className='w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat bg-wide bg-gradient-to-r from-fuchsia-500 to-cyan-500'>
     <div className='w-full'>
      <div className='w-full  bg-gray-800 text-orange-500 mx-auto max-h-40 max-w-md rounded-lg px-4 py-3 shadow-md my-4 '>
          <h1 className='text-white text-center my-3 '>Password Generator</h1>
          <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input 
              type="text" 
              value={password}
              className='outline-none w-full py-1 px-3'
              placeholder='Password'
              readOnly 
              ref={passwordRef}
            />
            <button 
            onClick={copyPasswordToClipboard}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
              copy
            </button>
          </div>
          {errorMessage && (
          <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
        )}
          <div className='flex text-sm gap-x-4'>
            <div className='flex items-center gap-x-1'>
              <input 
                type="range" 
                min={6}
                max={32}
                value={length}
                className='cursor-pointer'
                onChange={(e) => setLength(e.target.value)}
                name="" 
                id="" 
              />
              <label htmlFor="length">Length: {length}</label>
            </div>

            <div className='flex text-sm gap-x-2'>
              <div className='flex items-center gap-x-1'>
                <input 
                  type="checkbox" 
                  defaultChecked={charAllowed}
                  className='cursor-pointer'
                  onChange={() => {
                    setCharAllowed((prev) => !prev)
                  }}
                  id="characterInput" 
                />
                <label htmlFor="characterInput">Characters</label>
              </div>
            </div>

            <div className='flex items-center gap-x-1'>
              <input 
                type="checkbox" 
                defaultChecked={numberAllowed}
                onChange={() => {
                  setNumberAllowed((prev) => !prev)
                }} />
              <label htmlFor="numbers">Number</label>
            </div>
        </div>
      </div> 
    </div> 
   </div>  
  )
}

export default App;

