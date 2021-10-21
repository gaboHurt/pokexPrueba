import { PokemonCard } from './PokemonCard.js';
import { getPokemons, getPokemonData } from '../helpers/ajax.js';
import poke_api from '../helpers/poke_api.js';

export const Pagination = (props) => {
  let { next, previous, count } = props;

  let limit = 20,
    page = 0,
    offset = page * limit;

  const $div = document.createElement('div'),
    $next = document.createElement('a'),
    $prev = document.createElement('a'),
    d = document,
    $main = d.querySelector('.pokemon-container');

  $div.classList.add('pagination');
  $prev.href = previous
    ? previous
    : 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20';
  $prev.classList.add('btn-prev');
  $prev.textContent = '⏪';
  $next.href = next ? next : '#/';
  $next.classList.add('btn-next');
  $next.textContent = '⏩';

  $div.appendChild($prev);

  $div.appendChild($next);

  $div.addEventListener('click', async (e) => {
    if (e.target.matches('.btn-prev') || e.target.matches('.btn-next')) {
      e.preventDefault();

      const $loader = d.querySelector('.loader'),
        $footer = d.querySelector('footer');

      $loader.classList.add('loader-active');
      $footer.classList.remove('visible');
      $main.innerHTML = '';

      localStorage.setItem('pokeApi', e.target.href);
      let data = await getPokemons(e.target.href);

      const template = d.createDocumentFragment();
      let promise = data.results.map(async (pokemon) => {
        return await getPokemonData({
          url: pokemon.url,
          cbSuccess: (pok) => {
            template.append(PokemonCard(pok));
          },
        });
      });

      let results = await Promise.all(promise);
      results.forEach(() => {});

      $main.append(template);
      $main.prepend(Pagination(data));
      d.documentElement.scrollTop = 0;

      $main.appendChild(Pagination(data));
      $loader.classList.remove('loader-active');
      $footer.classList.add('visible');
    }
  });

  return $div;
};
