import pokeapi from '../helpers/poke_api.js';

export const Menu = () => {
  const $menu = document.createElement('nav');
  $menu.classList.add('menu');
  $menu.innerHTML = `
    <a href="#/">Home</a>
    <span>-</span>
    <a href="#/favorites">Favorites</a>
    
    `;
  return $menu;
};
