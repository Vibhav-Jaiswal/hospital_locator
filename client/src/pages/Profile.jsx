import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../redux/userSlice";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleSignoutUser = async () => {
    try {
      await fetch("/api/auth/signout");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center py-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.profilePicture}
          alt="profile"
          className="h-24 w-24 self-center rounded-full object-cover mt-2"
        />
        <input
          type="text"
          placeholder="username"
          id="username"
          className="bg-slate-100 rounded-lg p-3"
          defaultValue={currentUser.username}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="bg-slate-100 rounded-lg p-3"
          defaultValue={currentUser.email}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="bg-slate-100 rounded-lg p-3"
          defaultValue={"*******************"}
        />
      </form>
      <div className="text-center mt-5">
        <span
          onClick={handleSignoutUser}
          className="text-red-700 cursor-pointer "
        >
          Sign out
        </span>
      </div>
    </div>
  );
};

export default Profile;
