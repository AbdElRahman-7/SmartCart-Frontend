// src/components/ProductDetailPage.js
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import { useCart } from "../../../context/CartContext";
import { getProductImages } from "../../../utils/imageUtils";
const API_URL = import.meta.env.VITE_API_URL;


type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  brand: string;
  images?: string[];
  description?: string;
  features?: string[];
  specifications?: Record<string, string>;
  inStock?: boolean;
  rating?: number;
};


const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
    


  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product");

        const data = await response.json();
        const images = getProductImages(data.id, data.name);
        setProduct({ ...data, images, inStock: true });
      } catch (error) {
        console.error(error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);


  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-center px-4">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-gray-500 mb-8">The product you are looking for does not exist or has been removed.</p>
        <Link to="/" className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-shadow shadow-lg hover:shadow-xl">
          Return to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm font-medium" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="text-gray-500 hover:text-purple-600 transition-colors">
                Products
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 text-gray-300 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-900">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* Product Images */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative group overflow-hidden">
              <img
                src={product.images?.[selectedImage]}
                alt={product.name}
                className="w-full h-[500px] object-contain transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`shrink-0 w-24 h-24 rounded-2xl bg-white border-2 p-2 transition-all ${selectedImage === index
                    ? "border-purple-600 scale-105 shadow-md"
                    : "border-transparent border-gray-100 hover:border-gray-200"
                    }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="bg-purple-100 text-purple-700 text-sm font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                {product.brand}
              </span>
              <span className="bg-gray-100 text-gray-600 text-sm font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                {product.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              {product?.name}
            </h1>

            <div className="flex items-center mb-8">
              <div className="flex text-yellow-400 mr-3">
                {"★".repeat(Math.floor(product.rating || 0))}
                {"☆".repeat(5 - Math.floor(product.rating || 0))}
              </div>
              <span className="text-gray-500 font-medium text-lg">({product.rating || 0} reviews)</span>
            </div>

            <div className="mb-8">
              <span className="text-5xl font-bold text-gray-900 tracking-tight">
                ${product.price}
              </span>
            </div>

            <div className="mb-8">
              <span
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold ${product.inStock
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
                  }`}
              >
                <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></span>
                {product.inStock ? "In Stock & Ready to Ship" : "Currently Out of Stock"}
              </span>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-10 border-b border-gray-100 pb-10">
              {product.description}
            </p>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 mb-10">
              <div className="flex items-center border-2 border-gray-200 rounded-2xl p-1 bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-purple-600 hover:bg-gray-50 rounded-xl transition-colors font-bold text-xl"
                >
                  -
                </button>
                <div className="w-16 text-center font-bold text-xl text-gray-900">
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-purple-600 hover:bg-gray-50 rounded-xl transition-colors font-bold text-xl"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => addToCart(product, quantity)}
                disabled={!product.inStock}
                className="flex-1 bg-gray-900 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:bg-black transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </button>

              <button className="p-4 border-2 border-gray-200 rounded-2xl hover:border-purple-200 hover:bg-purple-50 text-gray-400 hover:text-purple-600 transition-all">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>


            {/* Key Features */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Key Highlights
              </h3>
              <ul className="space-y-4">
                {product.features?.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-600 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2.5 shrink-0"></span>
                    {feature}
                  </li>
                ))}
                {!product.features && <li className="text-gray-400 italic">No specific features listed.</li>}
              </ul>
            </div>
          </div>
        </div>

        {/* Specifications Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Technical Specifications</h2>
            <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
              <table className="w-full">
                <tbody className="divide-y divide-gray-50">
                  {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                    <tr key={key} className="hover:bg-gray-50 transition-colors">
                      <td className="px-8 py-5 font-semibold text-gray-600 w-1/3 bg-gray-50/50">
                        {key}
                      </td>
                      <td className="px-8 py-5 text-gray-900 font-medium">{value}</td>
                    </tr>
                  ))}
                  {!product.specifications && (
                    <tr><td className="p-8 text-gray-400 italic">No specifications available.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Comment Section Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Customer Reviews</h2>
              <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm max-h-[600px] overflow-y-auto custom-scrollbar">
                <CommentSection productId={product.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;