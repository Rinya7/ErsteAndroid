import { storage } from "../config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const uploadPhotoToServer = async (photoUrl, fileId) => {
  const response = await fetch(photoUrl);
  const file = await response.blob();
  const storageRef = ref(storage, `postImages/${fileId}`);

  try {
    await uploadBytes(storageRef, file);
    console.log("File uploaded successfully!");
    return (uploadFotoFromServer = await getDownloadURL(
      ref(storage, `postImages/${fileId}`)
    ));
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
export default uploadPhotoToServer;
