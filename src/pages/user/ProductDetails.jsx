import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  IndianRupee,
  BadgeCheck,
  Cpu,
  HardDrive,
  ShieldCheck,
} from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_PRODUCT}/${id}`
        );
        setProduct(res.data.data);
      } catch (err) {
        console.error("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-400">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-400">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6">
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2">

        {/* IMAGES */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
          <img
            src={product.images?.[0]?.url || "/placeholder.png"}
            alt={product.title}
            className="w-full h-80 object-cover rounded-xl"
          />

          {product.images?.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mt-4">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  alt=""
                  className="h-20 w-full object-cover rounded-lg border border-slate-800"
                />
              ))}
            </div>
          )}
        </div>

        {/* DETAILS */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-white">
            {product.title}
          </h1>

          <p className="text-slate-400">
            {product.brand} • {product.model}
          </p>

          {/* PRICE */}
          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold text-green-400 flex items-center gap-1">
              <IndianRupee size={22} />
              {product.sellingPrice}
            </p>

            {product.negotiable && (
              <span className="text-sm text-yellow-400">
                Negotiable
              </span>
            )}
          </div>

          {product.originalPrice && (
            <p className="text-sm text-slate-500 line-through">
              MRP ₹{product.originalPrice}
            </p>
          )}

          {/* CONDITION */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 rounded bg-slate-800 text-slate-300">
              {product.condition}
            </span>

            {product.isRefurbished && (
              <span className="px-3 py-1 rounded bg-blue-900/40 text-blue-400">
                Refurbished
              </span>
            )}

            {product.physicalCondition && (
              <span className="px-3 py-1 rounded bg-slate-800 text-slate-300">
                {product.physicalCondition}
              </span>
            )}
          </div>

          {/* DESCRIPTION */}
          {product.description && (
            <p className="text-slate-300 leading-relaxed">
              {product.description}
            </p>
          )}

          {/* SPECS */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2 text-sm">
            <h3 className="text-white font-semibold mb-2">
              Specifications
            </h3>

            {product.ram && (
              <p className="flex items-center gap-2 text-slate-400">
                <HardDrive size={16} /> RAM: {product.ram}
              </p>
            )}

            {product.rom && (
              <p className="flex items-center gap-2 text-slate-400">
                <HardDrive size={16} /> Storage: {product.rom}
              </p>
            )}

            {product.processor?.model && (
              <p className="flex items-center gap-2 text-slate-400">
                <Cpu size={16} />
                {product.processor.company}{" "}
                {product.processor.model}{" "}
                {product.processor.generation}
              </p>
            )}

            {product.color && (
              <p className="text-slate-400">
                Color: {product.color}
              </p>
            )}
          </div>

          {/* WARRANTY */}
          {product.warrantyAvailable && (
            <p className="flex items-center gap-2 text-emerald-400 text-sm">
              <ShieldCheck size={16} />
              Warranty {product.warrantyPeriod}
            </p>
          )}

          {/* STATUS */}
          {product.status !== "AVAILABLE" && (
            <p className="text-red-400 text-sm">
              {product.status.replace("_", " ")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
