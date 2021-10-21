import { colorType, tipoPokemon } from '../helpers/tiposPokemon_img_color.js';
import { BtnFavorite } from './BtnFavorite.js';

const PokemonSolo = (props) => {
  let { id, name, sprites, stats, types } = props;
  let imgShiny = sprites.front_shiny,
    imgNormal = sprites.front_default;
  const d = document,
    $article = d.createElement('article');
  $article.classList = 'pokemon-solo';
  $article.style.backgroundColor = colorType(types[0].type.name);
  $article.appendChild(BtnFavorite(props));

  //Nombre y Id pokemon
  const $h2 = d.createElement('h2'),
    $span = d.createElement('span');
  $span.classList.add('pok-id');
  $h2.textContent = name.toUpperCase();
  $span.textContent = ` ID: ${id}`;
  $h2.appendChild($span);

  //Imagenes normal y shiny
  const $divImg = d.createElement('div'),
    $figureNormal = d.createElement('figure'),
    $figureShiny = d.createElement('figure');
  $divImg.classList.add('pok-img-container');

  $figureNormal.innerHTML = `
  <img src="${imgNormal}" alt="${name}Normal" class="pok-img img-normal">
  <figcaption>
    Normal
  </figcaption>`;
  $figureShiny.innerHTML = `
  <img src="${imgShiny}" alt="${name} Shiny" class="pok-img img-shiny">
    <figcaption>
       Shiny
    </figcaption>
  `;
  $divImg.appendChild($figureNormal);
  $divImg.appendChild($figureShiny);

  //Tipos pokemon
  let templateTypes = `<h3>Types:</h3>`;
  const $divTypes = d.createElement('div');
  types.forEach((type) => {
    templateTypes += `<img src="${tipoPokemon(type.type.name)}" alt="${
      type.type.name
    }">`;
  });
  $divTypes.classList.add('pok-types');
  $divTypes.innerHTML = templateTypes;

  //Stats pokemon
  const $table = d.createElement('table'),
    $tbody = d.createElement('tbody'),
    $thead = d.createElement('thead');
  $table.classList.add('pok-table');

  $thead.innerHTML = `
    <tr>
        <th>Stat</th>
        <th>Pts</th>
    </tr>
  `;
  let trTemplate = '';
  stats.forEach((stat) => {
    trTemplate += `<tr>
        <td>${stat.stat.name}</td><td>${stat.base_stat}</td>
      </tr>`;
  });
  $table.appendChild($thead);
  $tbody.innerHTML = trTemplate;
  $table.appendChild($tbody);

  $article.appendChild($h2);
  $article.appendChild($divImg);
  $article.appendChild($divTypes);
  $article.appendChild($table);

  return $article;
};

export { PokemonSolo };
