"use client";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import AutoCard from "@/components/AutoCard";
import { useEffect, useState } from "react";

interface CarItemType {
  id: string;
  image: string;
  amount: number;
  price_usd: number;
  model: string;
}

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('/data/data.json')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error('خطا در خواندن JSON:', err));
  }, []);

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore out cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar />
        </div>
        <div className="mt-6 gap-4 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {
            data.map((car: CarItemType) => (
              <AutoCard
                title={car.model}
                key={car.id}
                imgUrl={car.image}
                amount={car.price_usd}
              />
            ))
          }
          {/* <AutoCard
          imgUrl= {"/hero.png" }
          title="Toyota"
          amount={100}
        /> */}
        </div>
      </div>
    </main>
  );
}
