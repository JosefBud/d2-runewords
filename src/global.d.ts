declare type Stat = {
  valueMin: number;
  valueMax: number;
  percent: boolean;
  modifier: string;
  spell: string;
  spellLevel: number;
  spellCharges: number;
  skill: string;
  skillLevelMin: number;
  skillLevelMax: number;
  skillBoost: string;
  skillBoostValueMin: number;
  skillBoostValueMax: number;
  note: string;
};

declare type Runeword = {
  name: string;
  level: number;
  items: string[];
  runes: string[];
  stats: Stat[];
};
