export const PokemonContainer = () => {
  const $pokList = document.createElement('section');
  $pokList.classList.add('pokemon-container');

  if (!location.hash.includes('#/pokemon'))
    $pokList.classList.add('grid-fluid');

  return $pokList;
};
