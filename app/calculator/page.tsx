'use client';

import { useMemo, useState } from 'react';

type BuildInput = {
  name: string;
  baseDamage: string;
  flatDamage: string;
  attacksPerSecond: string;
  critChance: string;
  critMultiplier: string;
  bonusDamage: string;
  duration: string;
};

type BuildResult = {
  avgHit: number;
  dps: number;
  totalDamage: number;
};

const createBuild = (name: string): BuildInput => ({
  name,
  baseDamage: '',
  flatDamage: '',
  attacksPerSecond: '',
  critChance: '',
  critMultiplier: '2',
  bonusDamage: '',
  duration: '',
});

const parseNum = (value: string, fallback = 0) => {
  const num = parseFloat(value.replace(',', '.'));
  return Number.isFinite(num) ? num : fallback;
};

export default function CalculatorPage() {
  const [builds, setBuilds] = useState<BuildInput[]>([
    createBuild('Build A'),
    createBuild('Build B'),
  ]);

  const updateBuild = (index: number, key: keyof BuildInput, value: string) => {
    setBuilds(prev => prev.map((build, i) => (i == index ? { ...build, [key]: value } : build)));
  };

  const addBuild = () => {
    setBuilds(prev => {
      if (prev.length >= 4) return prev;
      return [...prev, createBuild(`Build ${String.fromCharCode(65 + prev.length)}`)];
    });
  };

  const removeBuild = (index: number) => {
    setBuilds(prev => prev.filter((_, i) => i != index));
  };

  const results = useMemo(() => {
    return builds.map(build => {
      const baseDamage = parseNum(build.baseDamage);
      const flatDamage = parseNum(build.flatDamage);
      const attacksPerSecond = parseNum(build.attacksPerSecond);
      const critChance = parseNum(build.critChance) / 100;
      const critMultiplier = parseNum(build.critMultiplier, 1);
      const bonusDamage = parseNum(build.bonusDamage) / 100;
      const duration = parseNum(build.duration);

      const baseHit = baseDamage + flatDamage;
      const critFactor = 1 + Math.max(0, Math.min(1, critChance)) * Math.max(0, critMultiplier - 1);
      const bonusFactor = 1 + bonusDamage;

      const avgHit = baseHit * bonusFactor * critFactor;
      const dps = avgHit * Math.max(0, attacksPerSecond);
      const totalDamage = dps * Math.max(0, duration);

      return { avgHit, dps, totalDamage } satisfies BuildResult;
    });
  }, [builds]);

  return (
    <div className="min-h-screen bg-[#0b0a08] pt-20 pb-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold font-orbitron text-[#e8ddc8] mb-4">
            ??????????? ?????? (DPS ? ????)
          </h1>
          <p className="text-[#c9b59a] text-lg max-w-2xl mx-auto">
            ??????????? ?????? ?? ???????? ????? ?? ????, DPS ? ?????? ????? ?? ????? ???.
          </p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-400 text-sm">?? 4 ?????? ??? ?????????.</div>
          <button
            onClick={addBuild}
            className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            <i className="fas fa-plus mr-2"></i>
            ???????? ????
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {builds.map((build, index) => (
            <div key={`${build.name}-${index}`} className="card p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#8b4a2f] to-[#c88b5e] rounded-full flex items-center justify-center shadow-lg shadow-[#3b1f14]/40">
                    <i className="fas fa-sword text-white"></i>
                  </div>
                  <input
                    value={build.name}
                    onChange={(e) => updateBuild(index, 'name', e.target.value)}
                    className="bg-transparent text-2xl font-bold font-orbitron text-[#c88b5e] focus:outline-none"
                  />
                </div>
                {builds.length > 1 && (
                  <button
                    onClick={() => removeBuild(index)}
                    className="text-gray-400 hover:text-[#c88b5e] transition"
                    title="??????? ????"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[#e3d6c2] mb-2 text-sm">??????? ????</label>
                  <input
                    type="number"
                    value={build.baseDamage}
                    onChange={(e) => updateBuild(index, 'baseDamage', e.target.value)}
                    className="input-field"
                    placeholder="????. 1200"
                  />
                </div>

                <div>
                  <label className="block text-[#e3d6c2] mb-2 text-sm">??????? ????? ?????</label>
                  <input
                    type="number"
                    value={build.flatDamage}
                    onChange={(e) => updateBuild(index, 'flatDamage', e.target.value)}
                    className="input-field"
                    placeholder="????. 250"
                  />
                </div>

                <div>
                  <label className="block text-[#e3d6c2] mb-2 text-sm">???????? ????? (??/?)</label>
                  <input
                    type="number"
                    value={build.attacksPerSecond}
                    onChange={(e) => updateBuild(index, 'attacksPerSecond', e.target.value)}
                    className="input-field"
                    placeholder="????. 1.6"
                  />
                </div>

                <div>
                  <label className="block text-[#e3d6c2] mb-2 text-sm">????. ???? (%)</label>
                  <input
                    type="number"
                    value={build.critChance}
                    onChange={(e) => updateBuild(index, 'critChance', e.target.value)}
                    className="input-field"
                    placeholder="????. 35"
                  />
                </div>

                <div>
                  <label className="block text-[#e3d6c2] mb-2 text-sm">????. ?????????</label>
                  <input
                    type="number"
                    value={build.critMultiplier}
                    onChange={(e) => updateBuild(index, 'critMultiplier', e.target.value)}
                    className="input-field"
                    placeholder="????. 2.0"
                  />
                </div>

                <div>
                  <label className="block text-[#e3d6c2] mb-2 text-sm">???????? ???? (%)</label>
                  <input
                    type="number"
                    value={build.bonusDamage}
                    onChange={(e) => updateBuild(index, 'bonusDamage', e.target.value)}
                    className="input-field"
                    placeholder="????. 15"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[#e3d6c2] mb-2 text-sm">???????????? ??? (???)</label>
                  <input
                    type="number"
                    value={build.duration}
                    onChange={(e) => updateBuild(index, 'duration', e.target.value)}
                    className="input-field"
                    placeholder="????. 90"
                  />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-[#130d0a]/70 border border-[#2b1e15] px-4 py-3">
                  <span className="text-[#e3d6c2] text-sm">??????? ???? ?? ????</span>
                  <span className="text-xl font-bold font-orbitron text-[#c88b5e]">
                    {results[index].avgHit ? results[index].avgHit.toFixed(2) : '?'}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-[#130d0a]/70 border border-[#2b1e15] px-4 py-3">
                  <span className="text-[#e3d6c2] text-sm">DPS</span>
                  <span className="text-xl font-bold font-orbitron text-[#c88b5e]">
                    {results[index].dps ? results[index].dps.toFixed(2) : '?'}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-[#130d0a]/70 border border-[#2b1e15] px-4 py-3">
                  <span className="text-[#e3d6c2] text-sm">????? ???? ?? ???</span>
                  <span className="text-xl font-bold font-orbitron text-[#c88b5e]">
                    {results[index].totalDamage ? results[index].totalDamage.toFixed(2) : '?'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center text-[#b7a68e] text-sm">
          ???????: ??????? ???? = (???? + ??????? ?????) ? (1 + ?????% ) ? (1 + ????.???? ? (????.????. ? 1));
          DPS = ??????? ???? ? ???????? ?????.
        </div>
      </div>
    </div>
  );
}
