import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BadgeCheck, IndianRupee } from "lucide-react";

export default function UserProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_PRODUCTS;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(API);
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
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Loading products...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">
        Available Products
      </h1>

      {products.length === 0 && (
        <p className="text-slate-400">No products available</p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map(product => (
          <div
            key={product._id}
            className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition"
          >
            {/* IMAGE */}
            <img
              src={product.images?.[0]?.url || "/placeholder.png"}
              alt={product.title}
              className="h-48 w-full object-cover"
            />

            {/* CONTENT */}
            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold text-white line-clamp-1">
                {product.title}
              </h2>

              <p className="text-slate-400 text-sm">
                {product.brand} • {product.model}
              </p>

              {/* CONDITION */}
              <div className="flex gap-2 text-xs">
                <span className="px-2 py-1 rounded bg-slate-800 text-slate-300">
                  {product.condition}
                </span>

                {product.isRefurbished && (
                  <span className="px-2 py-1 rounded bg-blue-900/40 text-blue-400">
                    Refurbished
                  </span>
                )}
              </div>

              {/* SPECS */}
              <div className="text-xs text-slate-400">
                {product.ram && <span>{product.ram} RAM</span>}
                {product.rom && <span> • {product.rom} Storage</span>}
                {product.processor?.model && (
                  <span> • {product.processor.model}</span>
                )}
              </div>

              {/* PRICE */}
              <div className="flex items-center justify-between pt-2">
                <p className="text-xl font-bold text-green-400 flex items-center gap-1">
                  <IndianRupee size={18} />
                  {product.sellingPrice}
                </p>

                {product.negotiable && (
                  <span className="text-xs text-yellow-400">
                    Negotiable
                  </span>
                )}
              </div>

              {/* WARRANTY */}
              {product.warrantyAvailable && (
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                  <BadgeCheck size={14} />
                  Warranty {product.warrantyPeriod}
                </p>
              )}

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
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
