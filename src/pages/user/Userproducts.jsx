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
} from "lucide-react";

export default function UserProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_API_PRODUCT);
        setProducts(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#141428] via-[#1b1b33] to-[#0f0f23] text-gray-400">
        Loading products...
      </div>
    );
  }

  return (
    <div
      className="
        relative min-h-screen overflow-hidden
        bg-gradient-to-br
        from-[#141428]
        via-[#1b1b33]
        to-[#0f0f23]
        p-6
      "
    >
      {/* Glow blobs */}
      <div className="absolute -top-40 -left-40 w-[32rem] h-[32rem] bg-pink-500/20 blur-[160px]" />
      <div className="absolute top-1/3 -right-40 w-[32rem] h-[32rem] bg-purple-600/20 blur-[180px]" />

      <div className="relative max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold tracking-wide text-white mb-8">
          Available Products
        </h1>

        {products.length === 0 && (
          <p className="text-gray-400">No products available</p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product._id}
              className="
                group
                bg-white/5 backdrop-blur-xl
                border border-white/10
                rounded-3xl overflow-hidden
                transition-all duration-300
                hover:scale-[1.03]
                hover:shadow-[0_0_35px_rgba(236,72,153,0.35)]
              "
            >
              {/* IMAGE */}
              <div className="relative overflow-hidden rounded-t-3xl">
                <img
                  src={product.images?.[0]?.url || "/placeholder.png"}
                  alt={product.title}
                  className="
                    h-52 w-full object-cover
                    transition-transform duration-500
                    group-hover:scale-110
                  "
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* CONTENT */}
              <div className="p-4 space-y-3">
                {/* TITLE */}
                <div>
                  <h2 className="text-lg font-semibold text-white line-clamp-1">
                    {product.title}
                  </h2>
                  <p className="text-sm text-gray-400">
                    {product.brand} • {product.model}
                  </p>
                </div>

                {/* BADGES */}
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-3 py-1 rounded-full bg-white/10 text-gray-300">
                    {product.condition}
                  </span>

                  {product.isRefurbished && (
                    <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.45)]">
                      Refurbished
                    </span>
                  )}

                  {product.negotiable && (
                    <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.45)]">
                      Negotiable
                    </span>
                  )}
                </div>

                {/* SPECS */}
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                  {product.processor?.model && (
                    <Spec
                      icon={<Cpu size={14} className="text-cyan-400" />}
                      value={`${product.processor.model} ${product.processor.generation || ""}`}
                    />
                  )}

                  {product.ram && (
                    <Spec
                      icon={<MemoryStick size={14} className="text-cyan-400" />}
                      value={`${product.ram} RAM`}
                    />
                  )}

                  {product.rom && (
                    <Spec
                      icon={<HardDrive size={14} className="text-cyan-400" />}
                      value={product.rom}
                    />
                  )}

                  {product.graphics && (
                    <Spec
                      icon={<Monitor size={14} className="text-cyan-400" />}
                      value={`Graphics ${product.graphics}`}
                    />
                  )}
                </div>

                {/* DISPLAY */}
                {product.display && (
                  <p className="text-xs text-gray-400">
                    Display: {product.display.size}" {product.display.resolution} •{" "}
                    {product.display.refreshRate}Hz
                  </p>
                )}

                {/* PRICE */}
                <div className="flex items-center justify-between pt-2">
                  <p className="text-xl font-bold text-emerald-400 flex items-center gap-1">
                    <IndianRupee size={18} />
                    {product.sellingPrice}
                  </p>

                  {product.warrantyAvailable && (
                    <span className="text-xs text-emerald-400 flex items-center gap-1">
                      <BadgeCheck size={14} />
                      {product.warrantyPeriod}
                    </span>
                  )}
                </div>

                {/* STATUS */}
                {product.status !== "AVAILABLE" && (
                  <p className="text-xs text-red-400">
                    {product.status.replace("_", " ")}
                  </p>
                )}

                {/* CTA */}
                <Link
                  to={`/products/${product._id}`}
                  className="
                    block text-center mt-3
                    bg-gradient-to-r from-pink-400 to-purple-500
                    hover:from-pink-300 hover:to-purple-400
                    text-[#141428]
                    py-2 rounded-xl text-sm font-semibold
                    hover:shadow-[0_0_22px_rgba(236,72,153,0.6)]
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
    </div>
  );
}

/* ======================
   SMALL COMPONENT
====================== */
function Spec({ icon, value }) {
  return (
    <div className="flex items-center gap-1">
      {icon}
      <span>{value}</span>
    </div>
  );
}
