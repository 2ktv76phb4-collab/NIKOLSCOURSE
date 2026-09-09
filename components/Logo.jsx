export default function Logo({ size = 'small' }) {
  const isSmall = size === 'small';
  const textSize = isSmall ? 'text-xl' : 'text-4xl';
  const taglineSize = isSmall ? 'text-xs' : 'text-sm';

  return (
    <div className="flex flex-col items-start">
      <h1 className={`${textSize} font-bold text-brand-navy tracking-wider`}>
        NIKOLiL
      </h1>
      <p className={`${taglineSize} text-brand-brown font-light`}>
        Crafting pearls
      </p>
    </div>
  );
}
