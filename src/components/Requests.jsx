import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import UserCard from "./UserCard";
import { useSelector, useDispatch } from "react-redux";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    const response = await axios.get(BASE_URL + "/user/requests/received", {
      withCredentials: true,
    });
    dispatch(addRequests(response?.data?.data));
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) {
    return <div>No connections request found</div>;
  }
  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="flex text-2xl font-bold justify-center">Requests</h1>
      {requests.map((conn) => {
        return (
          <div
            className="flex flex-direction-column justify-center items-center gap-5 mt-5 overflow-y-auto flex-1 overflow-auto "
            key={conn._id}
          >
            <UserCard key={conn._id} user={conn} showButtons={false} />
            <div className="card-actions justify-center">
              <button className="btn btn-primary">Accept</button>
              <button className="btn btn-secondary">Reject</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
