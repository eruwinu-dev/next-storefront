import Layout from "@/components/Layout"
import { AdminProvider } from "@/context/AdminState"
import { SellerProvider } from "@/context/SellerState"
import "@/styles/globals.css"
import {
    Hydrate,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import { useState } from "react"

import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { UserProvider } from "@/context/UserState"

export default function App({ Component, pageProps }: AppProps) {
    const { pathname } = useRouter()
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <SessionProvider session={pageProps.session}>
                    {["/admin"].includes(pathname) ? (
                        <AdminProvider>
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </AdminProvider>
                    ) : pathname.match("/seller") ? (
                        <SellerProvider>
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </SellerProvider>
                    ) : (
                        <UserProvider>
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </UserProvider>
                    )}
                    <ReactQueryDevtools initialIsOpen={false} />
                </SessionProvider>
            </Hydrate>
        </QueryClientProvider>
    )
}
