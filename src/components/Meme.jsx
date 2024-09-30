import { useState, useEffect } from "react";
import memesData from "../memesData";

export default function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "",
  });
  const [allMemes, setAllMemes] = useState(memesData);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        setAllMemes(data.data.memes);
      })
      .catch((error) => {
        console.error(
          "API fetch failed, falling back to imported memes:",
          error
        );
        // If the API fails, use the imported memes
        setAllMemes(memesData.data.memes);
      });
  }, []);

  const getRandomMeme = () => {
    if (allMemes.length === 0) return; // Ensure there are memes to select from
    const randomIndex = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomIndex].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  };

  return (
    <main className="flex flex-col items-center h-16 p-9 text-2xl mt-3">
      <div className="flex flex-row gap-4 ">
        <div>
          <label>
            Top Text
            <input
              type="text"
              className="border border-black rounded-md h-8 w-full mb-5"
              name="topText"
              value={meme.topText}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Bottom Text
            <input
              type="text"
              className="border border-black rounded-md h-8 w-full mb-5"
              name="bottomText"
              value={meme.bottomText}
              onChange={handleChange}
            />
          </label>
        </div>
      </div>
      <button
        onClick={getRandomMeme}
        className="w-[300px] h-30 p-4 mt-10 bg-fuchsia-700 text-white rounded-[5px] font-bold text-2xl mt-3 hover:bg-fuchsia-900"
      >
        Get a new meme image 🖼
      </button>
      <div className="relative w-[447px] mt-8">
        {meme.randomImage && (
          <img
            src={meme.randomImage}
            alt="Meme"
            className="max-w-full rounded-[3px]"
          />
        )}
        <h2 className="absolute w-[80%] text-center left-1/2 transform -translate-x-1/2 top-0 mt-3 px-1 meme-text">
          {meme.topText}
        </h2>
        <h2 className="absolute w-[80%] text-center left-1/2 transform -translate-x-1/2 bottom-0 mb-3 px-1 meme-text">
          {meme.bottomText}
        </h2>
      </div>
    </main>
  );
}
