import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("Success");
  } catch (error) {
    console.error(`Error : ${error.message}`);
    process.exit(1);
  }
};
export default connectDB;
