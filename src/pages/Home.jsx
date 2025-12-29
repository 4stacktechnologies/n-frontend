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

  const topDeals = [
    {
      id: 1,
      name: "Gaming Laptop",
      price: "₹65,999",
      img: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "5G Smartphone",
      price: "₹18,999",
      img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "Smart Watch",
      price: "₹1,999",
      img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      name: "Headphones",
      price: "₹1,499",
      img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const laptops = [
    {
      id: 5,
      name: "HP Pavilion",
      price: "₹54,999",
      img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 6,
      name: "Dell Inspiron",
      price: "₹59,999",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 7,
      name: "Asus VivoBook",
      price: "₹52,999",
      img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 8,
      name: "Lenovo IdeaPad",
      price: "₹49,999",
      img: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const mobiles = [
    {
      id: 9,
      name: "Samsung Galaxy",
      price: "₹22,999",
      img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 10,
      name: "iPhone",
      price: "₹69,999",
      img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 11,
      name: "Redmi Note",
      price: "₹14,999",
      img: "https://images.unsplash.com/photo-1580910051074-7f1a1f7f63c7?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 12,
      name: "Realme",
      price: "₹12,999",
      img: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const accessories = [
    {
      id: 13,
      name: "Wireless Headphones",
      price: "₹2,499",
      img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 14,
      name: "Smart Watch",
      price: "₹1,999",
      img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 15,
      name: "Power Bank",
      price: "₹1,099",
      img: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 16,
      name: "Keyboard & Mouse",
      price: "₹1,299",
      img: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const Section = ({ title, items }) => (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-5">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/product/${item.id}`)}
            className="cursor-pointer bg-white rounded-2xl p-4 hover:scale-105 transition"
          >
            <div className="h-36 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
              <img src={item.img} className="h-full object-contain" />
            </div>
            <p className="font-semibold truncate">{item.name}</p>
            <p className="text-indigo-600 font-bold">{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">

      {/* CATEGORY BAR */}
      <div className="bg-white/10 backdrop-blur-xl shadow">
        <div className="max-w-7xl mx-auto flex justify-around py-4">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => navigate(cat.path)}
              className="text-center cursor-pointer text-white hover:scale-110 transition"
            >
              <img src={cat.img} className="h-12 mx-auto mb-1" />
              <p className="font-semibold">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SLIDESHOW */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={slides[current].img}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-10">
            <h2 className="text-4xl font-bold text-white">
              {slides[current].title}
            </h2>
            <p className="text-white mt-2 text-lg">
              {slides[current].subtitle}
            </p>
          </div>

          {/* ARROWS */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* TOP DEALS */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4">Top Deals</h2>
          <div className="flex gap-5 overflow-x-auto pb-2">
            {topDeals.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/product/${item.id}`)}
                className="min-w-[220px] bg-white rounded-2xl p-4 hover:scale-105 transition"
              >
                <div className="h-32 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
                  <img src={item.img} className="h-full object-contain" />
                </div>
                <p className="font-semibold truncate">{item.name}</p>
                <p className="text-indigo-600 font-bold">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTIONS */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <Section title="Laptops" items={laptops} />
        <Section title="Mobiles" items={mobiles} />
        <Section title="Accessories" items={accessories} />
      </div>
    </div>
  );
}