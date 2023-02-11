import loader from "@/utils/loader"
import Image from "next/image"
import React from "react"

type Props = {
    src: string
    alt: string
    className?: string
    fill?: boolean
}

const NextImage = ({ src, alt, className = "" }: Props) => {
    return (
        <Image
            src={src}
            alt={alt}
            className={className}
            fill
            loader={loader}
            sizes="(max-width: 768px) 100vw,
							(max-width: 1200px) 50vw,
							33vw"
        />
    )
}

export default NextImage
