export interface TweetAPI {
  _id: string;
  text: string;
  username: string;
  profileImg: string;
  image: string;
  _createdAt: string;
}

export interface AddTweet {
  username: string;
  profileImg: string;
  text: string;
  image: string;
};