// src/components/Product.jsx
const Product = ({
  categories,
  selectedCategory,
  onCategoryChange,
  brands,
  selectedBrand,
  onBrandChange,
  total,
}) => {
  return (
    <aside className="w-full lg:w-64 p-4 bg-zinc-900 rounded-xl">
      <h3 className="font-semibold mb-2">Filters</h3>
      <label className="block text-sm mb-1">Category</label>
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="w-full px-3 py-2 rounded-md bg-zinc-800"
      >
        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <label className="block text-sm mb-1 mt-4">Brand</label>
      <select
        value={selectedBrand}
        onChange={(e) => onBrandChange(e.target.value)}
        className="w-full px-3 py-2 rounded-md bg-zinc-800"
      >
        {brands.map((b) => (
          <option key={b}>{b}</option>
        ))}
      </select>

      <p className="mt-6 text-sm text-zinc-400">Total: {total} items</p>
    </aside>
  );
};

export default Product;
