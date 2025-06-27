import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostCreate = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Important to prevent default form submission
    try {
      const res = await axios.post("http://localhost:5000/api/property/", {
        title,
        description: desc,
        price,
        address,
      });
      if (res.status === 201) {
        toast.success("Property created successfully!");
        setTitle("");
        setDesc("");
        setPrice("");
        setAddress("");
        navigate("/properties");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong, please try again."
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Create a Property Post
        </h2>

        <div className="flex flex-col">
          <label htmlFor="title" className="mb-1 text-sm text-gray-600">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="desc" className="mb-1 text-sm text-gray-600">
            Description
          </label>
          <textarea
            id="desc"
            placeholder="Describe the property"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="address" className="mb-1 text-sm text-gray-600">
            Address
          </label>
          <input
            id="address"
            type="text"
            placeholder="Property address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="price" className="mb-1 text-sm text-gray-600">
            Price
          </label>
          <input
            id="price"
            type="number"
            placeholder="Price in USD"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostCreate;
