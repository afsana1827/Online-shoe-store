import axios from "axios";

export const uploadImages = async (
  file: File,
  setUploadProgress: any,
  folder: string
) => {
  try {
    setUploadProgress(0);
    const res = await fetch("/api/s3/getSignedUrl", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Key: file.name,
        Type: file.type,
        Folder: folder,
      }),
    });

    const { url } = await res.json();
    const options = {
      headers: {
        "Content-Type": file.type,
      },
      onUploadProgress(progressEvent: any) {
        setUploadProgress(
          Math.floor((progressEvent.loaded / progressEvent.total) * 100)
        );
      },
    };
    let data = new FormData();
    data.append("file", file);
    await axios.put(url, file, options);

    return {
      success: 1,
      url: url?.split("?")[0],
    };
  } catch (err) {
    console.error({ err });
  }
};
