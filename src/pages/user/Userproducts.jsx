import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  BadgeCheck,
  IndianRupee,
  Cpu,
  Monitor,
  HardDrive,
  MemoryStick,
  Search,
  Sliders,
  X,
} from "lucide-react";

export default function UserProducts() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState(""); // stays outside filter
  const [category, setCategory] = useState("");
  const [priceSort, setPriceSort] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 9;

  // Filter panel
  const [openFilter, setOpenFilter] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit,
        search: search || undefined, // server-side search
        category: category || undefined,
      };

      const res = await axios.get(import.meta.env.VITE_API_PRODUCT, { params });
      let data = res.data.data || [];

      // Apply price sort
      if (priceSort === "low") data = data.sort((a, b) => a.sellingPrice - b.sellingPrice);
      else if (priceSort === "high") data = data.sort((a, b) => b.sellingPrice - a.sellingPrice);

      setProducts(data);
      setFiltered(data);
      setTotalPages(res.data.pages || 1);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  // Client-side search filtering
  useEffect(() => {
    const s = search.toLowerCase();
    setFiltered(
      products.filter((p) =>
        [p.title, p.brand, p.model, p.category].filter(Boolean).some((v) => v.toLowerCase().includes(s))
      )
    );
  }, [search, products]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">
        Loading products...
      </div>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
          Available Products
        </h1>

        {/* Search + Filter button inline */}
        <div className="flex items-center gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product..."
              className="
                w-full pl-10 pr-4 py-2.5
                rounded-xl
                bg-white
                border border-gray-300
                text-gray-900 placeholder-gray-400
                focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30
                transition
              "
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setOpenFilter((o) => !o)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            <Sliders size={16} />
            Filter
          </button>
        </div>

        {/* Filter Panel */}
        {openFilter && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-md relative">
            <button
              onClick={() => setOpenFilter(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>

            {/* Category */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              >
                <option value="">All Categories</option>
                <option value="Laptop">Laptop</option>
                <option value="Mobile">Mobile</option>
                <option value="Accessory">Accessory</option>
              </select>
            </div>

            {/* Price Sort */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort by Price</label>
              <select
                value={priceSort}
                onChange={(e) => setPriceSort(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              >
                <option value="">None</option>
                <option value="low">Low → High</option>
                <option value="high">High → Low</option>
              </select>
            </div>

            <button
              onClick={() => { setPage(1); fetchProducts(); setOpenFilter(false); }}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Apply Filters
            </button>
          </div>
        )}

        {/* No products */}
        {filtered.length === 0 && <p className="text-gray-500">No products found</p>}

        {/* Grid */}
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 lg:gap-8">
          {filtered.map((product) => (
            <div key={product._id} className="bg-white border border-gray-200 rounded-lg sm:rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              {/* Image */}
              <div className="aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
                <img src={product.images?.[0]?.url || '/placeholder.png'} alt={product.title} className="w-full h-full object-cover" />
              </div>
              {/* Content */}
              <div className="p-2.5 sm:p-5 space-y-2 sm:space-y-4">
                <h2 className="text-sm sm:text-lg font-semibold text-gray-900 line-clamp-1">{product.title}</h2>
                <p className="hidden sm:block text-sm text-gray-500">{product.brand} • {product.model}</p>
                <div className="flex flex-wrap gap-1 sm:gap-2 text-[10px] sm:text-xs">
                  <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">{product.condition}</span>
                  {product.isRefurbished && <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">Refurbished</span>}
                </div>
                <div className="hidden sm:grid grid-cols-2 gap-2 text-sm text-gray-600">
                  {product.processor?.model && <Spec icon={<Cpu size={14} className="text-gray-500" />} value={`${product.processor.model} ${product.processor.generation || ""}`} />}
                  {product.ram?.size && <Spec icon={<MemoryStick size={14} className="text-gray-500" />} value={`${product.ram.size} ${product.ram.type || "RAM"}`} />}
                  {product.storage?.size && <Spec icon={<HardDrive size={14} className="text-gray-500" />} value={`${product.storage.size} ${product.storage.type || "Storage"}`} />}
                  {product.graphics && <Spec icon={<Monitor size={14} className="text-gray-500" />} value={`Graphics ${product.graphics}`} />}
                </div>
                <div className="flex items-center justify-between pt-1">
                  <p className="text-base sm:text-xl font-bold text-emerald-600 flex items-center gap-1"><IndianRupee size={14} />{product.sellingPrice}</p>
                  {product.warrantyAvailable && <span className="hidden sm:flex text-sm text-emerald-600 items-center gap-1"><BadgeCheck size={14} />{product.warrantyPeriod}</span>}
                </div>
                <Link to={`/products/${product._id}`} className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 sm:py-2.5 rounded-md sm:rounded-xl text-xs sm:text-sm font-semibold transition">View</Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 gap-3">
          <button disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-50">Previous</button>
          <span className="px-4 py-2">{page} / {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-50">Next</button>
        </div>
      </div>
    </section>
  );
}

function Spec({ icon, value }) {
  return (
    <div className="flex items-center gap-1">
      {icon}
      <span>{value}</span>
    </div>
  );
}
