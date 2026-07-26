import { useState } from 'react'
import type { FormEvent } from "react";
import './App.css'

import orbit from "./assets/orbit_logo_var_neon_noBack.png";

function App() {
  const [text, setText] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(text);
    if(text!=""){
      setMessage("Message sent!");
    }else{
      setMessage("Please enter a message.");
    }
  };

  return (
    <div className="bg-black h-screen overflow-hidden">
      <h1 className="text-orange-500 text-4xl font-bold mt-4">
        Orbit
      </h1>
      <div className="flex justify-center mt-4">
        <img src={orbit} alt="Orbit"
          className="w-32 h-32 "
        />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-end gap-6 mt-40">
          <input className="border rounded px-3 py-2 text-gray-700 w-70"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Your text"
          />

          <button type="submit" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 rounded px-4 py-2 text-sm font-medium">
            Send
          </button>
        </div>

        {message && (
          <p className="text-green-500 text-center mt-4">{message}</p>
        )}
      </form>
    </div>
  );
}

export default App;