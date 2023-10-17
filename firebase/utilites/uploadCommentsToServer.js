import { db } from "../config";
import { doc, collection, addDoc } from "firebase/firestore";

const uploadCommentsToServer = async (
  postId,
  comment,
  nickName,
  dateWriteComment,
  avatar
) => {
  try {
    const postRef = doc(db, "posts", postId);
    const commentsCollection = collection(postRef, "comments");
    await addDoc(commentsCollection, {
      comment,
      nickName,
      dateWriteComment,
      avatar,
    });
    console.log("Comment added successfully!");
  } catch (error) {
    console.error("Error download colection:", error);
  }
};
export default uploadCommentsToServer;
