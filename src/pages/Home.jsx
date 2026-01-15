import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();

  /* ================= HERO SLIDES ================= */
  const slides = [
    {
      img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1600&q=80",
      title: "Next-Gen Laptops",
      subtitle: "Power • Performance • Precision",
    },
    {
      img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1600&q=80",
      title: "Flagship Smartphones",
      subtitle: "Premium Tech • Best Prices",
    },
    {
      img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1600&q=80",
      title: "Smart Accessories",
      subtitle: "Enhance Your Setup",
    },
  ];

  const [current, setCurrent] = useState(0);

  /* ================= PRODUCT STATE ================= */
  const [laptops, setLaptops] = useState([]);
  const [mobiles, setMobiles] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= HERO SLIDER ================= */
  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((p) => (p + 1) % slides.length),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  /* ================= BACKEND FETCH ================= */
  const getProducts = async (category, count) => {
    try {
      const res = await axios.get(import.meta.env.VITE_API_PRODUCT, {
        params: { category, count, segment: "random" },
      });

      return res.data.data.map((p) => ({
        id: p._id,
        name: p.title,
        price: `₹${p.sellingPrice}`,
        img:
          p.images?.[0] ||
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      }));
    } catch {
      return [];
    }
  };

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setLaptops(await getProducts("Laptop", 4));
      setMobiles(await getProducts("Mobile", 4));
      setLoading(false);
    };
    fetchData();
  }, []);

  /* ================= PRODUCT SECTION ================= */
  const Section = ({ title, items }) => (
    <section className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-3xl font-semibold text-gray-900">
        {title}
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/products/${item.id}`)}
              className="
                cursor-pointer
                rounded-lg sm:rounded-2xl
                border bg-white
                transition-all duration-300
                hover:shadow-xl hover:-translate-y-1
              "
            >
              <div className="h-28 sm:h-48 bg-gray-50 rounded-t-lg sm:rounded-t-2xl flex items-center justify-center">
                <img
                  src={item.img.url || item.img}
                  alt={item.name}
                  className="h-full object-contain"
                />
              </div>

              <div className="p-2 sm:p-5 space-y-1 sm:space-y-2">
                <p className="text-xs sm:text-base font-medium text-gray-900 line-clamp-2">
                  {item.name}
                </p>
                <p className="text-sm sm:text-base text-gray-700 font-semibold">
                  {item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 items-center">
        {/* HERO TEXT */}
        <div className="order-2 md:order-1 space-y-4 sm:space-y-6">
          <span className="text-xs sm:text-sm uppercase tracking-wide text-gray-500">
            Premium Tech Store
          </span>

          <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
            Find Your Perfect Product
          </h1>

          <p className="text-sm sm:text-base text-gray-600 max-w-lg">
            Carefully curated laptops, mobiles, and accessories built for
            professionals, creators, and gamers.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={() => navigate("/products")}
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition"
            >
              Explore Products →
            </button>

            <button
              onClick={() => navigate("/contact")}
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-gray-300 hover:bg-gray-100 transition"
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div className="order-1 md:order-2 relative mb-6 md:mb-0">
          <div className="rounded-2xl sm:rounded-3xl bg-white shadow-2xl p-2 sm:p-4">
            <img
              src={slides[current].img}
              alt=""
              className="rounded-xl sm:rounded-2xl object-cover h-56 sm:h-[22rem] w-full"
            />
          </div>

          <button
            onClick={() => setCurrent((p) => (p === 0 ? slides.length - 1 : p - 1))}
            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-white shadow p-1.5 sm:p-2 rounded-full"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={() => setCurrent((p) => (p + 1) % slides.length)}
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-white shadow p-1.5 sm:p-2 rounded-full"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-12 sm:space-y-20">
        <Section title="Laptops" items={laptops} />
        <Section title="Mobiles" items={mobiles} />
      </div>
    </div>
  );
}
