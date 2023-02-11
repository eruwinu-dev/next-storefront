import { StoreStatus } from "@prisma/client"
import React from "react"

type Props = {
    status: StoreStatus
    size?: string
}

const ValidationBadge = ({ status }: Props) => {
    return status === "VALIDATION" ? (
        <span className="badge badge-lg">For Validation</span>
    ) : (
        <span className="badge badge-lg badge-primary">Verified</span>
    )
}

export default ValidationBadge
