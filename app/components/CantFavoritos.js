export const CantFavoritos = (cant) => {
  const $cantFavorites = document.createElement('h2');
  $cantFavorites.classList.add('cant-fav');
  $cantFavorites.innerHTML = `❤️<span>${cant}</span>`;

  return $cantFavorites;
};
