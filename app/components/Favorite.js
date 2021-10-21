import { colorType } from '../helpers/tiposPokemon_img_color.js';
import { BtnFavorite } from './BtnFavorite.js';

export const Favorite = (props) => {
  let { name, img, type, id } = props;
  const d = document,
    $favorites = d.createElement('article');
  $favorites.classList.add('pokemon');
  $favorites.style.backgroundColor = `${colorType(type)}`;
  $favorites.innerHTML = `
  <img src="${img}" alt="${name}" class="pokemon-img">
  <a  class="pokemon-name" href="#/pokemon/${id}" data-id=${id}><h3>${name}</h3></a>
  `;
  $favorites.appendChild(BtnFavorite({ name, id }, type, img));

  return $favorites;
};
