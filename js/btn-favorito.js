const d = document;
let pokemonFav;

export default function btn_pokemonFavorito(pok_fav) {
  d.addEventListener('click', (e) => {
    if (
      e.target.matches('.btn-pokemon-fav *') ||
      e.target.matches('.btn-pokemon-fav')
    ) {
      let cont = 0;
      //Comprobamos si el boton tiene la clase favorito
      if (!e.target.classList.contains('fav')) {
        //Recorremos los pokemon favoritos para saber si ya esta agregado
        pok_fav.forEach((el) => {
          if (el.name === e.target.dataset.name) cont++;
        });
        //Si el resultado es 0 es porque no esta agregado y procedemos a agregarlo al local storage
        if (cont === 0) {
          pok_fav.push({
            name: e.target.dataset.name,
            img: e.target.dataset.img,
            url: e.target.dataset.url,
            id: e.target.dataset.id,
            type: e.target.dataset.type,
          });
        }
        e.target.textContent = '💚';
        e.target.classList.add('fav');
      } //Eliminaremos un pokemon de la lista de favorito
      else {
        let indexPok;
        console.log(pok_fav.hasOwnProperty(e.target.dataset.name));
        //Guaramos el indice del pokemon que esta agregado para proceder a eliminarlo
        pok_fav.forEach((el, index) => {
          if (el.name === e.target.dataset.name) {
            indexPok = index;
          }
        });
        //Elminamos al pokemon
        pok_fav.splice(indexPok, 1);
        e.target.classList.remove('fav');
        e.target.textContent = '🤍';
        // if (window.location.pathname === '/pokeApi/vistas/favoritos.html') {
        //   window.location.reload();
        // }
      }
    }
    //Guardamos los pokemon en el local strorage como formato texto
    pokemonFav = JSON.stringify(pok_fav);
    localStorage.setItem('pokemonFav', pokemonFav);
  });
}
