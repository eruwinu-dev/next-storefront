import NextImage from "@/components/NextImage"
import { CompleteProduct } from "@/types/store"
import { priceFormatter } from "@/utils/priceFormatter"
import { priceRange } from "@/utils/priceRanger"
import Link from "next/link"
import React from "react"

type Props = {
    product: CompleteProduct
}

const ProductsGridItem = ({ product }: Props) => {
    const prices = product.variants
        .map((variant) => variant.price)
        .sort((price1, price2) => price1 - price2)

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
                <div className="grid grid-cols-1 grid-flow-row group-hover:bg-neutral group-hover:text-base-100 transition p-4 rounded-b-lg">
                    <div>
                        <span className="font-semibold">{product.name}</span>
                    </div>
                    <div>
                        <span className="text-lg font-bold">
                            &#8369;{priceRange(prices)}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductsGridItem
