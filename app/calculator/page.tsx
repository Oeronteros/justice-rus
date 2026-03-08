'use client';

import { useEffect, useMemo, useState } from 'react';
import WuxiaIcon from '@/components/WuxiaIcons';
import { useLanguage } from '@/lib/i18n/context';
import { SectionHero } from '@/components/shared/SectionHero';
import { authApi } from '@/lib/api/auth';
import { hasRoleAtLeast } from '@/lib/authz';
import type { User } from '@/lib/schemas/auth';

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
  const [userRole, setUserRole] = useState<User['role']>('guest');
  const [isAuthResolved, setIsAuthResolved] = useState(false);
  const [builds, setBuilds] = useState<BuildInput[]>([
    createBuild('Build A'),
    createBuild('Build B'),
  ]);

  useEffect(() => {
    let active = true;

    const loadUserRole = async () => {
      try {
        const response = await authApi.verify();
        if (active) {
          setUserRole(response.user.role);
        }
      } catch {
        if (active) {
          setUserRole('guest');
        }
      } finally {
        if (active) {
          setIsAuthResolved(true);
        }
      }
    };

    void loadUserRole();

    return () => {
      active = false;
    };
  }, []);

  const copy = useMemo(() => {
    if (language === 'ru') {
      return {
        title: 'Калькулятор DPS',
        subtitle: 'Сравнивай ротации, средний удар и итоговый урон без лишней абстракции от остальных вкладок.',
        upTo: 'До 4 билдов для сравнения.',
        addBuild: 'Добавить билд',
        removeBuild: 'Удалить билд',
        commandDeck: 'Боевой стол',
        commandDeckHint: 'Сверяй скорость, криты и итоговый ДПС прямо в одном экране.',
        bestSetup: 'Лучший текущий DPS',
        bestSetupHint: 'Подсвечивается билд с наибольшим уроном в секунду.',
        battleWindow: 'Окно боя',
        battleWindowHint: 'Total Damage учитывает длительность боя, поэтому удобно тестировать burst и sustained.',
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
        accessRestricted: 'Этот функционал доступен узкому кругу лиц.',
      };
    }

    if (language === 'zh') {
      return {
        title: 'DPS 计算器',
        subtitle: '直接对比循环、平均单击与总伤，不再显得像独立于其他页面的抽象工具。',
        upTo: '最多可对比 4 套配置。',
        addBuild: '新增配置',
        removeBuild: '删除配置',
        commandDeck: '战斗台',
        commandDeckHint: '在一个界面里对比攻速、暴击与最终 DPS。',
        bestSetup: '当前最高 DPS',
        bestSetupHint: '会高亮当前 DPS 最高的配置。',
        battleWindow: '战斗时窗',
        battleWindowHint: 'Total Damage 会结合战斗时长，适合测试 burst 与持续输出。',
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
        accessRestricted: '该功能仅对少数人员开放。',
      };
    }

    return {
      title: 'DPS Calculator',
      subtitle: 'Compare rotations, average hit, and total damage in a page that feels like part of the combat toolkit.',
      upTo: 'Up to 4 builds for comparison.',
      addBuild: 'Add build',
      removeBuild: 'Remove build',
      commandDeck: 'Combat Desk',
      commandDeckHint: 'Match attack speed, crits, and final DPS in one focused workspace.',
      bestSetup: 'Highest current DPS',
      bestSetupHint: 'The build with the best DPS is highlighted automatically.',
      battleWindow: 'Fight Window',
      battleWindowHint: 'Total damage uses fight duration, so it works for burst and sustained checks.',
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
      accessRestricted: 'This functionality is available to a narrow circle of users.',
    };
  }, [language]);

  const canUseCalculator = isAuthResolved && hasRoleAtLeast(userRole, 'officer');
  const controlDisabled = !canUseCalculator;
  const inputClassName = controlDisabled ? 'input-field opacity-60 cursor-not-allowed' : 'input-field';
  const nameInputClassName = controlDisabled
    ? 'bg-transparent text-2xl font-bold font-orbitron text-[#8fb9cc] focus:outline-none opacity-60 cursor-not-allowed'
    : 'bg-transparent text-2xl font-bold font-orbitron text-[#8fb9cc] focus:outline-none';
  const secondaryButtonClassName = controlDisabled
    ? 'btn-secondary px-4 py-3 text-sm font-semibold opacity-60 cursor-not-allowed'
    : 'btn-secondary px-4 py-3 text-sm font-semibold';

  const updateBuild = (index: number, key: keyof BuildInput, value: string) => {
    if (controlDisabled) return;
    setBuilds(prev => prev.map((build, i) => (i == index ? { ...build, [key]: value } : build)));
  };

  const addBuild = () => {
    if (controlDisabled) return;
    setBuilds(prev => {
      if (prev.length >= 4) return prev;
      return [...prev, createBuild(`Build ${String.fromCharCode(65 + prev.length)}`)];
    });
  };

  const removeBuild = (index: number) => {
    if (controlDisabled) return;
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

  const topDps = useMemo(() => results.reduce((best, current) => Math.max(best, current.dps), 0), [results]);

  return (
    <section className="py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHero
          icon={<WuxiaIcon name="calculator" className="w-5 h-5" />}
          title={copy.title}
          subtitle={copy.subtitle}
          eyebrow={copy.commandDeck}
          chips={['DPS', 'Raid Prep', 'PvP Tuning']}
        />

        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.75fr)] gap-6 mb-8">
          <div className="card p-6 md:p-7">
            <div className="text-xs uppercase tracking-[0.24em] text-[#9ec5d8] mb-3">{copy.commandDeck}</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="rounded-2xl border border-[#2a3c4c]/60 bg-[#0c151d]/80 p-4">
                <div className="text-[#e6eff5] font-semibold mb-1">{copy.upTo}</div>
                <div className="text-gray-400">{copy.commandDeckHint}</div>
              </div>
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                <div className="text-emerald-200 font-semibold mb-1">{copy.bestSetup}</div>
                <div className="text-2xl font-orbitron text-emerald-300">{topDps ? topDps.toFixed(2) : '0.00'}</div>
                <div className="mt-1 text-emerald-100/70">{copy.bestSetupHint}</div>
              </div>
              <div className="rounded-2xl border border-[#2a3c4c]/60 bg-[#0c151d]/80 p-4">
                <div className="text-[#e6eff5] font-semibold mb-1">{copy.battleWindow}</div>
                <div className="text-gray-400">{copy.battleWindowHint}</div>
              </div>
            </div>
          </div>

          <div className="card p-6 flex flex-col justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.24em] text-[#9ec5d8] mb-3">DPS Formula</div>
              <div className="rounded-2xl border border-[#2a3c4c]/60 bg-[#0c151d]/85 p-4 text-sm text-gray-300 leading-relaxed">
                {copy.formula}
              </div>
            </div>

            {controlDisabled && isAuthResolved ? (
              <div className="rounded-2xl border border-red-900/40 bg-red-900/20 p-4 text-sm text-red-200">
                {copy.accessRestricted}
              </div>
            ) : null}

            <button
              onClick={addBuild}
              disabled={controlDisabled}
              aria-disabled={controlDisabled}
              className={secondaryButtonClassName}
            >
              <WuxiaIcon name="plus" className="inline-block w-4 h-4 mr-2 align-text-bottom" />
              {copy.addBuild}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {builds.map((build, index) => (
            <div
              key={`${build.name}-${index}`}
              className={`card p-8 ${results[index].dps > 0 && results[index].dps === topDps ? 'border-emerald-400/45 shadow-[0_28px_60px_rgba(16,185,129,0.16)]' : ''}`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg shadow-[#0c1a24]/40 ${results[index].dps > 0 && results[index].dps === topDps ? 'bg-gradient-to-r from-emerald-500 to-teal-300' : 'bg-gradient-to-r from-[#2f6e8d] to-[#8fb9cc]'}`}>
                    <WuxiaIcon name="sword" className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <input
                      value={build.name}
                      disabled={controlDisabled}
                      onChange={(e) => updateBuild(index, 'name', e.target.value)}
                      className={nameInputClassName}
                    />
                    {results[index].dps > 0 && results[index].dps === topDps ? (
                      <div className="mt-1 text-xs uppercase tracking-[0.24em] text-emerald-300">Top DPS</div>
                    ) : null}
                  </div>
                </div>
                {builds.length > 1 && (
                    <button
                      onClick={() => removeBuild(index)}
                      disabled={controlDisabled}
                      aria-disabled={controlDisabled}
                      className={controlDisabled ? 'text-gray-500 transition cursor-not-allowed opacity-60' : 'text-gray-400 hover:text-[#8fb9cc] transition'}
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
                    disabled={controlDisabled}
                    className={inputClassName}
                    placeholder="e.g. 1200"
                  />
                </div>

                <div>
                  <label className="block text-[#e6eff5] mb-2 text-sm">{copy.flatDamage}</label>
                  <input
                    type="number"
                    value={build.flatDamage}
                    onChange={(e) => updateBuild(index, 'flatDamage', e.target.value)}
                    disabled={controlDisabled}
                    className={inputClassName}
                    placeholder="e.g. 250"
                  />
                </div>

                <div>
                  <label className="block text-[#e6eff5] mb-2 text-sm">{copy.attackSpeed}</label>
                  <input
                    type="number"
                    value={build.attacksPerSecond}
                    onChange={(e) => updateBuild(index, 'attacksPerSecond', e.target.value)}
                    disabled={controlDisabled}
                    className={inputClassName}
                    placeholder="e.g. 1.6"
                  />
                </div>

                <div>
                  <label className="block text-[#e6eff5] mb-2 text-sm">{copy.critChance}</label>
                  <input
                    type="number"
                    value={build.critChance}
                    onChange={(e) => updateBuild(index, 'critChance', e.target.value)}
                    disabled={controlDisabled}
                    className={inputClassName}
                    placeholder="e.g. 35"
                  />
                </div>

                <div>
                  <label className="block text-[#e6eff5] mb-2 text-sm">{copy.critMultiplier}</label>
                  <input
                    type="number"
                    value={build.critMultiplier}
                    onChange={(e) => updateBuild(index, 'critMultiplier', e.target.value)}
                    disabled={controlDisabled}
                    className={inputClassName}
                    placeholder="e.g. 2.0"
                  />
                </div>

                <div>
                  <label className="block text-[#e6eff5] mb-2 text-sm">{copy.bonusDamage}</label>
                  <input
                    type="number"
                    value={build.bonusDamage}
                    onChange={(e) => updateBuild(index, 'bonusDamage', e.target.value)}
                    disabled={controlDisabled}
                    className={inputClassName}
                    placeholder="e.g. 15"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[#e6eff5] mb-2 text-sm">{copy.duration}</label>
                  <input
                    type="number"
                    value={build.duration}
                    onChange={(e) => updateBuild(index, 'duration', e.target.value)}
                    disabled={controlDisabled}
                    className={inputClassName}
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

      </div>
    </section>
  );
}
