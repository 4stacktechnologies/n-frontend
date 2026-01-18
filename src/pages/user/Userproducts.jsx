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
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priceSort, setPriceSort] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // IMPORTANT
  const DESKTOP_LIMIT = 12;
  const MOBILE_LIMIT = 12;

  const isMobile = window.innerWidth < 640;

  // Filter panel
  const [openFilter, setOpenFilter] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(import.meta.env.VITE_API_PRODUCT, {
        params: {
          page,
          limit: DESKTOP_LIMIT, // backend unchanged
          search: search || undefined,
          category: category || undefined,
        },
      });

      let data = res.data.data || [];

      if (priceSort === "low")
        data.sort((a, b) => a.sellingPrice - b.sellingPrice);
      if (priceSort === "high")
        data.sort((a, b) => b.sellingPrice - a.sellingPrice);

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

  useEffect(() => {
    const s = search.toLowerCase();
    setFiltered(
      products.filter((p) =>
        [p.title, p.brand, p.model, p.category]
          .filter(Boolean)
          .some((v) => v.toLowerCase().includes(s))
      )
    );
  }, [search, products]);

  const displayProducts = isMobile
    ? filtered.slice(0, MOBILE_LIMIT)
    : filtered;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading products...
      </div>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">
          Available Products
        </h1>

        {/* Search + Filter */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border"
            />
          </div>

          <button
            onClick={() => setOpenFilter(!openFilter)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white"
          >
            <Sliders size={16} />
          </button>
        </div>

        {/* Filter Panel */}
        {openFilter && (
          <div className="bg-white border rounded-xl p-8 mb-6 relative">
            <button
              onClick={() => setOpenFilter(false)}
              className="absolute top-3 right-3"
            >
              <X size={20} />
            </button>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
            >
              <option value="">All Categories</option>
              <option value="Laptop">Laptop</option>
              <option value="Mobile">Mobile</option>
              <option value="Accessory">Accessory</option>
            </select>

            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
            >
              <option value="">Sort by Price</option>
              <option value="low">Low → High</option>
              <option value="high">High → Low</option>
            </select>

            <button
              onClick={() => {
                setPage(1);
                fetchProducts();
                setOpenFilter(false);
              }}
              className="w-full bg-indigo-600 text-white py-2 rounded"
            >
              Apply Filters
            </button>
          </div>
        )}

        {/* GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {displayProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white border rounded-xl overflow-hidden flex flex-col"
            >
              {/* Square Image */}
              <div className="aspect-square">
                <img
                  src={product.images?.[0]?.url || "/placeholder.png"}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-3 flex flex-col gap-2 flex-1">
                <h2 className="text-sm font-semibold break-words">
                  {product.title}
                </h2>

                <p className="text-xs text-gray-500">
                  {product.brand} • {product.model}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <p className="font-bold text-emerald-600 flex items-center gap-1">
                    <IndianRupee size={14} />
                    {product.sellingPrice}
                  </p>

                  {product.warrantyAvailable && (
                    <BadgeCheck size={16} className="text-emerald-600" />
                  )}
                </div>

                <Link
                  to={`/products/${product._id}`}
                  className="mt-2 block text-center bg-indigo-600 text-white py-2 rounded-lg text-sm"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination (unchanged) */}
        <div className="flex justify-center gap-3 mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>{page} / {totalPages}</span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
