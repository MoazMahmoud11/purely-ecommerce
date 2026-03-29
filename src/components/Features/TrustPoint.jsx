import { FaRegCircleCheck } from "react-icons/fa6";

const TrustPoint = ({label}) => {
    return (
        <li className="flex items-center gap-4">
            <span className="material-symbols-outlined text-primary"><FaRegCircleCheck /></span>
            <span className="font-bold text-gray-900 dark:text-white">{label}</span>
        </li>
    );
};

export default TrustPoint;