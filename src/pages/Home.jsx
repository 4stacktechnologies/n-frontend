import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Laptop, Smartphone, Headphones } from "lucide-react";

/* ================= DEMO PRODUCTS ================= */
const DEMO_PRODUCTS = [
  // Laptops
  { id: "l1", name: "ASUS ROG Strix G15", price: "₹1,29,999", category: "laptops", img: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80" },
  { id: "l2", name: "MacBook Pro M2", price: "₹1,59,999", category: "laptops", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" },
  { id: "l3", name: "Dell XPS 15", price: "₹1,49,999", category: "laptops", img: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=600&q=80" },

  // Mobiles
  { id: "m1", name: "iPhone 15 Pro", price: "₹1,34,999", category: "mobiles", img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80" },
  { id: "m2", name: "Samsung Galaxy S24", price: "₹89,999", category: "mobiles", img: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=600&q=80" },
  { id: "m3", name: "Google Pixel 8", price: "₹79,999", category: "mobiles", img: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=600&q=80" },

  // Accessories
  { id: "a1", name: "Sony WH-1000XM5", price: "₹29,999", category: "accessories", img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80" },
  { id: "a2", name: "Mechanical RGB Keyboard", price: "₹6,499", category: "accessories", img: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=600&q=80" },
  { id: "a3", name: "Gaming Mouse", price: "₹3,999", category: "accessories", img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80" },
];

export default function Home() {
  const navigate = useNavigate();

  /* ================= HERO SLIDES ================= */
  const slides = [
    { img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1600&q=80", title: "Next-Gen Laptops", subtitle: "Power • Performance • Precision" },
    { img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1600&q=80", title: "Flagship Smartphones", subtitle: "Premium Tech • Best Prices" },
    { img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1600&q=80", title: "Smart Accessories", subtitle: "Enhance Your Setup" },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 4000);
    return () => clearInterval(interval);
  }, []);

  const getProducts = (category) => DEMO_PRODUCTS.filter((p) => p.category === category);

  /* ================= PRODUCT SECTION ================= */
  const Section = ({ title, items }) => (
    <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl p-6 border border-white/10">
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/product/${item.id}`)}
            className="
              cursor-pointer group
              bg-[#0f0f23]/70 backdrop-blur-xl
              rounded-2xl p-4
              border border-white/10
              transition-all duration-300
              hover:scale-[1.05]
              hover:border-pink-400/60
              hover:shadow-[0_0_30px_rgba(236,72,153,0.25)]
            "
          >
            <div className="h-44 bg-black/40 rounded-xl flex items-center justify-center mb-4">
              <img src={item.img} alt={item.name} className="h-full object-contain" />
            </div>

            <p className="font-medium text-white truncate">{item.name}</p>
            <p className="text-pink-400 font-semibold">{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#070712] via-[#0b0b1a] to-[#02020a] text-white relative overflow-hidden">

      {/* Glow Blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-500/20 blur-[120px]" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/20 blur-[140px]" />

      {/* CATEGORY BAR */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex gap-8 text-sm font-medium">
          <span className="flex items-center gap-2 hover:text-pink-400 cursor-pointer"><Laptop size={18} /> Laptops</span>
          <span className="flex items-center gap-2 hover:text-pink-400 cursor-pointer"><Smartphone size={18} /> Mobiles</span>
          <span className="flex items-center gap-2 hover:text-pink-400 cursor-pointer"><Headphones size={18} /> Accessories</span>
        </div>
      </div>

      {/* HERO */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="relative h-[28rem] rounded-3xl overflow-hidden border border-white/10">
          <img src={slides[current].img} className="w-full h-full object-cover" alt="" />

          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent flex flex-col justify-center px-10">
            <h2 className="text-5xl font-extrabold">{slides[current].title}</h2>
            <p className="text-gray-400 mt-3 text-lg">{slides[current].subtitle}</p>

            <button className="
              mt-8 w-fit px-10 py-3 rounded-full
              bg-pink-500 text-black font-semibold
              hover:bg-pink-400
              hover:shadow-[0_0_25px_rgba(236,72,153,0.6)]
              transition
            ">
              Explore Now
            </button>
          </div>

          <button onClick={() => setCurrent((p) => (p === 0 ? slides.length - 1 : p - 1))}
            className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/60 p-3 rounded-full hover:bg-pink-500 hover:text-black">
            <ChevronLeft />
          </button>

          <button onClick={() => setCurrent((p) => (p + 1) % slides.length)}
            className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/60 p-3 rounded-full hover:bg-pink-500 hover:text-black">
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* PRODUCT SECTIONS */}
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-14">
        <Section title="Laptops" items={getProducts("laptops")} />
        <Section title="Mobiles" items={getProducts("mobiles")} />
        <Section title="Accessories" items={getProducts("accessories")} />
      </div>
    </div>
  );
}
