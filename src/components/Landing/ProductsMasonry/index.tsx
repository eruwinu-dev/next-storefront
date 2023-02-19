import { useGetProducts } from "@/hooks/product/useGetProducts"
import React from "react"
import ProductsMasonryItem from "./ProductsMasonryItem"

type Props = {}

const ProductsMasonry = (props: Props) => {
    const { data: products } = useGetProducts({
        storeId: null,
        role: "user",
    })

    if (!products) return <></>

    return (
        <section className="grid grid-cols-1 grid-flow-row my-8">
            <div className="mb-2">
                <span className="font-semibold">Our Products</span>
            </div>
            <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-8">
                {products.map((product) => (
                    <ProductsMasonryItem key={product.id} product={product} />
                ))}
            </div>
        </section>
    )
}

export default ProductsMasonry
