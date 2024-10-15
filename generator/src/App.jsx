import { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8); // Set default length
  const [includesNumbers, setIncludeNumbers] = useState(false);
  const [includesCharacters, setIncludeCharacters] = useState(false);
  const [displayPassword, setDisplayPassword] = useState('');
  const passwordRef = useRef(null);

  const handleRange = (e) => {
    setLength(e.target.value);
  };

  const handleCopy = () => {
    passwordRef.current?.select();
    navigator.clipboard.writeText(displayPassword);
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

  useEffect(() => {
    generatePassword();
  }, [length, includesNumbers, includesCharacters]);

  const generatePassword =useCallback( () => {
    const Characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*();:';
    const Numbers = '0123456789';
    let characterPool =Characters;

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
  },[includesCharacters, includesNumbers, length]);

  return (
    <>
      <div className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative">
        <div className="relative w-[600px] h-auto flex flex-col items-center p-6 bg-gradient-to-tr from-gray-700 to-gray-800 rounded-lg shadow-lg border-4 border-transparent hover:border-blue-400 transition-all duration-300 ease-in-out">
          {/* Backlight effect */}
          <div className="absolute inset-0 rounded-lg bg-blue-500 opacity-20 blur-2xl z-0"></div>

          <h1 className="text-4xl font-extrabold text-white mb-6 relative z-10">Radhe Radhe</h1>
          <h2 className="text-2xl text-yellow-300 relative z-10">Password Generator</h2>

          {/* Password input and copy button */}
          <div className="flex items-center gap-4 w-full relative z-10 mt-4">
            <input
              className="w-full rounded-md px-4 py-2 text-lg bg-gray-900 text-yellow-300 border border-gray-600 shadow-inner focus:outline-none hover:shadow-lg hover:scale-105 transition-all duration-200 ease-out"
              type="text"
              placeholder="Generated password..."
              value={displayPassword}
              readOnly
              ref={passwordRef}
            />
            <button
              className="px-4 py-2 rounded-md bg-yellow-300 text-gray-900 font-semibold transition-transform transform hover:scale-105 active:scale-95 hover:shadow-lg"
              onClick={handleCopy}
            >
              Copy
            </button>
          </div>

          {/* Range input and checkboxes */}
          <div className="w-full mt-6 flex flex-col space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-yellow-300">Length: {length}</span>
              <input
                className="w-2/3 cursor-pointer"
                type="range"
                min="4" max="32"
                value={length}
                onChange={handleRange}
              />
            </div>

            <div className="flex items-center space-x-4">
              <label className="text-yellow-300 flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="Numbers"
                  checked={includesNumbers}
                  onChange={handleCheckbox}
                  className="cursor-pointer"
                />
                <span>Numbers</span>
              </label>

              <label className="text-yellow-300 flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="Characters"
                  checked={includesCharacters}
                  onChange={handleCheckbox}
                  className="cursor-pointer"
                />
                <span>Characters</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
