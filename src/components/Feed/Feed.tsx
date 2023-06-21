import TweetBox from "./TweetBox";
import { TweetAPI, AddTweet } from "../../types/tweetAPI";
import useSWR from "swr";
import Tweet from "./Tweet";
import Menu from "./Menu";
import { useSession } from "next-auth/react";
import autoAnimate from "@formkit/auto-animate";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import SkeletonLoader from "./SkeletonLoader";
import sanity from "../../../sanity/lib/client-config";

const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());

export default function Feed() {
  const [apiIsLoading, setApiIsLoading] = useState(false); // disable input text when api is fetching (adding/deleting)
  const [tweets, setTweets] = useState<TweetAPI[]>([]); // store the fetch data from api to state

  const { data: session } = useSession();
  const parent = useRef(null); // for autoAnimate

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const {
    data: tweetsData,
    isLoading,
    error,
    mutate,
  } = useSWR("/api/getTweets", fetcher, {
    refreshInterval: 0,
    dedupingInterval: 0,
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  useEffect(() => {
    if (tweetsData) {
      setTweets(tweetsData);
    }
  }, [tweetsData]);

  useEffect(() => {
    const tweetQuery = '*[_type == "tweet"]';

    const tweetSubscription = sanity.listen(tweetQuery).subscribe((update) => {
      const tweets: any = update.result;
      mutate();
      if (tweets) {
        setTweets((prevTweets) => [tweets, ...prevTweets]);
        console.log("api updated!", tweets);
      } else {
        console.log("someone deleted", tweets);
      }
    });

    return () => {
      tweetSubscription.unsubscribe();
    };
  }, []);

  const addNewTweet = async (newTweet: AddTweet) => {
    setApiIsLoading(true);
    toast.success("New Tweet!", { duration: 1000 });
    try {
      const response = await fetch(`/api/addTweet`, {
        method: "post",
        body: JSON.stringify({ tweetInfo: newTweet }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        mutate();
      }
    } catch (error) {
      console.error(`[Feed.tsx] Failed to add tweet: ${error}`);
    } finally {
      setApiIsLoading(false);
    }
  };

  const deleteTweet = async (id: string) => {
    setApiIsLoading(true);
    try {
      const response = await fetch(`/api/deleteTweet`, {
        method: "post",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Tweet deleted successfully!", { duration: 1000 });
        mutate();
      } else {
        toast.error("Failed to delete tweet.", { duration: 1000 });
      }
    } catch (error) {
      console.error(`[Feed.tsx] Failed to delete tweet: ${error}`);
    } finally {
      setApiIsLoading(false);
    }
  };

  const renderTweets = () => {
    if (error) {
      console.error(error);
      return null;
    }

    return tweets.map((tweet: TweetAPI) => (
      <div key={tweet._id} className="relative duration-300 tweetPost">
        <Tweet key={tweet._id} tweet={tweet} />
        <div className="absolute right-5 top-3">
          {tweet.username === session?.user?.name && (
            <Menu onClick={() => deleteTweet(tweet._id)} />
          )}
        </div>
      </div>
    ));
  };

  return (
    <div
      id="twitter-feed"
      className="col-span-6 md:col-span-5 border-x border-[#eff3f4]"
    >
      <div>
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
      </div>

      <div>
        <TweetBox addNewTweet={addNewTweet} apiIsLoading={apiIsLoading} />
      </div>

      <div>
        <div className="tweet-feeds" ref={parent}>
          {!isLoading ? renderTweets() : <SkeletonLoader />}
        </div>
      </div>
    </div>
  );
}
