import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import UserCard from "./UserCard";
import { useSelector, useDispatch } from "react-redux";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + id,
        {},
        { withCredentials: true }
      );
      fetchRequests();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRequests = async () => {
    const response = await axios.get(BASE_URL + "/user/requests/received", {
      withCredentials: true,
    });
    dispatch(addRequests(response?.data?.requests));
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        No connections request found
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="flex text-2xl font-bold justify-center">Requests</h1>
      {requests.map((conn) => {
        return (
          <div
            className="flex flex-direction-column justify-center items-center gap-5 overflow-auto min-h-screen "
            key={conn._id}
          >
            <UserCard
              key={conn.fromUserId._id}
              user={conn.fromUserId}
              showButtons={false}
            />
            <div className="card-actions justify-center">
              <button
                className="btn btn-primary"
                onClick={() => reviewRequest("accepted", conn._id)}
              >
                Accept
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => reviewRequest("rejected", conn._id)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
