import Layout from "@/components/Layout"
import { AdminProvider } from "@/context/AdminState"
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

export default function App({ Component, pageProps }: AppProps) {
    const { pathname } = useRouter()
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <SessionProvider session={pageProps.session}>
                    <Layout>
                        {["/admin"].includes(pathname) ? (
                            <AdminProvider>
                                <Component {...pageProps} />
                            </AdminProvider>
                        ) : (
                            <Component {...pageProps} />
                        )}
                    </Layout>
                </SessionProvider>
            </Hydrate>
        </QueryClientProvider>
    )
}
