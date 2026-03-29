import { LuBadgeCheck } from "react-icons/lu";

const Badge = ({title, description}) => {
    return (
        <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-xl shadow-xl border-gray-200 max-w-52 dark:bg-secondary ">
            <div className="flex items-start gap-3">
                <div className="shrink-0">
                    <LuBadgeCheck color="rgb(51,153,145)" size={24} />
                </div>
                <div>
                    <p className="font-bold text-primary mb-1 text-base">
                        {title}
                    </p>
                    <p className="text-xs text-gray-600 leading-relaxed dark:text-secondary-text">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Badge;