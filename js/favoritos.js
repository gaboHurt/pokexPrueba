import btn_pokemonFavorito from './btn-favorito.js';
import pintarTiposPokemon from './pintarTiposPokemon.js';

const d = document,
  $main = d.querySelector('.pokemon-list'),
  $templatePok = d.getElementById('pokemon-fav-template').content,
  $loader = d.querySelector('.loader'),
  $fragment = d.createDocumentFragment(),
  $footer = d.querySelector('footer');
let pokemonListFav = [];

d.addEventListener('DOMContentLoaded', (e) => {
  if (localStorage.getItem('pokemonFav')) {
    Object.values(JSON.parse(localStorage.getItem('pokemonFav'))).forEach(
      (el) => {
        pokemonListFav.push(el);
      }
    );
    console.log(pokemonListFav);
  }
  mostrarPokemon(pokemonListFav);
  btn_pokemonFavorito(pokemonListFav);
});

d.addEventListener('submit', (e) => {
  if (e.target.matches('.form-pokemon')) {
    e.preventDefault();
    if (e.target['input-pokemon'].value.trim() === '') {
      return;
    }
    console.log('click');
    location.href = `./pokemon.html?idName=${e.target[
      'input-pokemon'
    ].value.toLowerCase()}`;
    e.target['input-pokemon'].value = '';
  }
});

const mostrarPokemon = (pokemonListFav) => {
  $loader.classList.add('visible');
  $footer.classList.remove('visible');
  try {
    if (localStorage.getItem('pokemonFav')) {
      pokemonListFav.forEach((pokemon) => {
        let $clone = d.importNode($templatePok, true);
        $clone.querySelector('.pokemon-fav-img').src = pokemon.img;
        $clone.querySelector('.pokemon-fav-img').alt = pokemon.name;
        $clone
          .querySelector('.pokemon-fav-name a')
          .setAttribute('href', `./pokemon.html?idName=${pokemon.name}`);
        $clone.querySelector('.pokemon-fav-name a').textContent = pokemon.name;
        $clone.querySelector('.pokemon-name a').textContent = pokemon.name;
        $clone.querySelector('.btn-pokemon-fav').dataset.name = pokemon.name;
        $clone.querySelector('.btn-pokemon-fav').dataset.url = pokemon.url;
        $clone.querySelector('.btn-pokemon-fav').dataset.img = pokemon.img;
        $clone.querySelector('.btn-pokemon-fav').textContent = '💚';
        $clone.querySelector('.btn-pokemon-fav').dataset.type = pokemon.type;

        pintarTiposPokemon(pokemon.type, $clone);

        $fragment.append($clone);
      });

      $main.append($fragment);
    }
    if (pokemonListFav.length === 0) {
      $main.innerHTML = `<h2>En estos momentos no tienes ningun Pokémon en tu lista de favoritos</h2>`;
    }
  } catch (error) {
    console.log(error);
    $main.innerHTML = `<h2>Ocurrio un error</h2>`;
  } finally {
    $loader.classList.remove('visible');
    $footer.classList.add('visible');
  }
};
