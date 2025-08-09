"use client";

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCartStore } from '../../../../stores/useCartStore';
import { toast } from 'react-toastify';
import ShareModal from '@/components/ShareModal';
import NextImage from 'next/image';

interface CarItemType {
  id: string;
  image: string;
  amount: number;
  price_usd: number;
  model: string;
  brand: string;
  year: number;
  country: string;
  body_type: string;
  engine: string;
  fuel_type: string;
  transmission: string;
  stock: number;
  ratings: {
    average: number;
    count: number;
  };
  specifications: {
    horsepower: number;
    acceleration_0_100_kmh: number;
    fuel_efficiency_l_per_100km: number;
    dimensions_mm: {
      length: number;
      width: number;
      height: number;
    };
    weight_kg: number;
    cylinders: number;
  };
  features: string[];
  available_colors: string[];
  description: string;
  created_at: string;
}

function ProductDetail() {
  const [selectedColor, setSelectedColor] = useState<string>('#fff');
  const [data, setData] = useState<CarItemType | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const params = useParams();
  const id = params?.id as string;
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const colors = data?.available_colors || [];
  const router = useRouter();
  const [showShareModal, setShowShareModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;
    const xPercent = (mouseX / width) * 100;
    const yPercent = (mouseY / height) * 100;
    setPosition({ x: xPercent, y: yPercent });
  };

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    fetch('/data/data.json')
      .then((res) => {
        if (!res.ok) throw new Error('فایل پیدا نشد یا خطای سرور');
        return res.json();
      })
      .then((json: CarItemType[]) => {
        const selected = json.find(item => item.id === id);
        setData(selected || null);
      })
      .catch((err) => console.error('خطا در دریافت JSON:', err));
  }, [id]);

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (
      "Notification" in window &&
      Notification.permission === "granted" &&
      showNotification &&
      data?.amount && data?.amount > 0
    ) {
      new Notification("✅ Product is back in stock!", {
        body: `${data.brand} ${data.model} is now available.`,
        icon: "/car-icon.png",
      });
      setShowNotification(false);
    }
  }, [data?.amount, showNotification]);

  useEffect(() => {
    if (!data || !selectedColor) return;

    const image = new Image();
    image.src = data.image;
    image.crossOrigin = "anonymous";
    image.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      canvas.width = image.width;
      canvas.height = image.height;

      ctx.drawImage(image, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const dataPixels = imageData.data;

      const targetColor = hexToRGB(selectedColor);

      for (let i = 0; i < dataPixels.length; i += 4) {
        const r = dataPixels[i];
        const g = dataPixels[i + 1];
        const b = dataPixels[i + 2];
        const alpha = dataPixels[i + 3];
        if (r > 150 && g > 150 && b > 150 && alpha > 100) {
          dataPixels[i] = targetColor.r;
          dataPixels[i + 1] = targetColor.g;
          dataPixels[i + 2] = targetColor.b;
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };
  }, [data, selectedColor]);

  function hexToRGB(hex: string) {
    const bigint = parseInt(hex.replace("#", ""), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  }

  if (!data) return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  return (
    <>
      {showShareModal && <ShareModal setShowShareModal={setShowShareModal} />}
      <div className="bg-gradient-to-br from-blue-100 via-white to-blue-50 p-4 md:p-10 lg:p-20">
        <div className="max-w-[1300px] mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden mt-5 md:mt-10">
          {/* back button */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => router.push('/')}
              className="underline text-blue-600 text-xs md:text-sm px-3 py-1 md:px-4 md:py-2 hover:bg-slate-200 rounded-md"
            >
              ← Back to Products
            </button>
          </div>

          {/* main section */}
          <div className="flex flex-col lg:flex-row gap-6 py-6 md:py-10">
            {/* image & canvas */}
            <div
              className="relative overflow-hidden w-full max-w-[350px] sm:max-w-[400px] lg:max-w-[700px] xl:max-w-[800px] mx-auto my-auto"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              style={{ cursor: isHovering ? 'crosshair' : 'default' }}
            >
              <canvas
                ref={canvasRef}
                className="rounded-xl"
                style={{
                  transformOrigin: `${position.x}% ${position.y}%`,
                  transform: isHovering ? 'scale(2)' : 'scale(1)',
                  transition: 'transform 0.3s ease-in-out',
                  display: 'block',
                  width: '100%',
                  height: 'auto',
                }}
              />
            </div>


            {/* details */}
            <div className="p-4 md:p-8 flex flex-col justify-center mx-auto w-full max-w-lg">
              <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-blue-700 mb-4">{data.model}</h1>
              <div className="text-gray-700 text-xs md:text-lg mb-2">
                <span className="font-semibold">Cost:</span> ${data.price_usd.toLocaleString()}
              </div>
              <div className="text-gray-600 mb-6 font-semibold flex flex-col gap-1">
                <span className="font-semibold">Inventory: {data.ratings.count}</span>
                {data.ratings.count == 0 ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm md:text-base font-bold text-red-600">Out of Stock</span>
                    <NextImage
                      src={showNotification ? '/notification2.png' : "/notification1.png"}
                      alt="notification"
                      width={25}
                      height={25}
                      className="cursor-pointer"
                      onClick={() => setShowNotification(!showNotification)}
                      title={!showNotification ? "Click to be notified when this product is back in stock." : ""}
                    />
                  </div>
                ) : (
                  <span className={`text-xs ${data.ratings.count < 5 ? 'text-red-600' : 'text-green-600'}`}>
                    {data.ratings.count < 5 ? 'Limited number' : 'Available in stock'}
                  </span>
                )}
              </div>

              {/* add to cart */}
              <button
                disabled={data.ratings.count === 0}
                className={`w-full lg:w-fit text-xs md:text-lg px-4 md:px-6 py-2 rounded-xl transition-all duration-300 text-nowrap cursor-pointer
                ${data.ratings.count === 0
                    ? 'bg-gray-400 text-white !cursor-not-allowed'
                    : 'bg-blue-700 text-white hover:bg-blue-800'}`}
                onClick={() => {
                  addToCart(data);
                  toast.success('The product has been added to your cart.');
                }}
              >
                Add to cart
              </button>

              {/* color selection */}
              <div className="flex space-x-2 mt-4">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className="w-6 h-6 rounded-full border-2"
                    style={{
                      backgroundColor: color,
                      borderColor: '#ccc',
                    }}
                  />
                ))}
              </div>

              {/* specifications */}
              <div className="mt-6">
                <h2 className="font-bold text-base md:text-lg mb-2">Specifications</h2>
                <ul className="text-xs md:text-sm text-gray-700 space-y-1">
                  <li>Horsepower: {data.specifications.horsepower} HP</li>
                  <li>0-100 km/h: {data.specifications.acceleration_0_100_kmh}s</li>
                  <li>Fuel Efficiency: {data.specifications.fuel_efficiency_l_per_100km} L/100km</li>
                  <li>Dimensions (L×W×H): {data.specifications.dimensions_mm.length} × {data.specifications.dimensions_mm.width} × {data.specifications.dimensions_mm.height} mm</li>
                  <li>Weight: {data.specifications.weight_kg} kg</li>
                  <li>Cylinders: {data.specifications.cylinders}</li>
                </ul>
              </div>

              {/* features */}
              <div className="mt-4">
                <h2 className="font-bold text-base md:text-lg mb-2">Features</h2>
                <ul className="list-disc list-inside text-xs md:text-sm text-gray-700">
                  {data.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* share */}
          <p
            className="text-sm md:text-xl font-bold p-2 ml-4 underline text-sky-500 cursor-pointer"
            onClick={() => setShowShareModal(true)}
          >
            Do you want to share this product?
          </p>
        </div>

        {/* reviews */}
        <div className="max-w-7xl mx-auto mt-6 md:mt-10 bg-white p-4 md:p-6 rounded-2xl shadow-md">
          <h2 className="text-lg md:text-2xl font-bold mb-4 text-blue-700">User Reviews & Ratings</h2>

          <div className="flex flex-wrap items-center gap-2 mb-6">
            <p className="text-sm md:text-lg font-semibold">Average Rating:</p>
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={`text-base md:text-xl ${i < Math.round(data.ratings.average) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
              ))}
            </div>
            <span className="text-gray-600 text-xs md:text-sm">({data.ratings.count} reviews)</span>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("✅ Your review has been submitted (not really saved)");
            }}
            className="space-y-4"
          >
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 text-xs md:text-sm"
              placeholder="Write your review here..."
              required
            />
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <label className="text-xs md:text-sm font-medium">Your Rating:</label>
              <select
                className="border border-gray-300 rounded-md p-1 text-xs md:text-sm"
                required
              >
                <option value="">Select</option>
                {[5, 4, 3, 2, 1].map((item) => (
                  <option key={item} value={item}>{item} - {item === 1 ? 'Very Bad' : item === 5 ? 'Excellent' : ''}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-xs md:text-sm"
            >
              Submit Review
            </button>
          </form>

          {/* existing reviews */}
          <div className="mt-6 md:mt-8 space-y-4">
            <div className="border rounded-lg p-3 bg-slate-50">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-xs md:text-sm">Ali Rezaei</p>
                <div className="text-yellow-400 text-xs md:text-sm">★★★★☆</div>
              </div>
              <p className="text-gray-600 text-xs md:text-sm">Very smooth ride. Fuel efficiency is excellent!</p>
            </div>

            <div className="border rounded-lg p-3 bg-slate-50">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-xs md:text-sm">Sara M.</p>
                <div className="text-yellow-400 text-xs md:text-sm">★★★★★</div>
              </div>
              <p className="text-gray-600 text-xs md:text-sm">I love the design and performance!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
