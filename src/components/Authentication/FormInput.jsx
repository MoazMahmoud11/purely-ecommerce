import React from 'react';

export default function FormInput({
  label,
  id,
  name,
  type = 'text',
  placeholder,
  required = false,
  icon: Icon,
  endIcon,
  extraLabel,
  ...props
}) {
  return (
    <fieldset className="space-y-2">
      <div className="flex justify-between items-center">
        <label
          htmlFor={id}
          className="block text-zinc-900 dark:text-zinc-200 text-sm font-semibold"
        >
          {label}
        </label>
        {extraLabel}
      </div>
      <div className="relative group">
        <input
          id={id}
          name={name}
          type={type}
          className={`w-full h-12 pl-10 ${
            endIcon ? 'pr-10' : 'pr-4'
          } rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm outline-none`}
          placeholder={placeholder}
          required={required}
          {...props}
        />
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
            <Icon className="text-[20px]" />
          </div>
        )}
        {endIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {endIcon}
          </div>
        )}
      </div>
    </fieldset>
  );
}
