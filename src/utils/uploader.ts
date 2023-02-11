const uploader = async (file: File) => {
    const formData = new FormData()
    formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
    )
    formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || "")
    formData.append("file", file)
    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
            method: "POST",
            body: formData,
            mode: "cors",
        }
    )
    const data = await response.json()
    return data.url
}

export default uploader
