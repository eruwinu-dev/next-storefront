import type { NextApiRequest, NextApiResponse } from "next"
import FormData from "form-data"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    let images: string[] = []

    const formData = new URLSearchParams()
    formData.append("api_key", process.env.CLOUDINARY_API_KEY || "")
    formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET || "")
    formData.append("file", req.body)

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`,
        {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            mode: "cors",
            body: formData,
        }
    )

    const result = await response.json()

    res.status(200).send(req.body)
}

export default handler
