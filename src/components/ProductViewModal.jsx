import { useEffect, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

export default function ProductViewModal({ productId, onClose }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_PRODUCT}/${productId}`,
        { withCredentials: true }
      );
      setProduct(res.data.data);
    };

    fetchProduct();
  }, [productId]);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-slate-900 w-full max-w-5xl h-[90vh] rounded-xl border border-slate-800 overflow-y-auto relative">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X size={24} />
        </button>

        {!product ? (
          <div className="p-6 text-center text-slate-400">Loading...</div>
        ) : (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* ================= IMAGE ================= */}
            <div className="bg-slate-800 rounded-lg border border-slate-700 h-72 flex items-center justify-center">
              {product.images?.length > 0 ? (
                <img
                  src={product.images[0].url}
                  alt={product.title}
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="text-slate-400">No Image Available</span>
              )}
            </div>

            {/* ================= DETAILS ================= */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">
                {product.title}
              </h2>

              {/* BASIC INFO */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <Info label="Brand" value={product.brand} />
                <Info label="Model" value={product.model} />
                <Info label="Category" value={product.category} />
                <Info label="Price" value={`₹${product.sellingPrice}`} />
                <Info label="Condition" value={product.condition} />
                <Info label="Status" value={product.status} />
                <Info
                  label="Warranty"
                  value={
                    product.warrantyAvailable
                      ? product.warrantyPeriod
                      : "No"
                  }
                />
              </div>

              {/* SPECIFICATIONS */}
              <div>
                <h3 className="text-white font-semibold mb-2">
                  Specifications
                </h3>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <Info
                    label="RAM"
                    value={
                      product.ram
                        ? `${product.ram.size} GB ${product.ram.type}`
                        : "-"
                    }
                  />
                  <Info
                    label="Storage"
                    value={
                      product.storage
                        ? `${product.storage.size} GB ${product.storage.type}`
                        : "-"
                    }
                  />
                  <Info
                    label="Processor"
                    value={
                      product.processor
                        ? `${product.processor.company} ${product.processor.model}`
                        : "-"
                    }
                  />
                  <Info
                    label="Display"
                    value={
                      product.display
                        ? `${product.display.size}" ${product.display.panel} ${product.display.refreshRate}Hz`
                        : "-"
                    }
                  />
                  <Info
                    label="Battery"
                    value={
                      product.battery
                        ? `${product.battery.capacity} mAh`
                        : "-"
                    }
                  />
                  <Info
                    label="Camera"
                    value={product.camera?.resolution}
                  />
                  <Info label="OS" value={product.operatingSystem} />
                  <Info label="Graphics" value={product.graphics} />
                </div>
              </div>

              {/* DESCRIPTION */}
              {product.description && (
                <div>
                  <h3 className="text-white font-semibold mb-2">
                    Description
                  </h3>
                  <p className="text-slate-400">
                    {product.description}
                  </p>
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-slate-400">{label}</p>
      <p className="text-white font-medium">{value || "-"}</p>
    </div>
  );
}
