import { db } from "../config";
import { doc, updateDoc } from "firebase/firestore";

const uploadLikesToServer = async (postId, likes, whoLiked) => {
  try {
    const postRef = doc(db, "posts", postId);

    await updateDoc(postRef, { likes, whoLiked });
    console.log("Likes added successfully!");
  } catch (error) {
    console.error("Error download colection:", error);
  }
};

const uploadTotalCommentsNumber = async (postId, totalComments) => {
  try {
    const postRef = doc(db, "posts", postId);

    await updateDoc(postRef, { totalComments });
    console.log("Comment added successfully!");
  } catch (error) {
    console.error("Error download colection:", error);
  }
};
export { uploadLikesToServer, uploadTotalCommentsNumber };
