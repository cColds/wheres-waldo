import { FaCircleCheck, FaCircleExclamation } from "react-icons/fa6";
import NotificationDetails from "../types/notificationDetails";
type NotificationProps = {
    notificationDetails: NotificationDetails | null;
};

function Notification({ notificationDetails }: NotificationProps) {
    if (notificationDetails == null) return null;

    const { message, isFound } = notificationDetails;
    return (
        <div
            className={`fixed z-50 p-3 ${
                isFound ? "bg-green-800" : "bg-rose-800"
            } rounded-lg left-[50%] top-[125px] translate-x-[-50%] translate-y-[-50%] shadow-md flex items-center gap-3 text-light-background animate-fade-in`}
        >
            {isFound ? <FaCircleCheck /> : <FaCircleExclamation />}
            <p className="text-center text-sm">{message}</p>
        </div>
    );
}

export default Notification;
