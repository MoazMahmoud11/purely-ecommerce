import { currencyFormatter } from "../../util/formatters";

/**
 * A controlled dual-thumb slider component for filtering by price range.
 *
 * @param {Object} props
 * @param {number} [props.min=10] - Minimum value of the slider
 * @param {number} [props.max=150] - Maximum value of the slider
 * @param {number[]} props.value - Current [min, max] values
 * @param {function} props.onChange - Callback with new [min, max] values
 */
export default function PriceRangeSlider({
  min = 10,
  max = 150,
  value,
  onChange,
}) {
  // Fallback if value isn't provided or empty
  const [minVal, maxVal] = value || [min, max];
  const range = max - min;

  // Calculate track percentages
  const minPercent = ((minVal - min) / range) * 100;
  const maxPercent = ((maxVal - min) / range) * 100;

  const handleMinChange = (e) => {
    const newVal = Math.min(Number(e.target.value), maxVal - 1);
    onChange([newVal, maxVal]);
  };

  const handleMaxChange = (e) => {
    const newVal = Math.max(Number(e.target.value), minVal + 1);
    onChange([minVal, newVal]);
  };

  return (
    <div className="mb-10 w-full">
      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-5">
        Price Range
      </h3>
      <div className="px-2">
        <div className="relative h-1.5 w-full mb-4">
          {/* Base track */}
          <div className="absolute inset-0 bg-gray-100 rounded-full" />
          
          {/* Active fill */}
          <div
            className="absolute h-full bg-teal-600 rounded-full"
            style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
          />
          
          {/* Min range input */}
          <input
            type="range"
            min={min}
            max={max}
            value={minVal}
            onChange={handleMinChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            aria-label="Minimum price"
          />
          
          {/* Max range input */}
          <input
            type="range"
            min={min}
            max={max}
            value={maxVal}
            onChange={handleMaxChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            aria-label="Maximum price"
          />
          
          {/* Min thumb dot */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-teal-600 rounded-full shadow-md pointer-events-none"
            style={{ left: `calc(${minPercent}% - 8px)` }}
          />
          
          {/* Max thumb dot */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-teal-600 rounded-full shadow-md pointer-events-none"
            style={{ left: `calc(${maxPercent}% - 8px)` }}
          />
        </div>
        
        {/* Labels */}
        <div className="flex justify-between text-xs font-bold text-gray-600">
          <span>{currencyFormatter.format(minVal)}</span>
          <span>{currencyFormatter.format(maxVal)}</span>
        </div>
      </div>
    </div>
  );
}
