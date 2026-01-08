// ███████████████████████████████████████████████
// ProductDetails.jsx — HiAnime Theme + Related Items
// ███████████████████████████████████████████████

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  IndianRupee,
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
  const [activeImage, setActiveImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const [related, setRelated] = useState([]); // NEW

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_PRODUCT}/${id}`);
        const data = res.data.data;
        setProduct(data);
        setActiveImage(data?.images?.[0]?.url || null);

        // Fetch related products after loading product
        fetchRelatedProducts(data.category);
      } catch {
        console.error("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const fetchRelatedProducts = async (category) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_PRODUCT}?category=${category}&count=3&segment=random`
      );

      setRelated(
        (res.data.data || []).filter((p) => p._id !== id) // avoid showing itself
      );
    } catch (err) {
      console.error("Failed to fetch related products");
    }
  };

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

      {/* Background Glow */}
      <div className="absolute -top-40 -right-40 w-[380px] h-[380px] bg-pink-500/25 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 -left-40 w-[340px] h-[340px] bg-purple-500/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-2">

        {/* IMAGE PANEL */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 shadow-[0_0_40px_rgba(255,0,180,0.2)]">

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
                  className={`rounded-xl overflow-hidden border transition ${
                    activeImage === img.url
                      ? "border-pink-400 shadow-[0_0_12px_rgba(255,0,180,0.6)]"
                      : "border-white/10 hover:border-pink-400/40"
                  }`}
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
            {product.isRefurbished && <Badge text="Refurbished" color="purple" />}
          </div>

          {/* DESCRIPTION */}
          {product.description && (
            <p className="text-gray-300 leading-relaxed">
              {product.description}
            </p>
          )}

          {/* SPECS */}
          <SpecsSections product={product} />

          {/* WARRANTY */}
          {product.warrantyAvailable && (
            <div className="flex items-center gap-2 text-purple-300 text-sm">
              <ShieldCheck size={16} />
              Warranty: {product.warrantyPeriod}
            </div>
          )}

        </div>
      </div>

      {/* ================= RELATED PRODUCTS ================= */}
      {related.length > 0 && (
        <div className="max-w-7xl mx-auto mt-14">
          <h2 className="text-2xl font-bold mb-4 text-pink-300 tracking-wide">
            More in {product.category}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((item) => (
              <Link
                key={item._id}
                to={`/products/${item._id}`}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-[0_0_20px_rgba(255,0,180,0.15)] hover:shadow-[0_0_26px_rgba(255,0,180,0.3)] transition block"
              >
                <img
                  src={item.images?.[0]?.url || "/placeholder.png"}
                  className="w-full h-40 object-cover rounded-xl mb-3"
                />

                <p className="text-white font-semibold line-clamp-1">
                  {item.title}
                </p>
                <p className="text-gray-400 text-sm mb-1">
                  {item.brand} • {item.model}
                </p>

                <p className="text-pink-400 font-bold flex items-center gap-1">
                  <IndianRupee size={15} /> {item.sellingPrice}
                </p>

                <span className="text-xs bg-pink-500/20 border border-pink-500/20 text-pink-300 px-2 py-1 rounded-xl mt-1 inline-block">
                  {item.condition}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

/* ===== Small Components ===== */

function SpecsSections({ product }) {
  return (
    <>
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

      {product.display && (
        <Section title="Display">
          <Spec label="Size">{product.display.size}"</Spec>
          <Spec label="Resolution">{product.display.resolution}</Spec>
          <Spec label="Panel">{product.display.panel}</Spec>
          <Spec label="Refresh Rate">{product.display.refreshRate}Hz</Spec>
        </Section>
      )}

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

      {product.keyboard && (
        <Section title="Keyboard">
          <Spec label="Backlit">
            {product.keyboard.backlit ? "Yes" : "No"}
          </Spec>
          <Spec label="Layout">{product.keyboard.layout}</Spec>
        </Section>
      )}

      <Section title="Seller & Meta">
        <Spec icon={<User size={16} />} label="Owner">
          {product.ownerID?.name} ({product.ownerID?.email})
        </Spec>
        <Spec label="Status">{product.status}</Spec>
        <Spec label="Approved">{product.isApproved ? "Yes" : "Pending"}</Spec>
        <Spec icon={<Calendar size={16} />} label="Listed On">
          {new Date(product.createdAt).toLocaleDateString()}
        </Spec>
      </Section>
    </>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-[0_0_22px_rgba(255,0,180,0.15)] mt-3">
      <h3 className="font-semibold mb-2 text-pink-300">{title}</h3>
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
