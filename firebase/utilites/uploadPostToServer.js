import { db } from "../config";
import { collection, addDoc } from "firebase/firestore";

const uploadPostToServer = async (post) => {
  try {
    await addDoc(collection(db, "posts"), post);
    console.log("Post uploaded successfully!");
  } catch (error) {
    console.error("Error uploading post:", error);
  }
};

export default uploadPostToServer;
