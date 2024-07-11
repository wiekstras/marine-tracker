import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

interface FormSuccesProps {
    message?: string;
}

export const FormSuccess = ({ message }: FormSuccesProps) => {
    if (!message) return null;

    return (
        <div className="bg-emerald-500/20 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
            <ExclamationTriangleIcon className="h-4 w-4"/>
            <p>{message}</p>
        </div>
    );
};