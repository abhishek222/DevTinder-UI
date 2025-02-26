import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSigneUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [about, setAbout] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [gender, setGender] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const handleLogin = async () => {
    try {
      const result = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(result.data));
      navigate("/");
    } catch (error) {
      setError("Invalid credentials");
      console.log(error);
    }
  };

  const handleCreateProfile = async () => {
    try {
      await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
          age,
          about,
          photoUrl,
          gender,
        },
        { withCredentials: true }
      );
      setSuccessMessage(true);
      setIsSignUp(false);
      setTimeout(() => {
        setSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!isSigneUp && (
        <div className="flex justify-center items-center h-screen">
          <div className="card bg-base-200 w-96 shadow-xl">
            <div className="card-body gap-2">
              <h2 className="card-title justify-center">Login</h2>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Email ID</span>
                  </div>
                  <input
                    type="text"
                    value={emailId}
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setEmailId(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Password</span>
                  </div>
                  <input
                    value={password}
                    type="password"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
              </div>
              <p className="text-xs text-center text-red-500">{error}</p>
              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary" onClick={handleLogin}>
                  Login
                </button>
              </div>
              <p className="text-center">
                New User ?...{" "}
                <u className="cursor-pointer" onClick={() => setIsSignUp(true)}>
                  Sign Up here
                </u>
              </p>
            </div>
          </div>
        </div>
      )}
      {isSigneUp && (
        <div className="flex justify-center items-center m-10 min-h-screen">
          <div className="card bg-base-200 w-96 shadow-xl">
            <div className="card-body gap-2">
              <h2 className="card-title justify-center">Sign Up</h2>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    value={lastName}
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">EmailId:</span>
                  </div>
                  <input
                    value={emailId}
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setEmailId(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Password</span>
                  </div>
                  <input
                    value={password}
                    type="password"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">About</span>
                  </div>
                  <textarea
                    className="textarea textarea-bordered"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  ></textarea>
                </label>
              </div>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <select
                    className="select select-bordered w-full max-w-xs"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option>male</option>
                    <option>female</option>
                    <option>other</option>
                  </select>
                </label>
              </div>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Photo URL</span>
                  </div>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>
              </div>
              {/* <p className="text-xs text-center text-red-500">{error}</p> */}
              <div className="card-actions justify-center m-2">
                <button
                  className="btn btn-primary"
                  onClick={handleCreateProfile}
                >
                  Sign Up
                </button>
              </div>
              <p className="text-center">
                Existing User ?...{" "}
                <u
                  className="cursor-pointer"
                  onClick={() => setIsSignUp(false)}
                >
                  Login here
                </u>
              </p>
            </div>
          </div>
        </div>
      )}
      {successMessage && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile created successfully!! Plese Login.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
