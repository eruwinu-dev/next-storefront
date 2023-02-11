import { ImageLoaderProps } from "next/image"

const normalizeSrc = (src: string) => {
    return src.split("/").slice(6).join("/")
}

const loader = ({ src, width, quality }: ImageLoaderProps) => {
    const params = ["f_auto", "w_" + width, "q_" + (quality || "auto")]
    return `https://res.cloudinary.com/${
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    }/image/upload/${params.join(",")}/${normalizeSrc(src)}`
}

export default loader
