const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
};

const performMutation = (mutations: any) => {
  try {
    const response = fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/data/mutate/production`,
      {
        headers,
        method: "post",
        body: JSON.stringify({ mutations }),
      }
    );
    return response;
  } catch (error) {
    throw new Error("Error mutating data");
  } 
};

type AddTweet = {
  username: string;
  profileImg: string;
  text: string;
  image: string;
};

export const addTweet = async ({
  username,
  profileImg,
  text,
  image,
}: AddTweet) => {

  const mutations = [
    {
      create: {
        _type: "tweet",
        text: text,
        username: username,
        blockTweet: false,
        profileImg: profileImg,
        image: image,
      },
    },
  ];

  return performMutation(mutations);
};
export const deleteTweet = async (tweetId: string) => {
   const mutations = [{ delete: { id: tweetId } }];
  return performMutation(mutations);
};