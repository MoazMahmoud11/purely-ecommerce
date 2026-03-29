
export default function BubblesIcon({ size = 28, color = "#339991", className = "" }) {
  return (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
{/* 1. Large Main Bubble */}
    <circle cx="7" cy="17" r="6" />

    {/* 2. THE REFLECTION (The "Half-Circle" Glint) */}
    {/* This path creates a small arc inside the top of the bubble */}
    <path d="M5 16.5a2.7 2.9 0 0 1 4 0" />

    {/* 3. Top Medium Bubble */}
    <circle cx="8" cy="4" r="3" />

    {/* 4. Right Medium Bubble */}
    <circle cx="19" cy="10" r="4" />
        
    </svg>
  );
}