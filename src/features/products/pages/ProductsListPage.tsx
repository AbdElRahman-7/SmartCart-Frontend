import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getProductImage } from "../../../utils/imageUtils";
const API_URL = import.meta.env.VITE_API_URL;


interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  brand: string;
  image?: string;
  description?: string;
}

interface Filters {
  category: string;
  brand: string;
  search: string;
}

const ProductListPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    search: "",
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const hasFetched = useRef(false);


  // Products data - in real app, this would come from an API
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch product");

        const data: Product[] = await response.json();

        const dataWithImages = data.map(p => ({
          ...p,
          image: getProductImage(p.id, p.name)
        }));

        setProducts(dataWithImages);
        setFilteredProducts(dataWithImages);

        const uniqueCategories = [...new Set(data.map(p => p.category))];
        const uniqueBrands = [...new Set(data.map(p => p.brand))];

        setCategories(uniqueCategories);
        setBrands(uniqueBrands);

      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    const interval = setInterval(fetchProducts, 5000);

    return () => clearInterval(interval);
  }, []);



  // Apply filters
  useEffect(() => {
    let result = products;

    if (filters.category) {
      result = result.filter(
        (product) => product.category === filters.category
      );
    }

    if (filters.brand) {
      result = result.filter((product) => product.brand === filters.brand);
    }

    if (filters.search) {
      result = result.filter(
        (product) =>
          product.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
          product.description
            ?.toLowerCase()
            .includes(filters.search.toLowerCase())
      );
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, products]);

  // Handle filter changes
  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Discover Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Premium Collection</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed">
              Explore our curated selection of top-tier gadgets and accessories designed to elevate your digital lifestyle.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filters and Search Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10 sticky top-18 z-30 backdrop-blur-xl bg-white/90 supports-[backdrop-filter]:bg-white/60">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Search Bar */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-400"
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Category
              </label>
              <select
                className="w-full px-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Brand
              </label>
              <select
                className="w-full px-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                value={filters.brand}
                onChange={(e) => handleFilterChange("brand", e.target.value)}
              >
                <option value="">All Brands</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative pt-[100%] bg-gray-50 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-block px-2 py-1 bg-purple-50 text-purple-600 text-xs font-semibold rounded-md mb-2">
                      {product.brand}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-purple-600 transition-colors">
                      {product.name}
                    </h3>
                  </div>
                  <span className="text-lg font-bold text-gray-900 bg-gray-50 px-3 py-1 rounded-lg tabular-nums">
                    ${product.price}
                  </span>
                </div>

                <p className="text-gray-500 text-sm mb-6 line-clamp-2 flex-grow">
                  {product.description}
                </p>

                <div className="flex items-center gap-3">
                  <Link
                    to={`/product/${product.id}?brand=${product.brand}&category=${product.category}`}
                    className="flex-1 bg-gray-900 text-white text-center py-3 rounded-xl font-medium hover:bg-black transition-colors shadow-lg hover:shadow-gray-900/20"
                  >
                    View Details
                  </Link>
                  <button className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-purple-50 hover:text-purple-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        )}

        {!loading && currentProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No products found</h2>
            <p className="text-gray-500">Try adjusting your filters or search query.</p>
          </div>
        )}


        {/* Pagination */}'
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-3 rounded-xl bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`w-10 h-10 rounded-xl font-medium transition-all ${currentPage === index + 1
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                    }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-3 rounded-xl bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;