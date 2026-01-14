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

  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_PRODUCT}/${id}`);
        const data = res.data.data;
        setProduct(data);
        setActiveImage(data?.images?.[0]?.url || null);

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
        (res.data.data || []).filter((p) => p._id !== id)
      );
    } catch (err) {
      console.error("Failed to fetch related products");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center text-gray-600">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center text-gray-600">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 text-gray-800">

      <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-2">

        {/* IMAGE PANEL */}
        <div className="bg-white border border-gray-300 rounded-3xl p-4 shadow-sm">
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
                      ? "border-gray-400 shadow-sm"
                      : "border-gray-300 hover:border-gray-400"
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
            <h1 className="text-3xl font-bold tracking-wide text-gray-900">
              {product.title}
            </h1>
            <p className="text-gray-500">
              {product.brand} • {product.model} • {product.category}
            </p>
          </div>

          {/* PRICE */}
          <div>
            <p className="text-3xl font-bold text-gray-900 flex items-center gap-1">
              <IndianRupee size={22} />
              {product.sellingPrice}
            </p>
            {product.negotiable && (
              <span className="text-xs bg-gray-100 border border-gray-300 text-gray-600 px-3 py-1 rounded-full">
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
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          )}

          {/* SPECS */}
          <SpecsSections product={product} />

          {/* WARRANTY */}
          {product.warrantyAvailable && (
            <div className="flex items-center gap-2 text-green-700 text-sm">
              <ShieldCheck size={16} />
              Warranty: {product.warrantyPeriod}
            </div>
          )}
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {related.length > 0 && (
        <div className="max-w-7xl mx-auto mt-14">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 tracking-wide">
            More in {product.category}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((item) => (
              <Link
                key={item._id}
                to={`/products/${item._id}`}
                className="bg-white border border-gray-300 rounded-2xl p-4 shadow-sm hover:shadow-md transition block"
              >
                <img
                  src={item.images?.[0]?.url || "/placeholder.png"}
                  className="w-full h-40 object-cover rounded-xl mb-3"
                />
                <p className="text-gray-900 font-semibold line-clamp-1">{item.title}</p>
                <p className="text-gray-500 text-sm mb-1">{item.brand} • {item.model}</p>
                <p className="text-gray-900 font-bold flex items-center gap-1">
                  <IndianRupee size={15} /> {item.sellingPrice}
                </p>
                <span className={`text-xs px-2 py-1 rounded-xl inline-block border ${
                  item.condition === "Verified"
                    ? "bg-green-100 border-green-300 text-green-700"
                    : "bg-red-100 border-red-300 text-red-700"
                }`}>
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
          <Spec label="Backlit">{product.keyboard.backlit ? "Yes" : "No"}</Spec>
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
    <div className="bg-white border border-gray-300 rounded-2xl p-4 shadow-sm mt-3">
      <h3 className="font-semibold mb-2 text-gray-500">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">{children}</div>
    </div>
  );
}

function Spec({ icon, label, children }) {
  return (
    <div className="flex gap-2">
      {icon && <span className="text-gray-500">{icon}</span>}
      <span className="text-gray-500">{label}:</span>
      <span className="text-gray-900 font-medium">{children || "N/A"}</span>
    </div>
  );
}

function Badge({ text, color = "pink" }) {
  const styles = {
    pink: "bg-gray-100 border-gray-300 text-gray-800",
    purple: "bg-gray-100 border-gray-300 text-gray-800",
  };
  return (
    <span className={`px-3 py-1 rounded-full border text-xs ${styles[color]}`}>
      {text}
    </span>
  );
}
