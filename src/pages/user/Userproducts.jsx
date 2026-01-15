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
} from "lucide-react";

export default function UserProducts() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_API_PRODUCT);
        setProducts(res.data.data || []);
        setFiltered(res.data.data || []);
      } catch {
        console.error("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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

        {/* Search */}
        <div className="relative max-w-sm mb-8 sm:mb-12">
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

        {filtered.length === 0 && (
          <p className="text-gray-500">No products found</p>
        )}

        {/* Grid */}
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 lg:gap-8">
          {filtered.map((product) => (
            <div
              key={product._id}
              className="
                bg-white
                border border-gray-200
                rounded-lg sm:rounded-2xl
                overflow-hidden
                shadow-sm
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-md
              "
            >
              {/* Image */}
              <div className="aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
                <img
                  src={product.images?.[0]?.url || '/placeholder.png'}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-2.5 sm:p-5 space-y-2 sm:space-y-4">

                {/* Title */}
                <h2 className="text-sm sm:text-lg font-semibold text-gray-900 line-clamp-1">
                  {product.title}
                </h2>

                {/* Brand / Model (desktop only) */}
                <p className="hidden sm:block text-sm text-gray-500">
                  {product.brand} • {product.model}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-1 sm:gap-2 text-[10px] sm:text-xs">
                  <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                    {product.condition}
                  </span>

                  {product.isRefurbished && (
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                      Refurbished
                    </span>
                  )}
                </div>

                {/* Specs (desktop only to keep mobile compact) */}
                <div className="hidden sm:grid grid-cols-2 gap-2 text-sm text-gray-600">
                  {product.processor?.model && (
                    <Spec
                      icon={<Cpu size={14} className="text-gray-500" />}
                      value={`${product.processor.model} ${product.processor.generation || ""}`}
                    />
                  )}

                  {product.ram && (
                    <Spec
                      icon={<MemoryStick size={14} className="text-gray-500" />}
                      value={`${product.ram} RAM`}
                    />
                  )}

                  {product.rom && (
                    <Spec
                      icon={<HardDrive size={14} className="text-gray-500" />}
                      value={product.rom}
                    />
                  )}

                  {product.graphics && (
                    <Spec
                      icon={<Monitor size={14} className="text-gray-500" />}
                      value={`Graphics ${product.graphics}`}
                    />
                  )}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between pt-1">
                  <p className="text-base sm:text-xl font-bold text-emerald-600 flex items-center gap-1">
                    <IndianRupee size={14} />
                    {product.sellingPrice}
                  </p>

                  {product.warrantyAvailable && (
                    <span className="hidden sm:flex text-sm text-emerald-600 items-center gap-1">
                      <BadgeCheck size={14} />
                      {product.warrantyPeriod}
                    </span>
                  )}
                </div>

                {/* CTA */}
                <Link
                  to={`/products/${product._id}`}
                  className="
                    block w-full text-center
                    bg-indigo-600 hover:bg-indigo-700
                    text-white
                    py-1.5 sm:py-2.5
                    rounded-md sm:rounded-xl
                    text-xs sm:text-sm
                    font-semibold
                    transition
                  "
                >
                  View
                </Link>
              </div>
            </div>
          ))}
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
