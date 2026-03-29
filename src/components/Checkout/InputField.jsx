const InputField = ({
  labelName,
  type,
  id,
  placeholder,
  className,
  name,
  error,
  ...props
}) => {
  return (
    <label
      htmlFor={id}
      className="flex flex-col gap-2 text-sm font-bold text-gray-700 dark:text-gray-300"
    >
      {labelName}
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        {...props}
        className={`px-4 py-3 rounded-xl border ${error ? "border-red-500 focus:ring-red-500" : "border-gray-200 dark:border-white/10 focus:ring-teal-600"} bg-gray-50 dark:bg-dark/50 focus:bg-white dark:focus:bg-dark focus:ring-2 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white font-medium ${className || ""}`}
      />

      {error && (
        <span className="text-red-500 text-xs font-semibold mt-1">{error}</span>
      )}
    </label>
  );
};

export default InputField;
