import { FaArrowRight } from "react-icons/fa6";
import { LuLeaf } from "react-icons/lu";
import { Link } from "react-router-dom";
import Badge from "./Bubbles/Badge.jsx";


const HeroSection = ({badge,titleOne, titleTwo,description, fButton, sButton, imageProps={}  }) => {
    return (
        
        <>
            {/* Hero Section */}
            <div className="space-y-8">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-blue dark:bg-primary/20 rounded-full text-sm font-semibold">
                    <LuLeaf color="rgb(51,153,145)" size={16} />
                    <span className="text-primary">{badge}</span>
                </div>
                
                {/* title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    {titleOne} <br />
                    <span className="text-primary">{titleTwo}</span>
                </h1>
                
                {/* Description */}
                <p className="text-gray-600 text-lg leading-relaxed dark:text-slate-400">
                    {description}
                </p>
                
                {/* Buttons */}
                <div className="flex gap-4">
                    <Link to="/products">
                        <button className="bg-primary text-white px-6 py-3 rounded-2xl font-semibold hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center gap-2 group">
                            {fButton}
                            <FaArrowRight  size={18} className='group-hover:translate-x-1 transition-transform' />
                        </button>
                    </Link>
                    <Link to="/products">
                        <button className="border-2 dark:border-secondary border-slate-200  px-6 py-3 rounded-2xl font-semibold hover:bg-slate-50  transition-all cursor-pointer dark:text-white dark:hover:bg-primary/20 ">
                            {sButton}
                        </button>
                    </Link>
                </div>
            </div>
            
            {/* الصورة - الجهة اليمين */}
            <div className="relative">
                {/* Background decoration */}
                <div className="absolute -top-10 -right-10 w-72 h-72 bg-primary opacity-10 rounded-full blur-3xl -z-10"></div>
                
                {/* الصورة */}
                    <img 
                        {...imageProps}
                        fetchPriority="high"
                        className={`relative w-full h-full object-cover rounded-3xl shadow-2xl ${imageProps.className || ""}`}
                    />
                    

                {/* Badge */}
                <Badge title={'99% Natural'} description={'Certified plant-derived ingredients for a safer environment.'} />
            </div>
            {/* Left side */}
        </>
        
    );
};

export default HeroSection;