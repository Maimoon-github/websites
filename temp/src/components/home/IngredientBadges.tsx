import React from 'react';
import {
  SiliconeFreeIcon,
  ParabenFreeIcon,
  MineralOilFreeIcon,
  BotanicalIcon,
  SilkStarIcon,
  SteelToolsIcon,
} from '@/components/icons';

export function IngredientBadges() {
  const badges = [
    {
      title: 'No silicones',
      bg: '#F8E1D4',
      icon: <SiliconeFreeIcon size={32} />,
    },
    {
      title: 'No parabens',
      bg: '#EDE3D6',
      icon: <ParabenFreeIcon size={32} />,
    },
    {
      title: 'No mineral oil',
      bg: '#F3E2D5',
      icon: <MineralOilFreeIcon size={32} />,
    },
    {
      title: 'Rosemary, arnica, jaborandi',
      bg: '#F8E1D4',
      icon: <BotanicalIcon size={32} stroke="#14110F" />,
    },
    {
      title: '22 momme mulberry silk',
      bg: '#EDE3D6',
      icon: <SilkStarIcon size={32} />,
    },
    {
      title: 'Japanese J2 steel tools',
      bg: '#F3E2D5',
      icon: <SteelToolsIcon size={32} />,
    },
  ];

  return (
    <section aria-label="Brand ingredient promises" className="max-w-[1360px] mx-auto px-6 pt-14">
      <div className="flex flex-wrap justify-center gap-x-12 gap-y-7">
        {badges.map((b) => (
          <div
            key={b.title}
            className="flex flex-col items-center gap-2.5 w-[120px] text-center"
          >
            <span
              className="w-[76px] h-[76px] rounded-capsule flex items-center justify-center transition-transform hover:scale-105"
              style={{ backgroundColor: b.bg }}
            >
              {b.icon}
            </span>
            <span className="text-[13px] font-bold text-raka-ink">{b.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
