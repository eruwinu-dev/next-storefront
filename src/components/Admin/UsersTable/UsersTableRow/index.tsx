import useAdminContext from "@/context/AdminState"
import { Role, User } from "@prisma/client"
import React, { ChangeEvent, FocusEvent, MouseEvent, useState } from "react"

type Props = {
    user: User
}

type EditUserSchema = {
    name: string
    role: string
}

const roles = ["USER", "SELLER", "ADMIN"]

const UsersTableRow = ({ user }: Props) => {
    const { selectUser, editUser, toggleAdminDialog } = useAdminContext()
    const [isEditing, setIsEditing] = useState<boolean>(false)

    const defaultValues = {
        name: user.name || "",
        role: user.role,
    }

    const [fields, setFields] = useState<EditUserSchema>(defaultValues)
    const [error, setError] = useState<boolean>(false)

    const changeFieldHandler =
        (prop: keyof EditUserSchema) =>
        (
            event:
                | ChangeEvent<HTMLInputElement>
                | ChangeEvent<HTMLSelectElement>
                | FocusEvent<HTMLInputElement>
        ) => {
            setError(!Boolean(event.target.value))
            setFields((fields) => ({ ...fields, [prop]: event.target.value }))
        }

    const resetFields = () => {
        setFields(defaultValues)
        setError(false)
    }

    const toggleSelectUser = (id: string | null) => (event: MouseEvent) => {
        setIsEditing((isEditing) => !isEditing)
        resetFields()
    }

    const editUserHandler = async (event: MouseEvent<HTMLButtonElement>) => {
        if (!fields.name || error) {
            setError(true)
            return
        }
        const completed = await editUser(
            user.id,
            fields.name,
            fields.role as Role
        )
        if (!completed) return
        resetFields()
        setIsEditing(false)
    }

    const openDeleteUserDialogHandler = (
        event: MouseEvent<HTMLButtonElement>
    ) => {
        selectUser(user.id)
        toggleAdminDialog("deleteUser")
    }

    return (
        <tr className="text-sm" key={user.id}>
            <td>{user.id}</td>
            <td>
                {isEditing ? (
                    <div className="w-full flex flex-col items-start justify-start space-y-2">
                        <input
                            type="text"
                            placeholder="New Name"
                            value={fields.name}
                            className={[
                                "input input-sm input-bordered",
                                error ? "input-error" : "",
                            ].join(" ")}
                            onChange={changeFieldHandler("name")}
                            onBlur={changeFieldHandler("name")}
                        />
                        {error && <p className="error-message">Required</p>}
                    </div>
                ) : (
                    <span>{user.name}</span>
                )}
            </td>
            <td>{user.email}</td>
            <td>
                {isEditing ? (
                    <select
                        id="role"
                        value={fields.role}
                        onChange={changeFieldHandler("role")}
                    >
                        {roles.map((role) => (
                            <option
                                key={role}
                                value={role}
                                className="capitalize"
                            >
                                {role}
                            </option>
                        ))}
                    </select>
                ) : (
                    <span>{user.role}</span>
                )}
            </td>
            <td>
                <div className="inline-flex items-center justify-end space-x-2">
                    {isEditing ? (
                        <>
                            <button
                                type="button"
                                className="btn btn-sm btn-square btn-ghost"
                                onClick={editUserHandler}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                className="btn btn-sm btn-square btn-ghost"
                                onClick={toggleSelectUser(null)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                </svg>
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                type="button"
                                className="btn btn-sm btn-square btn-ghost"
                                onClick={toggleSelectUser(user.id)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path
                                        fillRule="evenodd"
                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                    />
                                </svg>
                            </button>
                            <button
                                type="button"
                                className="btn btn-sm btn-outline btn-square btn-accent"
                                onClick={openDeleteUserDialogHandler}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>
            </td>
        </tr>
    )
}

export default UsersTableRow
