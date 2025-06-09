"use client";

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { useCartStore } from '../../../../stores/useCartStore';
import { toast } from 'react-toastify';

interface CarItemType {
  id: string;
  image: string
  amount: number;
  price_usd: number;
  model: string;
}

function ProductDetail() {
  const colors = ['#ff0000', '#fff', '#0000ff', '#000000', '#f5a623'];
  const [selectedColor, setSelectedColor] = useState<string>('#fff');
  const [data, setData] = useState<CarItemType | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const params = useParams();
  const id = params?.id as string;

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
        if (r > 200 && g > 200 && b > 200 && alpha > 100) {
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

  if (!data) return <p className="text-center text-gray-500 mt-10">در حال بارگذاری...</p>;

  return (
    <main className="bg-gradient-to-br from-blue-100 via-white to-blue-50 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden mt-20">
        <div className="flex flex-col md:flex-row gap-6 p-10">
          <div className="">
            <canvas
              ref={canvasRef}
              className="rounded-xl shadow-md w-full max-w-xs md:max-w-md h-auto"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div className="p-8 flex flex-col justify-center mx-auto">
            <h1 className="text-xl lg:text-3xl font-bold text-blue-700 mb-4">{data.model}</h1>
            <p className="text-gray-700 text-xs lg:text-lg mb-2">
              <span className="font-semibold">cost:</span> ${data.price_usd.toLocaleString()}
            </p>
            <p className="text-gray-600 mb-6">
              <span className="font-semibold">inventory:</span> {data.amount}
            </p>
            <button
              className="w-full lg:w-fit bg-blue-700 text-sm md:text-lg text-white px-6 py-2 rounded-xl hover:bg-blue-800 transition-all duration-300 text-nowrap"
              onClick={() => {
                addToCart(data)
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
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetail;