import React from "react";
import PropertyDetails from "./PropertyDetails";
import { IoAddCircle } from "react-icons/io5";
import PostCreate from "../components/PostCreate";
import { useState } from "react";

const Home = () => {
  const [post, setPost] = useState(false);

  return (
    <div className="flex flex-col items-center gap-5 justify-center min-h-screen">
      
      {!post ? (
        <button
          onClick={() => setPost((prev) => !prev)}
          className="bg-blue-500 w-1/2 py-4 mt-10 text-white rounded text-center flex items-center justify-center gap-2"
        >
          <IoAddCircle size={25} />
          Create Post
        </button>
      ) : (
        <PostCreate />
      )}
    </div>
  );
};
export default Home;
