export default function Logo({ size = 'small' }) {
  const sizeClasses = {
    small: 'h-8 w-20',
    medium: 'h-16 w-48',
    large: 'h-24 w-72',
  };

  return (
    <div className={`flex items-center justify-start transition-transform duration-300 hover:opacity-80 ${sizeClasses[size]}`}>
      <img
        src="/images/logo-simplified.png"
        alt="NIKOLiL - Crafting pearls of nails masters"
        className="w-full h-full object-contain"
      />
    </div>
  );
}
