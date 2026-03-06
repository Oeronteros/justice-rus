'use client';

import { useMemo, useState } from 'react';
import WuxiaIcon from '@/components/WuxiaIcons';
import { useLanguage } from '@/lib/i18n/context';
import { SectionHero } from '@/components/shared/SectionHero';

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
  const { language } = useLanguage();
  const [builds, setBuilds] = useState<BuildInput[]>([
    createBuild('Build A'),
    createBuild('Build B'),
  ]);

  const copy = useMemo(() => {
    if (language === 'ru') {
      return {
        title: 'Калькулятор билдов',
        subtitle: 'Сравнивай средний удар, DPS и урон за бой. Удобно для подготовки к рейдам и PvP.',
        upTo: 'До 4 билдов для сравнения.',
        addBuild: 'Добавить билд',
        removeBuild: 'Удалить билд',
        baseDamage: 'Базовый урон',
        flatDamage: 'Плоский бонус',
        attackSpeed: 'Скорость атак (уд/с)',
        critChance: 'Шанс крита (%)',
        critMultiplier: 'Множитель крита',
        bonusDamage: 'Бонус урона (%)',
        duration: 'Длительность боя (сек)',
        avgHit: 'Средний удар',
        dps: 'DPS',
        totalDamage: 'Общий урон',
        formula: 'Формула: средний удар = (база + плоский бонус) × (1 + бонус%) × (1 + шанс крита × (множитель - 1)); DPS = средний удар × скорость атак.',
      };
    }

    if (language === 'zh') {
      return {
        title: '配装计算器',
        subtitle: '对比平均单击、DPS 与总伤，快速确定团本与 PvP 的最优方案。',
        upTo: '最多可对比 4 套配置。',
        addBuild: '新增配置',
        removeBuild: '删除配置',
        baseDamage: '基础伤害',
        flatDamage: '固定加成',
        attackSpeed: '攻速（次/秒）',
        critChance: '暴击率 (%)',
        critMultiplier: '暴击倍率',
        bonusDamage: '伤害加成 (%)',
        duration: '战斗时长（秒）',
        avgHit: '平均单次',
        dps: 'DPS',
        totalDamage: '总伤害',
        formula: '公式：平均单次 = (基础 + 固定加成) × (1 + 伤害加成%) × (1 + 暴击率 × (暴击倍率 - 1)); DPS = 平均单次 × 攻速。',
      };
    }

    return {
      title: 'Build Calculator',
      subtitle: 'Compare average hit, DPS, and total damage to choose the most reliable setup for raids and PvP.',
      upTo: 'Up to 4 builds for comparison.',
      addBuild: 'Add build',
      removeBuild: 'Remove build',
      baseDamage: 'Base damage',
      flatDamage: 'Flat bonus damage',
      attackSpeed: 'Attack speed (hits/s)',
      critChance: 'Crit chance (%)',
      critMultiplier: 'Crit multiplier',
      bonusDamage: 'Bonus damage (%)',
      duration: 'Fight duration (sec)',
      avgHit: 'Average hit',
      dps: 'DPS',
      totalDamage: 'Total damage',
      formula: 'Formula: avg hit = (base + flat bonus) x (1 + bonus%) x (1 + crit chance x (crit mult - 1)); DPS = avg hit x attack speed.',
    };
  }, [language]);

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
    <section className="py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHero
          icon={<WuxiaIcon name="calculator" className="w-5 h-5" />}
          title={copy.title}
          subtitle={copy.subtitle}
          chips={['DPS', 'Raid Prep', 'PvP Tuning']}
        />

        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-400 text-sm">{copy.upTo}</div>
          <button
            onClick={addBuild}
            className="btn-secondary px-4 py-2 text-sm font-semibold"
          >
            <WuxiaIcon name="plus" className="inline-block w-4 h-4 mr-2 align-text-bottom" />
            {copy.addBuild}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {builds.map((build, index) => (
            <div key={`${build.name}-${index}`} className="card p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#2f6e8d] to-[#8fb9cc] rounded-full flex items-center justify-center shadow-lg shadow-[#0c1a24]/40">
                    <WuxiaIcon name="sword" className="w-6 h-6 text-white" />
                  </div>
                  <input
                    value={build.name}
                    onChange={(e) => updateBuild(index, 'name', e.target.value)}
                    className="bg-transparent text-2xl font-bold font-orbitron text-[#8fb9cc] focus:outline-none"
                  />
                </div>
                {builds.length > 1 && (
                    <button
                      onClick={() => removeBuild(index)}
                      className="text-gray-400 hover:text-[#8fb9cc] transition"
                      title={copy.removeBuild}
                    >
                      <WuxiaIcon name="trash" className="w-5 h-5" />
                    </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[#e6eff5] mb-2 text-sm">{copy.baseDamage}</label>
                  <input
                    type="number"
                    value={build.baseDamage}
                    onChange={(e) => updateBuild(index, 'baseDamage', e.target.value)}
                    className="input-field"
                    placeholder="e.g. 1200"
                  />
                </div>

                <div>
                  <label className="block text-[#e6eff5] mb-2 text-sm">{copy.flatDamage}</label>
                  <input
                    type="number"
                    value={build.flatDamage}
                    onChange={(e) => updateBuild(index, 'flatDamage', e.target.value)}
                    className="input-field"
                    placeholder="e.g. 250"
                  />
                </div>

                <div>
                  <label className="block text-[#e6eff5] mb-2 text-sm">{copy.attackSpeed}</label>
                  <input
                    type="number"
                    value={build.attacksPerSecond}
                    onChange={(e) => updateBuild(index, 'attacksPerSecond', e.target.value)}
                    className="input-field"
                    placeholder="e.g. 1.6"
                  />
                </div>

                <div>
                  <label className="block text-[#e6eff5] mb-2 text-sm">{copy.critChance}</label>
                  <input
                    type="number"
                    value={build.critChance}
                    onChange={(e) => updateBuild(index, 'critChance', e.target.value)}
                    className="input-field"
                    placeholder="e.g. 35"
                  />
                </div>

                <div>
                  <label className="block text-[#e6eff5] mb-2 text-sm">{copy.critMultiplier}</label>
                  <input
                    type="number"
                    value={build.critMultiplier}
                    onChange={(e) => updateBuild(index, 'critMultiplier', e.target.value)}
                    className="input-field"
                    placeholder="e.g. 2.0"
                  />
                </div>

                <div>
                  <label className="block text-[#e6eff5] mb-2 text-sm">{copy.bonusDamage}</label>
                  <input
                    type="number"
                    value={build.bonusDamage}
                    onChange={(e) => updateBuild(index, 'bonusDamage', e.target.value)}
                    className="input-field"
                    placeholder="e.g. 15"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[#e6eff5] mb-2 text-sm">{copy.duration}</label>
                  <input
                    type="number"
                    value={build.duration}
                    onChange={(e) => updateBuild(index, 'duration', e.target.value)}
                    className="input-field"
                    placeholder="e.g. 90"
                  />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-[#0f161d]/75 border border-[#243240] px-4 py-3">
                  <span className="text-[#e6eff5] text-sm">{copy.avgHit}</span>
                  <span className="text-xl font-bold font-orbitron text-[#8fb9cc]">
                    {results[index].avgHit ? results[index].avgHit.toFixed(2) : '?'}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-[#0f161d]/75 border border-[#243240] px-4 py-3">
                  <span className="text-[#e6eff5] text-sm">{copy.dps}</span>
                  <span className="text-xl font-bold font-orbitron text-[#8fb9cc]">
                    {results[index].dps ? results[index].dps.toFixed(2) : '?'}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-[#0f161d]/75 border border-[#243240] px-4 py-3">
                  <span className="text-[#e6eff5] text-sm">{copy.totalDamage}</span>
                  <span className="text-xl font-bold font-orbitron text-[#8fb9cc]">
                    {results[index].totalDamage ? results[index].totalDamage.toFixed(2) : '?'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center text-gray-500 text-sm leading-relaxed">
          {copy.formula}
        </div>
      </div>
    </section>
  );
}
