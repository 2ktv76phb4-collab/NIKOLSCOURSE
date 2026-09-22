export default function Logo({ size = 'small', className = '' }) {
  const sizeClasses = {
    small: 'h-10 w-10',
    medium: 'h-16 w-16',
    large: 'h-24 w-24',
  };

  return (
    <div className={`flex items-center justify-center transition-transform duration-300 hover:opacity-80 ${sizeClasses[size]} ${className}`}>
      <img
        src="/images/logo-simplified.jpg"
        alt="NIKOLiL - Crafting pearls of nails masters"
        className="w-full h-full object-contain"
      />
    </div>
  );
}
