import React, { Dispatch, MouseEvent, SetStateAction } from "react"
import Dropzone, { FileWithPath } from "react-dropzone"
import NextImage from "../NextImage"

type Props = {
    title: string
    files: File[]
    setFiles: Dispatch<SetStateAction<File[]>>
    multi?: boolean
}

const ImageDropzone = ({ title, files, setFiles, multi = true }: Props) => {
    const dropHandler = (newFiles: File[]) => {
        const filePaths = files.map((file: FileWithPath) => file.path)
        const uniqueFiles = newFiles
            .filter((file, index) => (multi ? true : index === 0))
            .filter((file: FileWithPath) => !filePaths.includes(file.path))
        setFiles((files) =>
            multi ? [...files, ...uniqueFiles] : [...uniqueFiles]
        )
    }

    const removeFileHandler =
        (path: string) => (event: MouseEvent<HTMLDivElement>) => {
            const newFiles = files.filter(
                (file: FileWithPath) => file.path !== path
            )
            setFiles(newFiles)
        }

    return (
        <div className="grid grid-cols-1 grid-flow-row gap-4">
            <Dropzone onDrop={dropHandler}>
                {({ getRootProps, getInputProps }) => (
                    <div>
                        <div className="mb-2">
                            <span className="text-sm font-semibold">
                                {title}
                            </span>
                        </div>
                        <div
                            {...getRootProps({
                                className:
                                    "border-2 rounded-lg text-center p-2 cursor-pointer hover:bg-neutral-100",
                            })}
                        >
                            <input {...getInputProps()} />
                            <p>{`Click or drag ${multi ? `` : `an`} image${
                                multi ? `s` : ``
                            } to upload`}</p>
                        </div>
                    </div>
                )}
            </Dropzone>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid-flow-row gap-4 aspect-video overflow-y-auto">
                {files.reverse().map((file: FileWithPath) => (
                    <div
                        className="group w-full h-auto aspect-square relative"
                        key={file.path}
                    >
                        <NextImage
                            src={URL.createObjectURL(file)}
                            alt={file.path || ""}
                            className="rounded-2xl"
                        />
                        <div
                            className="absolute top-0 left-0 z-[2] w-full h-auto aspect-square opacity-0 bg-gray-500/60 text-white group-hover:opacity-100 cursor-pointer grid grid-cols-1 place-items-center"
                            onClick={removeFileHandler(file.path || "")}
                        >
                            <div className="text-center">Click to remove</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ImageDropzone
