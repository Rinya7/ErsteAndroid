import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../../firebase/config";

const allPostByUser = async (setPosts) => {
  try {
    await onSnapshot(collection(db, "posts"), (data) =>
      setPosts(data.docs.map((doc) => ({ ...doc.data(), postId: doc.id })))
    );
  } catch (error) {
    console.error("Error download colection:", error);
  }
};

export default allPostByUser;
