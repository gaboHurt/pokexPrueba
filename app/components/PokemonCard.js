import { colorType } from '../helpers/tiposPokemon_img_color.js';
import { BtnFavorite } from './BtnFavorite.js';

export const PokemonCard = (props) => {
  let { name, sprites, types, id } = props;
  let typesPok = [];
  types.forEach((tp) => {
    typesPok.push(tp.type.name.toUpperCase());
  });
  const $article = document.createElement('article');
  $article.classList.add('pokemon');
  $article.style.backgroundColor = `${colorType(types[0].type.name)}`;
  $article.innerHTML = `
  <img src="${sprites.front_default}" alt="${name}" class="pokemon-img">
  <a  class="pokemon-name" href="#/pokemon/${id}" data-id=${id}><h3>${name}</h3></a>
  `;
  $article.appendChild(BtnFavorite(props));

  return $article;
};
