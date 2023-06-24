import { useState } from "react";
import {
  ChatAlt2Icon,
  DownloadIcon,
  HeartIcon,
  SwitchHorizontalIcon,
} from "@heroicons/react/outline";
import { TweetAPI } from "../../types/tweetAPI";

interface TweetProps {
  tweet: TweetAPI;
}

export default function Tweet({ tweet }: TweetProps) {
  const [commentBoxVisible, setCommentBoxVisible] = useState(false);
  const [favorite, setFavorite] = useState(0);

  return (
    <div className="flex flex-col px-5 py-3 space-x-3 border-b border-[#eff3f4]">
      <div className="flex space-x-3">
        <img
          className="object-cover w-12 h-12 rounded-full"
          src={tweet.profileImg}
          alt={tweet.username}
        />

        <div className="w-full">
          <div className="flex justify-between">
            <div className="flex items-center space-x-1">
              <p className="mr-1 font-bold capitalize">{tweet.username}</p>
              <p className="hidden text-gray-500 sm:inline">
                @{tweet.username.replace(/\s+/g, "").toLowerCase()} ·
              </p>
              1m
            </div>
          </div>
          <p>{tweet.text}</p>
          {tweet.image && (
            <div className="h-[350px]">
              <img
                src={tweet.image}
                alt=""
                className="object-contain h-full object-top m-2.5 mb-1 ml-0 rounded-lg shadow-sm"
              />
            </div>
          )}

          <div className="flex justify-between max-w-[425px] pt-3 select-none">
            <div
              // onClick={() => session && setCommentBoxVisible(!commentBoxVisible)}
              className="flex items-center space-x-3 text-xs text-gray-400 cursor-pointer animate-number"
            >
              <ChatAlt2Icon className="w-5 h-5" />
              <p>0</p>
            </div>

            <div className="flex items-center space-x-3 text-xs text-gray-400 cursor-pointer">
              <SwitchHorizontalIcon className="w-5 h-5" />
            </div>

            <div
              // onClick={handleFavorite}
              className="flex items-center space-x-3 text-xs text-gray-400 cursor-pointer"
            >
              <HeartIcon className="w-5 h-5" />
              <p>{favorite}</p>
            </div>

            <div className="flex items-center space-x-3 text-xs text-gray-400 cursor-pointer">
              <DownloadIcon className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
