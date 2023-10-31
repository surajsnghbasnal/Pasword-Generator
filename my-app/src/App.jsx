import React, { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  let [length, setLength] = useState(8);
  let [numberAllowed, setNumberAllowed] = useState(false);
  let [charAllowed, setCharAllowed] = useState(false);
  let [password, setPassword] = useState("");
  let [copy, setCopy] = useState("Copy");
  let [isCopy, setIsCopy] = useState(false);
  let [isModify, setIsModify] = useState(false);


  //useRef hook
  let passRef = useRef(null);
  let copyPassToClip = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  let changeHtml = useCallback(() => {
    setCopy("Copied");
  }, [password, setPassword]);

  let handleBtnClick = () => {
    copyPassToClip();
    changeHtml();
  };


  const pwGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    pwGenerator();
  }, [length, numberAllowed, charAllowed]);

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4  bg-gray-700 ">
        <h1 className="text-orange-500 text-center my-3">Password Generator</h1>
        <div className="flex shadow-md rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="text-orange-500 outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passRef}
          ></input>
          <button
            onClick={handleBtnClick}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            id="copy"
          >
            {copy}
          </button>  


          </div>
          <div className="flex text-sm gap-x-2">
            <div className=" flex items-center gap-x-1">
              <input
                type="range"
                min={8}
                max={100}
                value={length}
                className="cursor-pointer"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label className="text-orange-500"> Length:{length}</label>
            </div>
            <div className=" flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label className="text-orange-500" htmlFor="numberInput">
                Numbers
              </label>
            </div>
            <div className=" flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="CharInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label className="text-orange-500" htmlFor="CharInput">
                Characters
              </label>
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
