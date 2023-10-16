//import {onSnapshot, collection } from "firebase/firestore";
//import { db } from "../config";

//const allPostByUser = async () => {
//  try {
//    await onSnapshot(collection(db, "posts"), (data) =>
//      data.docs.map((doc) => console.log({ ...doc.data(), id: doc.id }))
//    );
//  } catch (error) {
//    console.error("Error download colection:", error);
//  }
//};
//export default allPostByUser;
