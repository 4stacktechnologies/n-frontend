// ███████████████████████████████████████████████
// ProductDetails.jsx — HiAnime Theme (Pink/Purple)
// ███████████████████████████████████████████████

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  IndianRupee,
  BadgeCheck,
  Cpu,
  HardDrive,
  Monitor,
  Keyboard,
  ShieldCheck,
  User,
  Calendar,
  Settings,
  Battery,
  Camera,
  Plug,
} from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_PRODUCT}/${id}`
        );
        setProduct(res.data.data);
        setActiveImage(res.data.data?.images?.[0]?.url || null);
      } catch {
        console.error("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0b1b] flex items-center justify-center text-pink-300">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0b0b1b] flex items-center justify-center text-pink-300">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 relative overflow-hidden bg-gradient-to-br from-[#0b0b1b] via-[#130b24] to-[#1a0d32] text-white">

      {/* Glowing Blobs */}
      <div className="absolute top-[-200px] right-[-150px] w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[-200px] left-[-150px] w-[350px] h-[350px] bg-purple-500/20 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-2">

        {/* IMAGE PANEL */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 shadow-[0_0_40px_rgba(255,0,180,0.2)] transition">

          <img
            src={activeImage || "/placeholder.png"}
            alt={product.title}
            className="w-full h-96 object-contain rounded-2xl"
          />

          {product.images?.length > 1 && (
            <div className="grid grid-cols-5 gap-2 mt-4">
              {product.images.map((img) => (
                <button
                  key={img._id}
                  onClick={() => setActiveImage(img.url)}
                  className={`rounded-xl overflow-hidden border transition-all duration-200
                    ${
                      activeImage === img.url
                        ? "border-pink-400 shadow-[0_0_12px_rgba(255,0,180,0.6)]"
                        : "border-white/10 hover:border-pink-400/40"
                    }
                  `}
                >
                  <img
                    src={img.url}
                    className="h-20 w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* DETAILS PANEL */}
        <div className="space-y-6">

          {/* TITLE */}
          <div>
            <h1 className="text-3xl font-bold tracking-wide">
              {product.title}
            </h1>
            <p className="text-gray-400">
              {product.brand} • {product.model} • {product.category}
            </p>
          </div>

          {/* PRICE */}
          <div>
            <p className="text-3xl font-bold text-pink-400 flex items-center gap-1 drop-shadow-[0_0_6px_rgba(255,0,180,0.6)]">
              <IndianRupee size={22} />
              {product.sellingPrice}
            </p>

            {product.negotiable && (
              <span className="text-xs bg-pink-500/20 text-pink-300 border border-pink-500/40 px-3 py-1 rounded-full">
                Negotiable
              </span>
            )}
          </div>

          {/* BADGES */}
          <div className="flex flex-wrap gap-2 text-xs">
            <Badge text={product.condition} />
            {product.isRefurbished && (
              <Badge text="Refurbished" color="purple" />
            )}
          </div>

          {/* DESCRIPTION */}
          {product.description && (
            <p className="text-gray-300 leading-relaxed">
              {product.description}
            </p>
          )}

          {/* CORE SPECS */}
          <Section title="Core Specifications">
            <Spec icon={<Cpu size={16} />} label="Processor">
              {product.processor?.company} {product.processor?.model}
            </Spec>
            <Spec icon={<HardDrive size={16} />} label="RAM">
              {product.ram?.size} GB {product.ram?.type}
            </Spec>
            <Spec icon={<HardDrive size={16} />} label="Storage">
              {product.storage?.size} GB {product.storage?.type}
            </Spec>
            <Spec icon={<Settings size={16} />} label="OS">
              {product.operatingSystem}
            </Spec>
            <Spec icon={<Monitor size={16} />} label="Graphics">
              {product.graphics}
            </Spec>
          </Section>

          {/* DISPLAY */}
          {product.display && (
            <Section title="Display">
              <Spec label="Size">{product.display.size}"</Spec>
              <Spec label="Resolution">{product.display.resolution}</Spec>
              <Spec label="Panel">{product.display.panel}</Spec>
              <Spec label="Refresh Rate">{product.display.refreshRate}Hz</Spec>
            </Section>
          )}

          {/* BATTERY */}
          <Section title="Battery & Camera">
            <Spec icon={<Battery size={16} />} label="Battery">
              {product.battery?.capacity} mAh
            </Spec>
            <Spec icon={<Camera size={16} />} label="Camera">
              {product.camera?.resolution}
            </Spec>
            <Spec icon={<Plug size={16} />} label="Charging">
              {product.charger?.type}
            </Spec>
          </Section>

          {/* KEYBOARD */}
          {product.keyboard && (
            <Section title="Keyboard">
              <Spec label="Backlit">
                {product.keyboard.backlit ? "Yes" : "No"}
              </Spec>
              <Spec label="Layout">{product.keyboard.layout}</Spec>
            </Section>
          )}

          {/* WARRANTY */}
          {product.warrantyAvailable && (
            <div className="flex items-center gap-2 text-purple-300 text-sm">
              <ShieldCheck size={16} />
              Warranty: {product.warrantyPeriod}
            </div>
          )}

          {/* META */}
          <Section title="Seller & Meta">
            <Spec icon={<User size={16} />} label="Owner">
              {product.ownerID?.name} ({product.ownerID?.email})
            </Spec>
            <Spec label="Status">{product.status}</Spec>
            <Spec label="Approved">
              {product.isApproved ? "Yes" : "Pending"}
            </Spec>
            <Spec icon={<Calendar size={16} />} label="Listed On">
              {new Date(product.createdAt).toLocaleDateString()}
            </Spec>
          </Section>
        </div>
      </div>
    </div>
  );
}

/* ===== Sub Components ===== */

function Section({ title, children }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-[0_0_25px_rgba(255,0,180,0.15)]">
      <h3 className="font-semibold mb-3 text-pink-300 tracking-wide">
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
        {children}
      </div>
    </div>
  );
}

function Spec({ icon, label, children }) {
  return (
    <div className="flex gap-2 text-gray-300">
      {icon && <span className="text-pink-300">{icon}</span>}
      <span className="text-gray-400">{label}:</span>
      <span className="text-white">{children || "N/A"}</span>
    </div>
  );
}

function Badge({ text, color = "pink" }) {
  const styles = {
    pink: "bg-pink-500/20 border-pink-500/40 text-pink-300",
    purple: "bg-purple-500/20 border-purple-500/40 text-purple-300",
  };
  return (
    <span className={`px-3 py-1 rounded-full border text-xs ${styles[color]}`}>
      {text}
    </span>
  );
}
