"use client";

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCartStore } from '../../../../stores/useCartStore';
import { toast } from 'react-toastify';
import ShareModal from '@/components/ShareModal';

interface CarItemType {
  id: string;
  image: string
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;
    const xPercent = (mouseX / width) * 100;
    const yPercent = (mouseY / height) * 100;
    setPosition({ x: xPercent, y: yPercent });
  };

  const addToCart = useCartStore((state) => state.addToCart)

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
      {
        showShareModal && (
          <ShareModal setShowShareModal={setShowShareModal} />
        )
      }
      <div className="bg-gradient-to-br from-blue-100 via-white to-blue-50 p-20">
        <main>
          <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden mt-10">
            <div className="flex justify-end p-4">
              <button
                onClick={() => router.push('/')}
                className="underline text-blue-600 text-sm px-4 py-2 hover:bg-slate-200 rounded-md"
              >
                ← Back to Products
              </button>
            </div>
            <div className="flex flex-col md:flex-row gap-6 p-10">
              <div
                className="relative  overflow-hidden"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                style={{ cursor: isHovering ? 'crosshair' : 'default' }}
              >
                <canvas
                  ref={canvasRef}
                  className="rounded-xl shadow-md"
                  style={{
                    transformOrigin: `${position.x}% ${position.y}%`,
                    transform: isHovering ? 'scale(2)' : 'scale(1)',
                    transition: 'transform 0.3s ease-in-out',
                    display: 'block',
                    width: '100%',
                    height: '100%',
                  }}
                />
              </div>
              <div className="p-8 flex flex-col justify-center mx-auto">
                <h1 className="text-xl lg:text-3xl font-bold text-blue-700 mb-4">{data.model}</h1>
                <p className="text-gray-700 text-xs lg:text-lg mb-2">
                  <span className="font-semibold">cost:</span> ${data.price_usd.toLocaleString()}
                </p>
                <p className="text-gray-600 mb-6 font-semibold flex flex-col gap-1">
                  <span className="font-semibold"> inventory: {data.ratings.count}</span>
                  {
                    data.ratings.count == 0 ? <span className="text-base font-bold text-red-600">Out of Stock</span> :
                      <span className={`text-xs ${data.ratings.count < 5 ? 'text-red-600' : 'text-green-600'}`}>{data.ratings.count < 5 ? 'Limited number' : 'Available in stock'}</span>
                  }
                </p>
                <button
                  disabled={data.ratings.count === 0}
                  className={`w-full lg:w-fit text-sm md:text-lg px-6 py-2 rounded-xl transition-all duration-300 text-nowrap cursor-pointer
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
                <div className="mt-6">
                  <h2 className="font-bold text-lg mb-2">Specifications</h2>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>Horsepower: {data.specifications.horsepower} HP</li>
                    <li>0-100 km/h: {data.specifications.acceleration_0_100_kmh}s</li>
                    <li>Fuel Efficiency: {data.specifications.fuel_efficiency_l_per_100km} L/100km</li>
                    <li>Dimensions (L×W×H): {data.specifications.dimensions_mm.length} × {data.specifications.dimensions_mm.width} × {data.specifications.dimensions_mm.height} mm</li>
                    <li>Weight: {data.specifications.weight_kg} kg</li>
                    <li>Cylinders: {data.specifications.cylinders}</li>
                  </ul>
                </div>
                <div className="mt-4">
                  <h2 className="font-bold text-lg mb-2">Features</h2>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {data.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <p
              className='text-xl font-bold p-2 ml-4 underline text-sky-500 !cursor-pointer'
              onClick={() => setShowShareModal(true)}
            >
              Do you want to share this product?
            </p>
          </div>
        </main>
        <div className="max-w-7xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">User Reviews & Ratings</h2>

          <div className="flex items-center gap-2 mb-6">
            <p className="text-lg font-semibold">Average Rating:</p>
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={`text-xl ${i < Math.round(data.ratings.average) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
              ))}
            </div>
            <span className="ml-2 text-gray-600 text-sm">({data.ratings.count} reviews)</span>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("✅ Your review has been submitted (not really saved)");
              //fixme
            }}
            className="space-y-4"
          >
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 text-sm"
              placeholder="Write your review here..."
              required
            />
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Your Rating:</label>
              <select
                className="border border-gray-300 rounded-md p-1 text-sm"
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
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
            >
              Submit Review
            </button>
          </form>

          <div className="mt-8 space-y-4">
            <div className="border rounded-lg p-3 bg-slate-50">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-sm">Ali Rezaei</p>
                <div className="text-yellow-400 text-sm">★★★★☆</div>
              </div>
              <p className="text-gray-600 text-sm">Very smooth ride. Fuel efficiency is excellent!</p>
            </div>

            <div className="border rounded-lg p-3 bg-slate-50">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-sm">Sara M.</p>
                <div className="text-yellow-400 text-sm">★★★★★</div>
              </div>
              <p className="text-gray-600 text-sm">I love the design and performance!</p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default ProductDetail;