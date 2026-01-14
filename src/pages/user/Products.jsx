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
    <div className="relative min-h-screen p-6 text-gray-900 overflow-hidden bg-gray-50">

      {/* Optional subtle pastel background blobs */}
      <div className="absolute -top-40 -left-20 w-[400px] h-[400px] bg-gray-200/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-gray-200/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Row */}
      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4 z-10">
        <h1 className="text-3xl font-bold tracking-wide text-gray-900">
          Products
        </h1>

        <Link
          to="/dashboard/products/create"
          className="flex items-center gap-2 bg-gradient-to-r from-gray-200/80 to-gray-300/80
            hover:from-gray-200 hover:to-gray-300
            text-gray-900 font-semibold rounded-xl px-5 py-2.5
            transition shadow-sm hover:shadow-md"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      {/* SEARCH BAR */}
      <div className="relative mb-4 max-w-sm">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-300
            text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-700
            focus:ring-2 focus:ring-gray-200 transition"
        />
      </div>

      {/* TABLE */}
      <div className="relative overflow-x-auto bg-white border border-gray-200 rounded-2xl shadow-sm">

        <table className="w-full text-sm whitespace-nowrap">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
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
                <td colSpan="11" className="p-6 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            )}

            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan="11" className="p-6 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            )}

            {filtered.map((product) => (
              <tr key={product._id} className="border-t border-gray-200 hover:bg-gray-50 transition">
                <Td className="font-semibold text-gray-900">{product.title}</Td>
                <Td>{product.brand || "-"}</Td>
                <Td>{product.model || "-"}</Td>
                <Td>{product.category}</Td>
                <Td className="text-gray-900 font-semibold">₹{product.sellingPrice}</Td>
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
                    className="text-cyan-600 hover:text-cyan-500 hover:scale-110 transition"
                  >
                    <Pencil size={18} />
                  </Link>

                  <button
                    onClick={() => {
                      setSelectedProductId(product._id);
                      setIsViewOpen(true);
                    }}
                    className="text-green-600 hover:text-green-500 hover:scale-110 transition"
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="text-red-600 hover:text-red-500 hover:scale-110 transition"
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
  <td className={`p-3 text-gray-700 ${className || ""}`}>{children}</td>
);

function Badge({ type, text }) {
  const colors = {
    green: "bg-green-100 text-green-700 shadow-sm",
    red: "bg-red-100 text-red-700 shadow-sm",
    yellow: "bg-yellow-100 text-yellow-700 shadow-sm",
    cyan: "bg-cyan-100 text-cyan-700 shadow-sm",
    gray: "bg-gray-100 text-gray-500",
  };
  return <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[type]}`}>{text}</span>;
}
