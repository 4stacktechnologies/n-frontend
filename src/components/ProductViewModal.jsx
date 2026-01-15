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
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-5xl h-[90vh] rounded-3xl shadow-xl overflow-y-auto relative transition-all">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          <X size={22} />
        </button>

        {!product ? (
          <div className="p-10 text-center text-gray-500">
            Loading...
          </div>
        ) : (
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* ================= IMAGE ================= */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl h-72 flex items-center justify-center">
              {product.images?.length > 0 ? (
                <img
                  src={product.images[0].url}
                  alt={product.title}
                  className="h-full w-full object-contain rounded-xl"
                />
              ) : (
                <span className="text-gray-400">
                  No Image Available
                </span>
              )}
            </div>

            {/* ================= DETAILS ================= */}
            <div className="space-y-8">

              {/* TITLE */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {product.title}
                </h2>
                <p className="text-gray-600 text-lg font-semibold">
                  ₹{product.sellingPrice}
                </p>
              </div>

              {/* BASIC INFO */}
              <div className="grid grid-cols-2 gap-5 text-sm">
                <Info label="Brand" value={product.brand} />
                <Info label="Model" value={product.model} />
                <Info label="Category" value={product.category} />
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
                <h3 className="text-gray-900 font-semibold mb-3">
                  Specifications
                </h3>

                <div className="grid grid-cols-2 gap-5 text-sm">
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
                  <h3 className="text-gray-900 font-semibold mb-2">
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
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
      <p className="text-gray-500 text-xs uppercase tracking-wide">
        {label}
      </p>
      <p className="text-gray-900 font-medium">
        {value || "-"}
      </p>
    </div>
  );
}
