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
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Available Products
        </h1>

        {/* Search */}
        <div className="relative max-w-sm mb-12">
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
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <div
              key={product._id}
              className="
                bg-white
                border border-gray-200
                rounded-2xl
                overflow-hidden
                shadow-sm
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-md
              "
            >
              {/* Image */}
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={product.images?.[0]?.url || "/placeholder.png"}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5 space-y-4">

                {/* Title */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
                    {product.title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {product.brand} • {product.model}
                  </p>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                    {product.condition}
                  </span>

                  {product.isRefurbished && (
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600">
                      Refurbished
                    </span>
                  )}

                  {product.negotiable && (
                    <span className="px-3 py-1 rounded-full bg-yellow-50 text-yellow-700">
                      Negotiable
                    </span>
                  )}
                </div>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
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

                {/* Display */}
                {product.display && (
                  <p className="text-sm text-gray-500">
                    Display: {product.display.size}" {product.display.resolution} •{" "}
                    {product.display.refreshRate}Hz
                  </p>
                )}

                {/* Price */}
                <div className="flex items-center justify-between pt-2">
                  <p className="text-xl font-bold text-emerald-600 flex items-center gap-1">
                    <IndianRupee size={18} />
                    {product.sellingPrice}
                  </p>

                  {product.warrantyAvailable && (
                    <span className="text-sm text-emerald-600 flex items-center gap-1">
                      <BadgeCheck size={14} />
                      {product.warrantyPeriod}
                    </span>
                  )}
                </div>

                {product.status !== "AVAILABLE" && (
                  <p className="text-sm text-red-500">
                    {product.status.replace("_", " ")}
                  </p>
                )}

                {/* CTA */}
                <Link
                  to={`/products/${product._id}`}
                  className="
                    block w-full text-center
                    bg-indigo-600
                    hover:bg-indigo-700
                    text-white
                    py-2.5 rounded-xl
                    text-sm font-semibold
                    transition
                  "
                >
                  View Full Details
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
