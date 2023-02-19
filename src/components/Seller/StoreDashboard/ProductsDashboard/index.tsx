import useSellerContext from "@/context/SellerState"
import { useGetProducts } from "@/hooks/product/useGetProducts"
import useDebounce from "@/hooks/generic/useDebounce"
import React, { ChangeEvent, MouseEvent, useState } from "react"
import ProductDashboardItem from "./ProductDashboardItem"
import { CompleteProduct } from "@/types/store"

type Props = {}

const ProductsDashboard = ({}: Props) => {
    const { toggleSellerDialog } = useSellerContext()
    const [search, setSearch] = useState<string>("")
    const { data: products } = useGetProducts({
        role: "seller",
    })
    const [filteredProducts, setFilteredProducts] = useState<
        CompleteProduct[] | undefined
    >(products)

    useDebounce(
        () => {
            let regex = new RegExp(search, "i")
            if (!products) return
            setFilteredProducts(
                products.filter((product) => product.name?.match(regex))
            )
        },
        [products, search],
        250
    )

    const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    const openAddItemDialogHandler = (event: MouseEvent<HTMLButtonElement>) =>
        toggleSellerDialog("addProduct")

    return (
        <section className="grid grid-cols-4 grid-flow-row gap-8 h-fit rounded-xl bg-gray-50 shadow-lg p-4">
            <div className="lg:col-span-2 md:col-span-2 col-span-4 inline-flex items-center space-x-2">
                <h1 className="text-2xl font-bold">Products</h1>
                <button
                    type="button"
                    className="btn btn-sm btn-success"
                    onClick={openAddItemDialogHandler}
                >
                    Add Product
                </button>
            </div>
            <div className="lg:grid hidden col-span-1"></div>
            <div className="lg:col-span-1 md:col-span-2 col-span-4 inline-flex items-center">
                <input
                    type="text"
                    className="input input-sm input-bordered"
                    placeholder="Search products"
                    onChange={searchHandler}
                />
            </div>
            <div className="col-span-4 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid-flow-row gap-4">
                {filteredProducts && filteredProducts.length ? (
                    filteredProducts.map((product) => (
                        <ProductDashboardItem
                            key={product.id}
                            product={product}
                        />
                    ))
                ) : (
                    <div className="col-span-4 text-lg text-center p-4">
                        No items.
                    </div>
                )}
            </div>
        </section>
    )
}

export default ProductsDashboard
