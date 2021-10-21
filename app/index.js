import { App } from './App.js';
import pokeapi from './helpers/poke_api.js';

document.addEventListener('DOMContentLoaded', (e) => {
  if (localStorage.getItem('pokemonFav')) {
    JSON.parse(localStorage.getItem('pokemonFav')).forEach((el) => {
      pokeapi.pokeFav.push(el);
    });
  }

  App();
});
window.addEventListener('hashchange', App);
