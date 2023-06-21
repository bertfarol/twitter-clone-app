const tweet = {
  title: "Tweet",
  name: "tweet",
  type: "document",
  fields: [
    {
      name: "text",
      title: "Text in Tweet",
      type: "string",
    },
    {
      name: "blockTweet",
      title: "Block Tweet",
      description: "ADMIN Controls: Toggle if Tweet is deemed inaappropriate",
      type: "boolean",
    },
    {
      name: "username",
      title: "Username",
      type: "string",
    },
    {
      name: "profileImg",
      title: "Profile image",
      type: "string",
    },
    {
      name: "image",
      title: "Tweet image",
      type: "string",
    },
    {
      name: "favorite",
      title: "Favorite",
      type: "number",
    },
  ],
};

export default tweet;
