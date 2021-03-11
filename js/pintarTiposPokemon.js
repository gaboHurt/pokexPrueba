export default function pintarTiposPokemon(type, $clone) {
  const tipoPokeData = type;
  const tiposPokes = new Map([
    ['steel', 'rgb(168,168,192,0.8)'],
    ['water', 'rgb(56,153,248,0.8)'],
    ['bug', 'rgb(168,184,32,0.8)'],
    ['dragon', 'rgb(160,80,56,0.8)'],
    ['electric', 'rgb(248,208,48,0.8)'],
    ['ghost', 'rgb(96,96,176,0.8)'],
    ['fire', 'rgb(255, 0, 0,0.7)'],
    ['fairy', 'rgb(231,159,231,0.8)'],
    ['ice', 'rgb(88,200,224,0.8)'],
    ['fighting', 'rgb(160,80,56,0.8)'],
    ['normal', 'rgb(168,160,144,0.8)'],
    ['grass', 'rgb(120,200,80,0.8)'],
    ['psychic', 'rgb(248,112,160,0.8)'],
    ['rock', 'rgb(184,160,88,0.8)'],
    ['dark', 'rgb(72,81,87,0.8)'],
    ['ground', 'rgb(234,214,164,0.8)'],
    ['poison', 'rgb(176,88,160,0.8)'],
    ['flying', 'rgb(152,168,240,0.8)'],
  ]);

  if (tiposPokes.has(tipoPokeData)) {
    // console.log(tiposPokes.get(tipoPokeData))
    $clone.querySelector('.pokemon').style.backgroundColor = tiposPokes.get(
      tipoPokeData
    );
  } else {
    $clone.querySelector('.pokemon').style.backgroundColor = 'rgb(255, 0, 0)';
  }
}
