import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import UserCard from "./UserCard";
import { useSelector, useDispatch } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    const response = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });
    dispatch(addConnection(response?.data?.data));
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        No connections found
      </div>
    );
  }
  return (
    <>
      <h1 className="flex text-2xl font-bold justify-center">Connections</h1>
      <div className="flex justify-center flex-direction-column mt-10 h-[400px] overflow-y-auto gap-5">
        {connections.map((conn) => {
          return (
            <div key={conn._id} className="flex justify-center gap-5">
              <UserCard key={conn._id} user={conn} showButtons={false} />
              <Link to={"/chat/" + conn._id}>
                <button className="btn btn-primary">Chat</button>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Connections;
