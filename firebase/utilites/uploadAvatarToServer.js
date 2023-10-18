import { storage } from "../config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const uploadAvatarToServer = async (photoUrl, fileId) => {
  const response = await fetch(photoUrl);
  const file = await response.blob();
  const storageRef = ref(storage, `avatars/${fileId}`);

  try {
    await uploadBytes(storageRef, file);
    console.log("File uploaded successfully!");
    return await getDownloadURL(ref(storage, `avatars/${fileId}`));
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
export default uploadAvatarToServer;
