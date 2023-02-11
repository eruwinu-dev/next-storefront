import NextImage from "@/components/NextImage"
import { priceFormatter } from "@/utils/priceFormatter"
import { Product } from "@prisma/client"
import Link from "next/link"
import React from "react"

type Props = {
    product: Product
}

const ProductsGridItem = ({ product }: Props) => {
    return (
        <Link href={`product/${product.id}`}>
            <div className="w-full rounded-lg grid-grid-cols-1 grid-flow-row gap-2 cursor-pointer transition group">
                <div className="relative w-full aspect-video bg-gray-300 rounded-t-lg">
                    {product.images.length ? (
                        <NextImage
                            src={product.images[0]}
                            alt={product.description}
                            className="rounded-t-lg transition"
                        />
                    ) : null}
                </div>
                <div className="grid grid-cols-1 grid-flow-row group-hover:bg-white p-4 rounded-b-lg">
                    <div>
                        <span className="font-semibold">{product.name}</span>
                    </div>
                    <div>
                        <span className="text-lg font-bold">
                            {priceFormatter.format(product.price)}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductsGridItem
