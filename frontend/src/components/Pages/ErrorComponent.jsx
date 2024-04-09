import { toast } from "react-toastify";

const ErrorComponent = () => {
    toast.error("Error while fetching data");
    return (
        <div className="flex justify-center items-center my-8 text-2xl"><span>Oops!! Error while fetching data!</span></div>
    )
}

export default ErrorComponent