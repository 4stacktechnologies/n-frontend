import { useEffect, useState } from "react";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ProductViewModal from "../../components/ProductViewModal";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  /* ======================
     FETCH PRODUCTS
  ====================== */
  const fetchProducts = async () => {
    const toastId = toast.loading("Loading products...");
    try {
      setLoading(true);
      const res = await axios.get(import.meta.env.VITE_API_PRODUCT, {
        withCredentials: true,
      });

      setProducts(res.data.data || []);
      toast.success("Products loaded", { id: toastId });
    } catch (err) {
      toast.error(
        err.response?.data?.msg || "Failed to load products",
        { id: toastId }
      );
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     DELETE PRODUCT
  ====================== */
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    const toastId = toast.loading("Deleting product...");
    try {
      await axios.delete(`${import.meta.env.VITE_API_PRODUCT}/${id}`, {
        withCredentials: true,
      });

      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted successfully", { id: toastId });
    } catch (err) {
      toast.error(
        err.response?.data?.msg || "Delete failed",
        { id: toastId }
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div
      className="
        relative p-6 min-h-screen
        bg-gradient-to-br from-[#0b0b1a] via-[#141428] to-[#05050f]
        text-white
      "
    >
      {/* Soft glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-500/10 blur-[140px]" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/10 blur-[160px]" />

      {/* HEADER */}
      <div className="relative flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-wide text-white">
          Products
        </h1>

        <Link
          to="/dashboard/products/create"
          className="
            flex items-center gap-2
            bg-gradient-to-r from-pink-400 to-purple-500
            hover:from-pink-300 hover:to-purple-400
            text-[#141428]
            px-5 py-2 rounded-xl
            font-semibold
            hover:shadow-[0_0_20px_rgba(236,72,153,0.6)]
            transition
          "
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      {/* TABLE CARD */}
      <div
        className="
          relative
          bg-white/5 backdrop-blur-xl
          border border-white/10
          rounded-2xl
          overflow-x-auto
        "
      >
        <table className="w-full text-sm">
          <thead
            className="
              bg-gradient-to-r from-[#0f0f23] to-[#141428]
              text-gray-400
              uppercase text-xs tracking-wider
            "
          >
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Brand</th>
              <th className="p-3 text-left">Model</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Condition</th>
              <th className="p-3 text-left">Warranty</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Approved</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-center">Actions</th>
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

            {!loading && products.length === 0 && (
              <tr>
                <td colSpan="11" className="p-6 text-center text-gray-400">
                  No products found
                </td>
              </tr>
            )}

            {products.map((product) => (
              <tr
                key={product._id}
                className="
                  border-t border-white/5
                  hover:bg-pink-500/5
                  transition
                "
              >
                <td className="p-3 font-medium text-white">
                  {product.title}
                </td>

                <td className="p-3 text-gray-300">
                  {product.brand || "-"}
                </td>

                <td className="p-3 text-gray-300">
                  {product.model || "-"}
                </td>

                <td className="p-3 text-gray-300">
                  {product.category}
                </td>

                <td className="p-3 text-pink-400 font-medium">
                  ₹{product.sellingPrice}
                </td>

                <td className="p-3 text-gray-300">
                  {product.condition}
                </td>

                <td className="p-3 text-gray-300">
                  {product.warrantyAvailable
                    ? product.warrantyPeriod || "Yes"
                    : "No"}
                </td>

                {/* STATUS */}
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        product.status === "AVAILABLE"
                          ? "bg-green-500/20 text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.4)]"
                          : product.status === "SOLD"
                          ? "bg-red-500/20 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.4)]"
                          : "bg-yellow-500/20 text-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.4)]"
                      }`}
                  >
                    {product.status}
                  </span>
                </td>

                {/* APPROVED */}
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        product.isApproved
                          ? "bg-cyan-500/20 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.4)]"
                          : "bg-white/10 text-gray-400"
                      }`}
                  >
                    {product.isApproved ? "Approved" : "Pending"}
                  </span>
                </td>

                <td className="p-3 text-gray-400">
                  {product.createdAt
                    ? new Date(product.createdAt).toLocaleDateString()
                    : "-"}
                </td>

                {/* ACTIONS */}
                <td className="p-3 flex justify-center gap-4">
                  <Link
                    to={`/dashboard/products/edit/${product._id}`}
                    className="
                      text-cyan-400
                      hover:text-cyan-300
                      hover:scale-110
                      hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]
                      transition
                    "
                    title="Edit Product"
                  >
                    <Pencil size={18} />
                  </Link>

                  <button
                    onClick={() => {
                      setSelectedProductId(product._id);
                      setIsViewOpen(true);
                    }}
                    className="
                      text-green-400
                      hover:text-green-300
                      hover:scale-110
                      hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]
                      transition
                    "
                    title="View Product"
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="
                      text-red-400
                      hover:text-red-300
                      hover:scale-110
                      hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]
                      transition
                    "
                    title="Delete Product"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* VIEW MODAL */}
      {isViewOpen && (
        <ProductViewModal
          productId={selectedProductId}
          onClose={() => setIsViewOpen(false)}
        />
      )}
    </div>
  );
}
