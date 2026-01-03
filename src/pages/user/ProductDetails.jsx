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
        setActiveImage(res.data.data?.images?.[0]?.url);
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
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-2">

        {/* =====================
           IMAGE GALLERY
        ===================== */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
          <img
            src={activeImage || "/placeholder.png"}
            alt={product.title}
            className="w-full h-96 object-contain rounded-xl"
          />

          {product.images?.length > 1 && (
            <div className="grid grid-cols-5 gap-2 mt-4">
              {product.images.map((img) => (
                <button
                  key={img._id}
                  onClick={() => setActiveImage(img.url)}
                  className={`border rounded-lg overflow-hidden ${
                    activeImage === img.url
                      ? "border-green-500"
                      : "border-slate-800"
                  }`}
                >
                  <img
                    src={img.url}
                    alt=""
                    className="h-20 w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* =====================
           DETAILS
        ===================== */}
        <div className="space-y-6">
          {/* TITLE */}
          <div>
            <h1 className="text-3xl font-bold text-white">
              {product.title}
            </h1>
            <p className="text-slate-400">
              {product.brand} • {product.model} • {product.category}
            </p>
          </div>

          {/* PRICE */}
          <div>
            <p className="text-3xl font-bold text-green-400 flex items-center gap-1">
              <IndianRupee size={22} />
              {product.sellingPrice}
            </p>

            {product.originalPrice && (
              <p className="text-sm text-slate-500 line-through">
                MRP ₹{product.originalPrice}
              </p>
            )}

            {product.negotiable && (
              <span className="text-sm text-yellow-400">
                Negotiable
              </span>
            )}
          </div>

          {/* BADGES */}
          <div className="flex flex-wrap gap-2 text-xs">
            <Badge text={product.condition} />
            {product.isRefurbished && (
              <Badge text="Refurbished" color="blue" />
            )}
            {product.physicalCondition && (
              <Badge text={product.physicalCondition} />
            )}
          </div>

          {/* DESCRIPTION */}
          {product.description && (
            <p className="text-slate-300 leading-relaxed">
              {product.description}
            </p>
          )}

          {/* =====================
             SPECIFICATIONS
          ===================== */}
          <Section title="Core Specifications">
            <Spec icon={<Cpu size={16} />} label="Processor">
              {product.processor?.company} {product.processor?.model}{" "}
              {product.processor?.generation}
            </Spec>
            <Spec icon={<HardDrive size={16} />} label="RAM">
              {product.ram}
            </Spec>
            <Spec icon={<HardDrive size={16} />} label="Storage">
              {product.rom}
            </Spec>
            <Spec icon={<Settings size={16} />} label="Operating System">
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
              <Spec label="Refresh Rate">
                {product.display.refreshRate}Hz
              </Spec>
            </Section>
          )}

          {/* KEYBOARD */}
          {product.keyboard && (
            <Section title="Keyboard">
              <Spec
                icon={<Keyboard size={16} />}
                label="Backlit"
              >
                {product.keyboard.backlit ? "Yes" : "No"}
              </Spec>
              <Spec label="Layout">
                {product.keyboard.layout}
              </Spec>
            </Section>
          )}

          {/* WARRANTY */}
          {product.warrantyAvailable && (
            <div className="flex items-center gap-2 text-emerald-400 text-sm">
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

/* =====================
   REUSABLE UI
===================== */

function Section({ title, children }) {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
      <h3 className="text-white font-semibold mb-3">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
        {children}
      </div>
    </div>
  );
}

function Spec({ icon, label, children }) {
  return (
    <div className="flex gap-2 text-slate-300">
      {icon && <span className="text-slate-400">{icon}</span>}
      <span className="text-slate-400">{label}:</span>
      <span className="text-white">{children || "N/A"}</span>
    </div>
  );
}

function Badge({ text, color = "slate" }) {
  const colors = {
    slate: "bg-slate-800 text-slate-300",
    blue: "bg-blue-900/40 text-blue-400",
  };
  return (
    <span
      className={`px-3 py-1 rounded ${colors[color]} text-xs`}
    >
      {text}
    </span>
  );
}
