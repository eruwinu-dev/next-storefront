import BaseDialog from "@/components/BaseDialog"
import React, { MouseEvent } from "react"
import useUserContext from "@/context/Userstate"
import { signIn } from "next-auth/react"

type Props = {}

const PromptSignInDialog = (props: Props) => {
    const {
        userDialog: { promptSignIn: promptSignInDialog },
        toggleUserAction,
        toggleUserDialog,
    } = useUserContext()

    const toggleAddStoreDialogHandler = () => {
        toggleUserDialog("promptSignIn")
        setTimeout(() => toggleUserAction("promptSignIn", "IDLE"), 500)
    }

    const signInHandler = async (event: MouseEvent<HTMLButtonElement>) =>
        await signIn("google")

    return (
        <BaseDialog
            isOpen={promptSignInDialog}
            onClose={toggleAddStoreDialogHandler}
            closeOnBlur={false}
            size="max-w-lg"
            title=""
        >
            <div className="w-9/12 mx-auto grid grid-cols-1 grid-flow-row gap-8 my-4">
                <h1 className="text-6xl font-serif font-extrabold text-center">
                    S
                </h1>
                <h2 className="text-3xl font-bold text-center font-serif">
                    Your lowkey marketplace.
                </h2>
                <p className="font-serif text-center">
                    Storefront is your one-stop store to get an unforgetable
                    shopping experience.
                </p>
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={signInHandler}
                >
                    Continue with Google
                </button>
            </div>
        </BaseDialog>
    )
}

export default PromptSignInDialog
