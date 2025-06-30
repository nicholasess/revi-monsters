import { monsterForm } from "@/pages/main/schema";
import React from "react";

const Monster: React.FC<monsterForm> = ({ name, image, health, attack, defense, speed }) => {
  return (
    <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl shadow-2xl p-6 max-w-sm mx-auto transform hover:scale-105 transition-all duration-300 border border-purple-500/30">
      <div className="relative mb-4">
        <div className="w-full h-48 rounded-xl overflow-hidden bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-4 py-1 rounded-full font-bold text-sm shadow-lg">
          {name}
        </div>
      </div>

      <div className="mb-4 mt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white font-semibold text-sm">HP</span>
          <span className="text-white font-semibold text-sm">
            {health}/{100}
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 shadow-inner">
          <div
            className="bg-gradient-to-r from-red-500 to-green-500 h-3 rounded-full transition-all duration-500 shadow-lg"
            style={{
              width: `${health}%`,
              background:
                health > 60
                  ? "linear-gradient(to right, #10b981, #22c55e)"
                  : health > 30
                    ? "linear-gradient(to right, #f59e0b, #eab308)"
                    : "linear-gradient(to right, #ef4444, #dc2626)",
            }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-center">
          <div className="text-red-400 font-bold text-lg">{attack}</div>
          <div className="text-red-300 text-xs font-semibold">ATK</div>
        </div>
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3 text-center">
          <div className="text-blue-400 font-bold text-lg">{defense}</div>
          <div className="text-blue-300 text-xs font-semibold">DEF</div>
        </div>
        <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 text-center">
          <div className="text-green-400 font-bold text-lg">{speed}</div>
          <div className="text-green-300 text-xs font-semibold">SPD</div>
        </div>
      </div>
    </div>
  );
};

export default Monster;
