interface ProductCardProps {
  product: {
    name: string;
    category: string;
    price: string;
    image: string;
    highlights: string[];
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition dark:border-gray-700 dark:bg-gray-800">
      <img
        src={product.image}
        alt={product.name}
        className="h-32 w-full object-contain rounded"
      />

      <h3 className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">
        {product.name}
      </h3>

      <p className="text-xs text-gray-500">{product.category}</p>

      <p className="mt-1 font-bold text-blue-600">{product.price}</p>

      <ul className="mt-2 space-y-1 text-xs text-gray-600 dark:text-gray-400">
        {product.highlights.slice(0, 2).map((item, index) => (
          <li key={index}>• {item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductCard;
