import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  /* ================= SLIDESHOW ================= */
  const slides = [
    {
      img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1600&q=80",
      title: "Powerful Laptops",
      subtitle: "Work • Gaming • Study",
    },
    {
      img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1600&q=80",
      title: "Latest Smartphones",
      subtitle: "Best Prices Guaranteed",
    },
    {
      img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1600&q=80",
      title: "Smart Accessories",
      subtitle: "Upgrade Your Setup",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % slides.length),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  /* ================= DATA ================= */
  const categories = [
    {
      name: "Mobiles",
      img: "https://cdn-icons-png.flaticon.com/512/1067/1067256.png",
      path: "/products?category=mobiles",
    },
    {
      name: "Laptops",
      img: "https://cdn-icons-png.flaticon.com/512/3474/3474362.png",
      path: "/products?category=laptops",
    },
    {
      name: "Accessories",
      img: "https://cdn-icons-png.flaticon.com/512/3659/3659899.png",
      path: "/products?category=accessories",
    },
  ];

  const Section = ({ title, items }) => (
    <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/10">
      <h2 className="text-2xl font-semibold text-white mb-5">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/product/${item.id}`)}
            className="cursor-pointer bg-[#0f2027] rounded-2xl p-4 hover:scale-105 transition border border-white/10"
          >
            <div className="h-36 bg-black/30 rounded-xl flex items-center justify-center mb-3">
              <img src={item.img} className="h-full object-contain" />
            </div>
            <p className="font-medium text-white truncate">{item.name}</p>
            <p className="text-cyan-400 font-semibold">{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">

      {/* CATEGORY BAR */}
      <div className="bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-around py-4">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => navigate(cat.path)}
              className="text-center cursor-pointer text-white hover:text-cyan-400 transition"
            >
              <img src={cat.img} className="h-12 mx-auto mb-1 opacity-90" />
              <p className="font-medium">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SLIDESHOW */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
          <img
            src={slides[current].img}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-10">
            <h2 className="text-4xl font-semibold text-white">
              {slides[current].title}
            </h2>
            <p className="text-gray-200 mt-2 text-lg">
              {slides[current].subtitle}
            </p>
          </div>

          {/* ARROWS */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-cyan-500 transition"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-cyan-500 transition"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* SECTIONS */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <Section title="Laptops" items={[]} />
        <Section title="Mobiles" items={[]} />
        <Section title="Accessories" items={[]} />
      </div>
    </div>
  );
}
