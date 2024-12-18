import React, { useState } from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    children?: React.ReactNode;
    labelText?: string;
    onSelect?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    fileTypes?: string[];
}

const FileInput = React.forwardRef<HTMLInputElement, IProps>(
    (
        {
            children,
            className,
            labelText,
            onChange,
            onSelect,
            error,
            fileTypes = [],
            ...props
        },
        ref
    ) => {
        const [fileName, setFileName] = useState("");

        function fileChangedHandler(e: any) {
            const file = e.target.files[0];
            if (file) {
                const fileType = file.type;
                const isValidType = fileTypes.length === 0 || fileTypes.includes(fileType);

                if (isValidType) {
                    setFileName(file.name);
                    onChange && onChange(e);
                    onSelect && onSelect(e);
                } else {
                    setFileName("");
                    alert("Invalid file type selected.");
                }
            }
        }

        return (
            <div className={className}>
                {labelText && (
                    <label className="block text-slate-700 text-xs lg:text-sm xl:text-base mb-2" htmlFor="txt">
                        {labelText}
                    </label>
                )}
                <label className={" w-full  relative border flex  rounded-md cursor-pointer  group"}>
                    <div
                        className={` inline-block h-full  py-3 rounded-l-md px-2  text-white transition duration-500  bg-slate-700 hover:bg-slate-800 hover:bg-gra  shadow shadow-violet-600/25 hover:shadow-primary-600/75`}>
                        <input
                            className="hidden"
                            ref={ref}
                            onChange={(e) => fileChangedHandler(e)}
                            accept={fileTypes.join(",")}
                            {...props}
                            type="file"
                        />
                        Upload File
                    </div>
                    <div className="mx-2 flex items-center"><span>{fileName}</span></div>
                </label>
                {error && <p className="text-red-600 text-right animate-shake">{error}</p>}
            </div>
        );
    }
);
FileInput.displayName = "FileInput";
export default FileInput;