import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import UserCard from "./UserCard";
const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(result?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  if (!feed) return;
  if (feed.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        No new user found!!!
      </div>
    );
  }
  return (
    feed && (
      <div className="flex flex-1 justify-center items-center min-h-screen overflow-auto m-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
