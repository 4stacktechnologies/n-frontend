import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

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
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Products</h1>

        <a
          href="/dashboard/products/create"
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
        >
          <Plus size={18} />
          Add Product
        </a>
      </div>

      {/* CONTENT */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-800 text-slate-300">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Condition</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-slate-400">
                  Loading...
                </td>
              </tr>
            )}

            {!loading && products.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-slate-400">
                  No products found
                </td>
              </tr>
            )}

            {products.map((product) => (
              <tr key={product._id} className="border-t border-slate-800">
                <td className="p-3 text-white">{product.title}</td>
                <td className="p-3 text-slate-300">{product.category}</td>
                <td className="p-3 text-slate-300">
                  ₹{product.sellingPrice}
                </td>
                <td className="p-3 text-slate-300">{product.condition}</td>

                <td className="p-3 text-center flex justify-center gap-3">
                  <Link
                    to={`/dashboard/products/edit/${product._id}`}
                    className="text-blue-400 hover:text-blue-500 transition"
                    title="Edit Product"
                  >
                    <Pencil size={18} />
                  </Link>

                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="text-red-400 hover:text-red-500 transition"
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
    </div>
  );
}
