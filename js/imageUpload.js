const uploadImageToImgBB = async (imageFile) => {
  try {
    const imgBBAPIKey = "15722e7d8f0b4b66dd4b14222730ae7b";
    const formData = new FormData();
    formData.append("image", imageFile);

    const imgBBUploadResponse = await fetch(
      `https://api.imgbb.com/1/upload?key=${imgBBAPIKey}`,
      {
        method: "POST",
        body: formData,
      }
    );

    // Check if the response is successful before accessing data
    if (imgBBUploadResponse.ok) {
      const responseData = await imgBBUploadResponse.json();
      if (responseData.data && responseData.data.url) {
        return responseData.data.url;
      } else {
        throw new Error("Invalid response format from ImgBB API");
      }
    } else {
      throw new Error("Failed to upload image to ImgBB API");
    }
  } catch (error) {
    // Handle errors here
    console.error("Error uploading image to ImgBB:", error.message);
    throw error; // rethrow the error if needed
  }
};
