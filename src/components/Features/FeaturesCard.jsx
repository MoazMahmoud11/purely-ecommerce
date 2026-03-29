import {FaArrowRight} from 'react-icons/fa6'

const FeaturesCard = ({icon, title, description, cta}) => {
    return (
        <div className="dark:bg-dark group p-8 rounded-xl bg-primary/0.03 dark:bg-primary/0.05 border border-primary/5 hover:border-primary/20 transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="w-14 h-14 bg-white dark:bg-[#1A1A1A] rounded-lg flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-primary text-3xl">{icon}</span>
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{description}</p>
            <div className="mt-8 flex items-center gap-2 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {cta}
                <span className="material-symbols-outlined text-sm"><FaArrowRight/></span>
            </div>
        </div>
    );
};

export default FeaturesCard;