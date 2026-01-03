import { useEffect, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

export default function ProductViewModal({ productId, onClose }) {
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_PRODUCT}/${productId}`,
        { withCredentials: true }
      );

      setProduct(res.data.data);

      // set first image as default
      if (res.data.data?.images?.length > 0) {
        setActiveImage(res.data.data.images[0].url);
      }
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

            {/* =====================
               IMAGE SECTION
            ===================== */}
            <div>
              {/* MAIN IMAGE */}
              <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 h-72 flex items-center justify-center">
                {activeImage ? (
                  <img
                    src={activeImage}
                    alt={product.title}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="text-slate-400">No Image</span>
                )}
              </div>

              {/* THUMBNAILS */}
              {product.images?.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto">
                  {product.images.map((img) => (
                    <button
                      key={img._id}
                      onClick={() => setActiveImage(img.url)}
                      className={`h-16 w-16 rounded-lg border overflow-hidden flex-shrink-0 ${
                        activeImage === img.url
                          ? "border-green-500"
                          : "border-slate-700"
                      }`}
                    >
                      <img
                        src={img.url}
                        alt="thumbnail"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* =====================
               DETAILS SECTION
            ===================== */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">
                {product.title}
              </h2>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <Info label="Brand" value={product.brand} />
                <Info label="Model" value={product.model} />
                <Info label="Category" value={product.category} />
                <Info label="Price" value={`₹${product.sellingPrice}`} />
                <Info label="RAM" value={product.ram} />
                <Info label="ROM" value={product.rom} />
                <Info label="OS" value={product.operatingSystem} />
                <Info label="Condition" value={product.condition} />
                <Info
                  label="Warranty"
                  value={product.warrantyAvailable ? product.warrantyPeriod : "No"}
                />
                <Info label="Status" value={product.status} />
              </div>

              {product.description && (
                <div>
                  <h3 className="text-white font-semibold mb-2">Description</h3>
                  <p className="text-slate-400">{product.description}</p>
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
