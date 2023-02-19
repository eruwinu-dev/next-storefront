import { useGetProducts } from "@/hooks/product/useGetProducts"
import React from "react"
import ProductsGridItem from "./ProductsGridItem"

type Props = {}

const ProductsGrid = (props: Props) => {
    const { data: products } = useGetProducts({
        storeId: null,
        role: "user",
    })

    if (!products) return <></>

    return (
        <section className="grid grid-cols-1 grid-flow-row gap-4 p-4">
            <div className="grid grid-cols-2 grid-flow-row place-content-end gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Products</h1>
                </div>
                <div></div>
            </div>
            <div className="col-span-2 grid grid-cols-4 grid-flow-row gap-4">
                {products.length ? (
                    products.map((product) => (
                        <ProductsGridItem key={product.id} product={product} />
                    ))
                ) : (
                    <div className="col-span-4">
                        <h1>No products.</h1>
                    </div>
                )}
            </div>
        </section>
    )
}

export default ProductsGrid
