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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20 pb-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-purple-400 to-red-400 mb-4">
            Калькулятор DPS/Хил
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Рассчитайте урон и лечение за определенное время
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-lg shadow-red-900/30">
                <i className="fas fa-fire text-2xl text-white"></i>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center mb-8 font-orbitron text-red-400">Калькулятор DPS</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-3 font-medium">DPS (урон в секунду)</label>
                <input
                  type="number"
                  value={dpsInput}
                  onChange={(e) => setDpsInput(e.target.value)}
                  className="input-field"
                  placeholder="Введите DPS"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-3 font-medium">Время (сек)</label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="input-field"
                  placeholder="Введите время"
                />
              </div>

              <button
                onClick={calculateDps}
                className="btn-primary w-full py-4 text-lg font-bold"
              >
                <i className="fas fa-calculator mr-3"></i>
                Рассчитать урон
              </button>

              {result.totalDmg !== undefined && (
                <div className="mt-6 p-6 bg-gradient-to-r from-red-900/30 to-red-950/30 rounded-2xl border border-red-800/50">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Общий урон:</span>
                    <span className="text-2xl font-bold font-orbitron text-red-400">{result.totalDmg.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="card p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-800 rounded-full flex items-center justify-center shadow-lg shadow-green-900/30">
                <i className="fas fa-heart text-2xl text-white"></i>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center mb-8 font-orbitron text-green-400">Калькулятор Хил</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-3 font-medium">Хил в секунду</label>
                <input
                  type="number"
                  value={healInput}
                  onChange={(e) => setHealInput(e.target.value)}
                  className="input-field"
                  placeholder="Введите хил/сек"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-3 font-medium">Время (сек)</label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="input-field"
                  placeholder="Введите время"
                />
              </div>

              <button
                onClick={calculateHeal}
                className="btn-primary w-full py-4 text-lg font-bold"
              >
                <i className="fas fa-heartbeat mr-3"></i>
                Рассчитать лечение
              </button>

              {result.totalHeal !== undefined && (
                <div className="mt-6 p-6 bg-gradient-to-r from-green-900/30 to-green-950/30 rounded-2xl border border-green-800/50">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Общее лечение:</span>
                    <span className="text-2xl font-bold font-orbitron text-green-400">{result.totalHeal.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Используйте калькулятор для планирования боевых действий и оптимизации вашей тактики</p>
        </div>
      </div>
    </div>
  );
}
