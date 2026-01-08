import { useEffect, useState } from "react";
import { Eye, Pencil, Plus, Trash2, Search } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ProductViewModal from "../../components/ProductViewModal";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const fetchProducts = async () => {
    const toastId = toast.loading("Loading products...");
    try {
      setLoading(true);
      const res = await axios.get(import.meta.env.VITE_API_PRODUCT, {
        withCredentials: true,
      });

      setProducts(res.data.data || []);
      setFiltered(res.data.data || []);
      toast.success("Products loaded", { id: toastId });
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to load products", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    const toastId = toast.loading("Deleting product...");
    try {
      await axios.delete(`${import.meta.env.VITE_API_PRODUCT}/${id}`, {
        withCredentials: true,
      });

      setProducts((prev) => prev.filter((p) => p._id !== id));
      setFiltered((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted successfully", { id: toastId });
    } catch (err) {
      toast.error(err.response?.data?.msg || "Delete failed", { id: toastId });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Local search filtering
  useEffect(() => {
    const s = search.toLowerCase();
    setFiltered(
      products.filter((p) =>
        [p.title, p.brand, p.model, p.category]
          .filter(Boolean)
          .some((val) => val.toLowerCase().includes(s))
      )
    );
  }, [search, products]);

  return (
    <div className="relative min-h-screen p-6 text-white overflow-hidden 
      bg-gradient-to-br from-[#0b0b19] via-[#1e1038] to-[#381040]">

      {/* Glow blobs */}
      <div className="absolute -top-40 -left-20 w-[420px] h-[420px] bg-pink-500/20 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/3 right-0 w-[420px] h-[420px] bg-purple-600/20 blur-[140px] rounded-full pointer-events-none"></div>

      {/* Header Row */}
      <div className="relative flex items-center justify-between mb-6 z-10">
        <h1 className="text-3xl font-bold tracking-wide text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.15)]">
          Products
        </h1>

        <Link
          to="/dashboard/products/create"
          className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600
            hover:from-pink-400 hover:to-purple-500 text-[#0b0b19] font-semibold
            rounded-xl px-5 py-2.5 transition shadow-[0_0_20px_rgba(236,72,153,0.5)]
            hover:shadow-[0_0_28px_rgba(236,72,153,0.7)]"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      {/* SEARCH BAR — Always Visible */}
      <div className="relative mb-4 max-w-sm z-10">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-300" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 
            text-white placeholder-pink-200 focus:outline-none focus:border-pink-400 
            backdrop-blur-xl"
        />
      </div>

      {/* TABLE */}
      <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-x-auto shadow-[0_0_40px_rgba(0,0,0,0.25)] z-10">

        <table className="w-full text-sm whitespace-nowrap">
          <thead className="bg-gradient-to-r from-[#221235] to-[#341445] text-gray-300 uppercase text-xs tracking-wider">
            <tr>
              <Th>Title</Th>
              <Th>Brand</Th>
              <Th>Model</Th>
              <Th>Category</Th>
              <Th>Price</Th>
              <Th>Condition</Th>
              <Th>Warranty</Th>
              <Th>Status</Th>
              <Th>Approved</Th>
              <Th>Created</Th>
              <Th className="text-center">Actions</Th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan="11" className="p-6 text-center text-gray-400">
                  Loading...
                </td>
              </tr>
            )}

            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan="11" className="p-6 text-center text-gray-400">
                  No products found
                </td>
              </tr>
            )}

            {filtered.map((product) => (
              <tr key={product._id} className="border-t border-white/10 hover:bg-white/5 transition">
                <Td className="font-semibold text-white">{product.title}</Td>
                <Td>{product.brand || "-"}</Td>
                <Td>{product.model || "-"}</Td>
                <Td>{product.category}</Td>
                <Td className="text-pink-400 font-semibold">₹{product.sellingPrice}</Td>
                <Td>{product.condition}</Td>
                <Td>{product.warrantyAvailable ? product.warrantyPeriod || "Yes" : "No"}</Td>

                <Td>
                  <Badge type={
                    product.status === "AVAILABLE"
                      ? "green"
                      : product.status === "SOLD"
                      ? "red"
                      : "yellow"
                  } text={product.status} />
                </Td>

                <Td>
                  <Badge type={product.isApproved ? "cyan" : "gray"} text={product.isApproved ? "Approved" : "Pending"} />
                </Td>

                <Td>{new Date(product.createdAt).toLocaleDateString()}</Td>

                <td className="p-3 flex gap-4 justify-center">
                  <Link
                    to={`/dashboard/products/edit/${product._id}`}
                    className="text-cyan-400 hover:text-cyan-300 hover:scale-110 transition"
                  >
                    <Pencil size={18} />
                  </Link>

                  <button
                    onClick={() => {
                      setSelectedProductId(product._id);
                      setIsViewOpen(true);
                    }}
                    className="text-green-400 hover:text-green-300 hover:scale-110 transition"
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="text-red-400 hover:text-red-300 hover:scale-110 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isViewOpen && (
        <ProductViewModal
          productId={selectedProductId}
          onClose={() => setIsViewOpen(false)}
        />
      )}
    </div>
  );
}

const Th = ({ children, className }) => (
  <th className={`p-3 text-left font-semibold ${className || ""}`}>{children}</th>
);

const Td = ({ children, className }) => (
  <td className={`p-3 text-gray-300 ${className || ""}`}>{children}</td>
);

function Badge({ type, text }) {
  const colors = {
    green: "bg-green-500/20 text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.4)]",
    red: "bg-red-500/20 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.4)]",
    yellow: "bg-yellow-500/20 text-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.4)]",
    cyan: "bg-cyan-500/20 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.4)]",
    gray: "bg-white/10 text-gray-400",
  };
  return <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[type]}`}>{text}</span>;
}
