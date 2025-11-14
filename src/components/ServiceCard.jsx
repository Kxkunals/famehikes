import React from "react";
import { FaBolt } from "react-icons/fa";

export default function ServiceCard({ icon, title, desc, accent = 'gold' }) {
  return (
    <div className="glass-card p-6 card-hover">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-lg flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600">
          {icon ? <img src={icon} alt="" className="w-8 h-8" /> : <FaBolt className="text-white" />}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-black">{title}</h3>
          <p className="muted text-sm mt-1">{desc}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm muted">From</div>
        <div className="text-lg font-semibold text-orange-500">₹99</div>
      </div>
    </div>
  );
}