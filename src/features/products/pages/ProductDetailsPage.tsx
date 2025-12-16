// src/components/ProductDetailPage.js
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CommentSection from "../components/CommentSection";
type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  brand: string;
  images: string[];
  description: string;          
  features: string[];
  specifications: Record<string, string>;
  inStock: boolean;
  rating: number;
};

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  const mockProducts: Record<string, Product> = {
    "1": {
      id: 1,
      name: "iPhone 14 Pro",
      price: 999,
      category: "Smartphones",
      brand: "Apple",
      images: [
        "https://via.placeholder.com/600x600?text=iPhone+Front",
        "https://via.placeholder.com/600x600?text=iPhone+Back",
        "https://via.placeholder.com/600x600?text=iPhone+Side",
      ],
      description:
        "The most advanced iPhone with Dynamic Island, Always-On display, and the best camera system ever on iPhone.",
      features: [
        "6.1-inch Super Retina XDR display",
        "A16 Bionic chip",
        "Pro camera system with 48MP Main",
        "Dynamic Island",
        "Always-On display",
      ],
      specifications: {
        Storage: "128GB, 256GB, 512GB, 1TB",
        Display: "6.1-inch Super Retina XDR",
        Chip: "A16 Bionic",
        Camera: "48MP Main, 12MP Ultra Wide, 12MP 2x Telephoto",
        Battery: "Up to 23 hours video playback",
      },
      inStock: true,
      rating: 4.8,
    },
    "2": {
      id: 2,
      name: "MacBook Pro",
      price: 1299,
      category: "Laptops",
      brand: "Apple",
      images: [
        "https://via.placeholder.com/600x600?text=MacBook+Front",
        "https://via.placeholder.com/600x600?text=MacBook+Keyboard",
        "https://via.placeholder.com/600x600?text=MacBook+Side",
      ],
      description:
        "The most powerful MacBook Pro ever with the M2 chip, designed for professionals and creators.",
      features: [
        "Apple M2 chip",
        "13-inch Retina display",
        "Up to 20 hours battery life",
        "8GB Unified Memory",
        "256GB SSD Storage",
      ],
      specifications: {
        Chip: "Apple M2",
        Memory: "8GB Unified Memory",
        Storage: "256GB SSD",
        Display: "13.3-inch Retina",
        Battery: "Up to 20 hours",
        Ports: "Two Thunderbolt / USB 4 ports",
      },
      inStock: true,
      rating: 4.7,
    },
  };

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      // Validate id exists and is a key in mockProducts
      if (id && mockProducts[id]) {
        setProduct(mockProducts[id]);
      } else {
        setProduct(null);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading product details...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Link to="/" className="text-blue-600 hover:underline">
            Return to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link to="/" className="text-gray-500 hover:text-gray-700">
              Products
            </Link>
          </li>
          <li className="flex items-center">
            <span className="text-gray-400 mx-2">/</span>
            <span className="text-gray-900">{product.name}</span>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-contain"
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden ${
                  selectedImage === index
                    ? "border-blue-500"
                    : "border-gray-200"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-4">
            <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
              {product.brand}
            </span>
            <span className="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded ml-2">
              {product.category}
            </span>
          </div>

          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400 mr-2">
              {"★".repeat(Math.floor(product.rating))}
              {"☆".repeat(5 - Math.floor(product.rating))}
            </div>
            <span className="text-gray-600">({product.rating})</span>
          </div>

          <p className="text-2xl font-bold text-green-600 mb-6">
            ${product.price}
          </p>

          <div className="mb-6">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                product.inStock
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* Features */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Key Features</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Add to Cart */}
          <div className="flex space-x-4 mb-8">
            <button
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!product.inStock}
            >
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              ♡
            </button>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Specifications</h2>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <tbody>
              {Object.entries(product.specifications).map(([key, value]) => (
                <tr
                  key={key}
                  className="border-b border-gray-200 last:border-b-0"
                >
                  <td className="px-6 py-4 font-semibold text-gray-700 bg-gray-50 w-1/3">
                    {key}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      {/* Comment Section */}
      <CommentSection />
      </div>

      {/* Back to Products */}
      <div className="mt-8 text-center">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          ← Back to All Products
        </Link>
      </div>
    </div>
  );
};

export default ProductDetailPage;
