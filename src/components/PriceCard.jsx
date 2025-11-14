import React from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function PriceCard({ title, price, bullets = [], featured }) {
  return (
    <div className={`p-6 rounded-xl glass-card ${featured ? 'border-2 border-orange-500' : ''} card-hover`}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-black">{title}</h3>
        {featured && <span className="text-xs px-2 py-1 rounded bg-orange-600 text-white">Popular</span>}
      </div>
      <div className="mt-4">
        <div className="text-4xl font-bold text-orange-500">{price}</div>
        <ul className="mt-4 space-y-2 muted">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2">
              <FaCheckCircle className="text-orange-500 mt-1" />
              <span className="text-black">{b}</span>
            </li>
          ))}
        </ul>

      </div>
      <button className="mt-6 w-full py-3 rounded-full gold-btn font-semibold">Buy Now</button>
    </div>
  )
}
