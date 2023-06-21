import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { AddTweet } from "../../types/tweetAPI";

interface TweetBoxProps {
  addNewTweet: (tweet: AddTweet) => void;
  apiIsLoading: boolean;
}

export default function TweetBox({ addNewTweet, apiIsLoading }: TweetBoxProps) {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [image, setImage] = useState("");
  const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState(false);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const newTweet = {
      text: input,
      username: session?.user?.name || "Unknown User",
      profileImg: session?.user?.image || "https://links.papareact.com/gll",
      image: image,
    };
    addNewTweet(newTweet);

    setInput("");
    setImage("");
    setImageUrlBoxIsOpen(false);
  };

  const handleImageToTweet = () => {};

  return (
    <div className="flex px-5 py-3 space-x-2 border-b border-[#eff3f4]">
      <img
        className="object-cover w-12 h-12 mt-4 rounded-full"
        src={session?.user?.image || "https://links.papareact.com/gll"}
        alt=""
      />

      <div className="flex items-center flex-1 pl-2">
        <form className="flex flex-col flex-1">
          <input
            disabled={apiIsLoading}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="What's Happening?"
            className="h-24 text-xl outline-none placeholder:text-xl"
          />
          <div className="flex items-center">
            <div className="flex flex-1 space-x-2 text-twitter">
              <PhotographIcon
                onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)}
                className="w-8 h-8 p-1 transition-transform duration-150 ease-out rounded-full cursor-pointer text-twitter hover:bg-twitter/10"
              />
              <EmojiHappyIcon className="w-8 h-8 p-1 transition-transform duration-150 ease-out rounded-full cursor-pointer text-twitter hover:bg-twitter/10" />
              <CalendarIcon className="w-8 h-8 p-1 transition-transform duration-150 ease-out rounded-full cursor-pointer text-twitter hover:bg-twitter/10" />
              <LocationMarkerIcon className="w-8 h-8 p-1 transition-transform duration-150 ease-out rounded-full cursor-pointer text-twitter hover:bg-twitter/10" />
            </div>

            <button
              onClick={handleSubmit}
              disabled={apiIsLoading || !session || !input}
              className="px-5 py-2 font-bold text-white rounded-full bg-twitter disabled:opacity-40"
            >
              Tweet
            </button>
          </div>

          {imageUrlBoxIsOpen && (
            <div>
              <form className="flex px-4 py-2 mt-5 rounded-lg bg-twitter/80">
                <input
                  // ref={imageInputRef}
                  className="flex-1 p-2 text-white bg-transparent outline-none placeholder:text-white"
                  type="text"
                  placeholder="Enter image URL..."
                />
                <button
                  type="submit"
                  onClick={handleImageToTweet}
                  className="font-bold text-white"
                >
                  Add Image
                </button>
              </form>
            </div>
          )}

          {image && (
            <img
              className="object-contain w-full h-40 mt-10 shadow-lg rounded-xl"
              src={image}
              alt=""
            />
          )}
        </form>
      </div>
    </div>
  );
}
