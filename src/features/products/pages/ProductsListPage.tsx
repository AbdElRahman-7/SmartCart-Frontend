import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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

        setProducts(data);
        setFilteredProducts(data);

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Bar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Products
            </label>
            <input
              type="text"
              placeholder="Search by name or description..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <span className="text-green-600 font-bold">
                  ${product.price}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {product.brand}
                </span>
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  {product.category}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                {product.description}
              </p>
              <Link
                to={`/product/${product.id}?brand=${product.brand}&category=${product.category}`}
                className="block w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">
            Loading...
          </p>
        </div>
      )}
      {/* No Products Message */}
      {!loading && currentProducts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">
            No products found
          </p>
        </div>
      )}


      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300"
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 rounded-md ${currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
                }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      )}

      {/* Results Count */}
      <div className="text-center mt-4 text-gray-600">
        Showing {currentProducts.length} of {filteredProducts.length} products
      </div>
    </div>
  );
};

export default ProductListPage;