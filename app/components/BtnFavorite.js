import pokeapi from '../helpers/poke_api.js';

export const BtnFavorite = (props, pokeType = null, pokeImg = null) => {
  let { name, sprites, types, id } = props;
  let type = types ? types[0].type.name : null;
  const d = document,
    $btnFavorite = d.createElement('button');
  $btnFavorite.classList.add('btn-favorite');
  $btnFavorite.dataset.id = id;
  $btnFavorite.dataset.img = pokeImg ? pokeImg : sprites.front_default;
  $btnFavorite.dataset.types = pokeType ? pokeType : type;
  $btnFavorite.dataset.name = name;
  $btnFavorite.dataset.favorite = false;
  $btnFavorite.textContent = '🖤';
  //   $btnFavorite.dataset.favorite = false;
  pokeapi.pokeFav.forEach((pokemon) => {
    if (name === pokemon.name) {
      $btnFavorite.dataset.favorite = true;
      $btnFavorite.textContent = '❤️';
    }
  });
  if (location.hash.includes('#/pokemon/')) {
    $btnFavorite.classList.add('btn-favorite-big');
  }

  $btnFavorite.addEventListener('click', (e) => {
    if (e.target.matches('.btn-favorite')) {
      let cont = 0;
      if (e.target.dataset.favorite === 'true') {
        let indexPok;
        //Guaramos el indice del pokemon que esta agregado para proceder a eliminarlo
        pokeapi.pokeFav.forEach((el, index) => {
          if (el.name === e.target.dataset.name) {
            indexPok = index;
          }
        });
        //Elminamos al pokemon
        pokeapi.pokeFav.splice(indexPok, 1);
        if (location.hash === '#/favorites') {
          location.reload();
        }
        e.target.dataset.favorite = false;
        e.target.textContent = '🖤';
        //Recargamos la app
      } else if (e.target.dataset.favorite === 'false') {
        e.target.dataset.favorite = true;
        e.target.textContent = '❤️';
        //console.log(e.target.dataset.favorite);

        pokeapi.pokeFav.forEach((el) => {
          if (el.id === e.target.dataset.id) {
            cont++;
          }
        });

        if (cont === 0) {
          pokeapi.pokeFav.push({
            name: e.target.dataset.name,
            img: e.target.dataset.img,
            id: e.target.dataset.id,
            type: e.target.dataset.types,
          });
        }
      }
      let pokemonFav = JSON.stringify(pokeapi.pokeFav);
      localStorage.setItem('pokemonFav', pokemonFav);
    }
  });

  return $btnFavorite;
};
