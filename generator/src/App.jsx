import { useState, useEffect } from 'react';
import { Switch } from "@material-tailwind/react";
import './App.css';

function App() {
  const [isRotating, setIsRotating] = useState(true); // State to control rotation
  const [length, setLength] = useState(8); // Set default length
  const [includesNumbers, setIncludeNumbers] = useState(false);
  const [includesCharacters, setIncludeCharacters] = useState(false);
  const [displayPassword, setDisplayPassword] = useState('');
  const [theme, setTheme] = useState('dark'); // State to manage theme (light or dark)

  const handleDivClick = () => {
    setIsRotating(!isRotating);
    console.log(isRotating); // Log state value to check if it toggles
  };

  const handleRange = (e) => {
    setLength(e.target.value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(displayPassword)
      .then(() => {
        alert('Password copied successfully');
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  };

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    if (name === 'Numbers') {
      setIncludeNumbers(checked);
    }
    if (name === 'Characters') {
      setIncludeCharacters(checked);
    }
  };

  const handleThemeToggle = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    generatePassword();
  }, [length, includesNumbers, includesCharacters]);

  // Apply the theme by adding or removing a class from the body element
  useEffect(() => {
    document.body.classList.toggle('light-theme', theme === 'light');
  }, [theme]);

  const generatePassword = () => {
    const Characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*();:';
    const Numbers = '0123456789';
    let characterPool = Characters;

    if (includesCharacters) {
      characterPool = Characters;
    }
    if (includesNumbers) {
      characterPool += Numbers;
    }
    let password = '';
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * characterPool.length);
      password += characterPool[index];
    }
    setDisplayPassword(password);
  };

  return (
    <>
      <div className="h-screen w-full flex items-center justify-center relative">
        <div
          className={`w-[800px] h-auto flex inset-0 flex-col items-center p-0 bg-gradient-to-r from-black to-red-500 rounded-md shadow-lg z-10 border-t-2 border-l-2 border-yellow-400 relative ${isRotating ? 'animate-rotate' : ''}`}
          onClick={handleDivClick}
        >
          {/* Backlight effect */}
          <div className="absolute inset-0 rounded-lg bg-orange-500 opacity-40 shadow-2xl blur-2xl z-0"></div>

          <h1 className="pt-4 font-bold text-white text-4xl mb-4 relative z-10">Radhe Radhe</h1>
          <h2 className="text-2xl text-yellow-200 relative z-10">Password Generator</h2>

          {/* Password input and copy button */}
          <div className="flex items-center gap-4 relative z-10">
            <input
              className="mt-6 rounded-md px-4 py-2 bg-white text-black border border-gray-300 shadow-sm focus:outline-none transition duration-200 cursor-pointer hover:border-yellow-400 hover:border-r-2 hover:border-b-2 hover:border-l-2 hover:shadow-lg hover:scale-105 hover:bg-blue-500"
              type="text"
              placeholder="password ...."
              onClick={(e) => e.stopPropagation()}
              value={displayPassword}
              readOnly
            />
            <button
              className="mt-6 rounded-md px-4 py-2 cursor-pointer bg-white text-black border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-blue-300 transition duration-200 hover:bg-blue-500"
              onClick={handleCopy}
            >
              Copy
            </button>
          </div>

          {/* Range input and checkboxes */}
          <div className="range flex justify-between mt-4 w-full text-white relative z-10">
            <div className="flex p-4 gap-x-2">
              <input
                className="cursor-pointer"
                type="range"
                min="4" max="32"
                value={length}
                onClick={(e) => e.stopPropagation()}
                onChange={handleRange}
              />
              <span className="text-white">Length ({length})</span>
            </div>
            <div className="flex p-4 gap-x-2">
              <input
                type="checkbox"
                name="Numbers"
                className="cursor-pointer"
                checked={includesNumbers}
                onChange={handleCheckbox}
                onClick={(e) => e.stopPropagation()}
              />
              <span>Numbers</span>
            </div>
            <div className="flex p-4 gap-x-2">
              <input
                type="checkbox"
                name="Characters"
                className="cursor-pointer"
                checked={includesCharacters}
                onChange={handleCheckbox}
                onClick={(e) => e.stopPropagation()}
              />
              <span>Characters</span>
            </div>
          </div>

          {/* Theme toggle button */}
          <button
            className="mt-6 rounded-md px-4 py-2 z-40 m-4  cursor-pointer bg-white text-black border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-blue-300 transition duration-200 hover:bg-blue-500"
            onClick={(e) => {
              e.stopPropagation(); // Prevents triggering the div's onClick
              handleThemeToggle(); // Toggles the theme
            }}
          >
            Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
