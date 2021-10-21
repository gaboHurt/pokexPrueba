export const tipoPokemon = (type) => {
  const tipos = new Map([
    ['bug', './app/public/assets/BugIC.gif'],
    ['dark', './app/public/assets/DarkIC.gif'],
    ['dragon', './app/public/assets/DragonIC.gif'],
    ['electric', './app/public/assets/ElectricIC.gif'],
    ['fairy', './app/public/assets/FairyIC.gif'],
    ['fighting', './app/public/assets/FightingIC.gif'],
    ['fire', './app/public/assets/FireIC.gif'],
    ['flying', './app/public/assets/FlyingIC.gif'],
    ['ghost', './app/public/assets/GhostIC.gif'],
    ['grass', './app/public/assets/GrassIC.gif'],
    ['ground', './app/public/assets/GroundIC.gif'],
    ['ice', './app/public/assets/IceIC.gif'],
    ['normal', './app/public/assets/NormalIC.gif'],
    ['poison', './app/public/assets/PoisonIC.gif'],
    ['psychic', './app/public/assets/PsychicIC.gif'],
    ['rock', './app/public/assets/RockIC.gif'],
    ['steel', './app/public/assets/SteelIC.gif'],
    ['water', './app/public/assets/WaterIC.gif'],
  ]);

  return tipos.get(type);
};

export const colorType = (type) => {
  const tiposPokes = new Map([
    ['steel', 'rgb(168,168,192,0.6)'],
    ['water', 'rgb(56,153,248,0.6)'],
    ['bug', 'rgb(168,184,32,0.6)'],
    ['dragon', 'rgb(160,80,56,0.6)'],
    ['electric', 'rgb(248,208,48,0.6)'],
    ['ghost', 'rgb(96,96,176,0.6)'],
    ['fire', 'rgb(255, 0, 0,0.6)'],
    ['fairy', 'rgb(231,159,231,0.6)'],
    ['ice', 'rgb(88,200,224,0.6)'],
    ['fighting', 'rgb(160,80,56,0.6)'],
    ['normal', 'rgb(168,160,144,0.6)'],
    ['grass', 'rgb(120,200,80,0.6)'],
    ['psychic', 'rgb(248,112,160,0.6)'],
    ['rock', 'rgb(184,160,88,0.6)'],
    ['dark', 'rgb(72,81,87,0.6)'],
    ['ground', 'rgb(234,214,164,0.6)'],
    ['poison', 'rgb(176,88,160,0.6)'],
    ['flying', 'rgb(152,168,240,0.6)'],
  ]);

  return tiposPokes.get(type);
};
