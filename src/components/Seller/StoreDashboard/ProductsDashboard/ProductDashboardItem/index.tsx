import NextImage from "@/components/NextImage"
import { CompleteProduct } from "@/types/store"
import { priceRange } from "@/utils/priceRanger"
import Link from "next/link"
import React from "react"

type Props = {
    product: CompleteProduct
}

const ProductDashboardItem = ({ product }: Props) => {
    const prices = product.variants
        .map((variant) => variant.price)
        .sort((price1, price2) => price1 - price2)

    return (
        <Link href={`./${product.storeId}/product/${product.id}`}>
            <div className="w-full grid grid-cols-1 grid-flow-row group">
                <div className="relative w-full aspect-video bg-gray-200 rounded-t-lg">
                    {product.images.length ? (
                        <NextImage
                            src={product.images[0]}
                            alt={product.description}
                            className="rounded-t-lg"
                        />
                    ) : null}
                </div>
                <div className="w-full grid grid-cols-1 grid-flow-row gap-2 rounded-b-lg p-4 group-hover:bg-white">
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

export default ProductDashboardItem
