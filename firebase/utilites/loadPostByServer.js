import { onSnapshot, collection, getDoc, doc } from "firebase/firestore";
import { db } from "../config";

const allPostByServer = async (setPosts) => {
  try {
    await onSnapshot(collection(db, "posts"), (data) =>
      setPosts(data.docs.map((doc) => ({ ...doc.data(), postId: doc.id })))
    );
  } catch (error) {
    console.error("Error download colection:", error);
  }
};

const loadPostByIdFromServer = async (postId) => {
  try {
    const docSnap = await getDoc(doc(db, "posts", postId));
    return(docSnap.data());
  } catch (error) {
    console.error("Error download colection:", error);
  }
};

export { allPostByServer, loadPostByIdFromServer };
