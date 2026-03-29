import { useState } from "react";
import { MdExpandMore } from "react-icons/md";

export default function ProductAccordion({ title, icon: Icon, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <details
      className="group bg-white dark:bg-secondary/40 border border-slate-100 dark:border-primary/20 rounded-xl overflow-hidden"
      open={isOpen}
      onClick={(e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
      }}
    >
      <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
        <div className="flex items-center gap-3 text-slate-900 dark:text-white">
          {Icon && <Icon className="text-primary text-xl" />}
          <span className="font-bold">{title}</span>
        </div>
        <MdExpandMore
          className={`text-xl text-slate-500 dark:text-secondary-text transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </summary>
      <div className="px-4 pb-4 pt-0 text-sm text-slate-500 dark:text-secondary-text leading-relaxed">
        {children}
      </div>
    </details>
  );
}