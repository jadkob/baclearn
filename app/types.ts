export interface Course {
  _id: String;
  name: String;
  description: String;
  ytLink: String;
  likes: Number;
  likedUsers: Array<String>;
  watchedUsers: Array<String>;
  createdAt: Date;
}
