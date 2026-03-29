// components/FeatureItem.jsx
import { FaCheck } from "react-icons/fa6";

export default function FeatureItem({ title, description }) {
    return (
        <div className='flex gap-4'>
            <div className='shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white'>
                <FaCheck size={16} />
            </div>
            <div>
                <h5 className='font-semibold tracking-tight text-slate-900 mb-0.5 dark:text-white'>{title}</h5>
                <p className='text-slate-600 dark:text-secondary-text'>{description}</p>
            </div>
        </div>
    );
}