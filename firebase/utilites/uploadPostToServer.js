import { db } from "../config";
import { collection, doc, addDoc, updateDoc, setDoc } from "firebase/firestore";

const uploadPostToServer = async (post, uploadFotoFromServer, fileId) => {
  try {
    await setDoc(doc(db, "posts", fileId), post);
    const postRef = doc(db, "posts", fileId);
    await updateDoc(postRef, { photo: uploadFotoFromServer });
    //await addDoc(collection(db, "posts"), post);

    console.log("Post uploaded successfully!");
  } catch (error) {
    console.error("Error uploading post:", error);
  }
};

export default uploadPostToServer;
