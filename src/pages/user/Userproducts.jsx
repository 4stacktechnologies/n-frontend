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

    console.log("Fetching user products...");
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400">
        Loading products...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          Available Products
        </h1>

        {products.length === 0 && (
          <p className="text-slate-400">No products available</p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition"
            >
              {/* IMAGE */}
              <img
                src={product.images?.[0]?.url || "/placeholder.png"}
                alt={product.title}
                className="h-52 w-full object-cover"
              />

              {/* CONTENT */}
              <div className="p-4 space-y-3">
                {/* TITLE */}
                <div>
                  <h2 className="text-lg font-semibold text-white line-clamp-1">
                    {product.title}
                  </h2>
                  <p className="text-sm text-slate-400">
                    {product.brand} • {product.model}
                  </p>
                </div>

                {/* BADGES */}
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-1 rounded bg-slate-800 text-slate-300">
                    {product.condition}
                  </span>

                  {product.isRefurbished && (
                    <span className="px-2 py-1 rounded bg-blue-900/40 text-blue-400">
                      Refurbished
                    </span>
                  )}

                  {product.negotiable && (
                    <span className="px-2 py-1 rounded bg-yellow-900/40 text-yellow-400">
                      Negotiable
                    </span>
                  )}
                </div>

                {/* KEY SPECS */}
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                  {product.processor?.model && (
                    <Spec
                      icon={<Cpu size={14} />}
                      value={`${product.processor.model} ${product.processor.generation || ""}`}
                    />
                  )}

                  {product.ram && (
                    <Spec
                      icon={<MemoryStick size={14} />}
                      value={`${product.ram} RAM`}
                    />
                  )}

                  {product.rom && (
                    <Spec
                      icon={<HardDrive size={14} />}
                      value={product.rom}
                    />
                  )}

                  {product.graphics && (
                    <Spec
                      icon={<Monitor size={14} />}
                      value={`Graphics ${product.graphics}`}
                    />
                  )}
                </div>

                {/* DISPLAY */}
                {product.display && (
                  <p className="text-xs text-slate-400">
                    Display: {product.display.size}" {product.display.resolution} •{" "}
                    {product.display.refreshRate}Hz
                  </p>
                )}

                {/* PRICE */}
                <div className="flex items-center justify-between pt-2">
                  <p className="text-xl font-bold text-green-400 flex items-center gap-1">
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

                {/* BUTTON */}
                <Link
                  to={`/products/${product._id}`}
                  className="block text-center mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition"
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
