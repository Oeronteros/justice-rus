'use client';

import { useState } from 'react';

export default function CalculatorPage() {
  const [dpsInput, setDpsInput] = useState('');
  const [duration, setDuration] = useState('');
  const [healInput, setHealInput] = useState('');
  const [result, setResult] = useState<{ totalDmg?: number; totalHeal?: number; }>({});

  const calculateDps = () => {
    const dps = parseFloat(dpsInput);
    const dur = parseFloat(duration);
    if (!isNaN(dps) && !isNaN(dur)) {
      setResult(prev => ({ ...prev, totalDmg: dps * dur }));
    }
  };

  const calculateHeal = () => {
    const heal = parseFloat(healInput);
    const dur = parseFloat(duration);
    if (!isNaN(heal) && !isNaN(dur)) {
      setResult(prev => ({ ...prev, totalHeal: heal * dur }));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Калькулятор DPS/Хил</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Калькулятор DPS</h2>

          <div className="mb-4">
            <label className="block mb-2">DPS:</label>
            <input
              type="number"
              value={dpsInput}
              onChange={(e) => setDpsInput(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Введите DPS"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Время (сек):</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Введите время"
            />
          </div>

          <button
            onClick={calculateDps}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Рассчитать урон
          </button>

          {result.totalDmg !== undefined && (
            <div className="mt-4 p-3 bg-blue-50 rounded">
              <p>Общий урон: <strong>{result.totalDmg.toFixed(2)}</strong></p>
            </div>
          )}
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Калькулятор Хил</h2>

          <div className="mb-4">
            <label className="block mb-2">Хил в секунду:</label>
            <input
              type="number"
              value={healInput}
              onChange={(e) => setHealInput(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Введите хил/сек"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Время (сек):</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Введите время"
            />
          </div>

          <button
            onClick={calculateHeal}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Рассчитать лечение
          </button>

          {result.totalHeal !== undefined && (
            <div className="mt-4 p-3 bg-green-50 rounded">
              <p>Общее лечение: <strong>{result.totalHeal.toFixed(2)}</strong></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
