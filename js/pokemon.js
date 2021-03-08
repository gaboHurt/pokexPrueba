const d = document,
  search = new URLSearchParams(window.location.search),
  name_param = search.get('name'),
  id_param = search.get('id'),
  $main = d.querySelector('main'),
  $template = d.getElementById('pok-template').content,
  $fragment = d.createDocumentFragment(),
  $loader = d.querySelector('.loader'),
  $footer = d.querySelector('footer'),
  tipos = new Map([
    [
      'steel',
      'https://static.wikia.nocookie.net/espokemon/images/d/d9/Tipo_acero.gif/revision/latest/scale-to-width-down/48?cb=20170114100151',
    ],
    [
      'water',
      'https://static.wikia.nocookie.net/espokemon/images/9/94/Tipo_agua.gif/revision/latest/scale-to-width-down/48?cb=20170114100152',
    ],
    [
      'bug',
      'https://static.wikia.nocookie.net/espokemon/images/f/fe/Tipo_bicho.gif/revision/latest/scale-to-width-down/48?cb=20170114100153',
    ],
    [
      'dragon',
      'https://static.wikia.nocookie.net/espokemon/images/0/01/Tipo_drag%C3%B3n.gif/revision/latest/scale-to-width-down/48?cb=20170114100154',
    ],
    [
      'electric',
      'https://static.wikia.nocookie.net/espokemon/images/1/1b/Tipo_el%C3%A9ctrico.gif/revision/latest/scale-to-width-down/48?cb=20170114100155',
    ],
    [
      'ghost',
      'https://static.wikia.nocookie.net/espokemon/images/4/47/Tipo_fantasma.gif/revision/latest/scale-to-width-down/48?cb=20170114100329',
    ],
    [
      'fire',
      'https://static.wikia.nocookie.net/espokemon/images/c/ce/Tipo_fuego.gif/revision/latest/scale-to-width-down/48?cb=20170114100331',
    ],
    [
      'fairy',
      'https://static.wikia.nocookie.net/espokemon/images/b/bc/Tipo_hada.gif/revision/latest/scale-to-width-down/48?cb=20170114100332',
    ],
    [
      'ice',
      'https://static.wikia.nocookie.net/espokemon/images/4/40/Tipo_hielo.gif/revision/latest/scale-to-width-down/48?cb=20170114100333',
    ],
    [
      'fighting',
      'https://static.wikia.nocookie.net/espokemon/images/b/b7/Tipo_lucha.gif/revision/latest/scale-to-width-down/48?cb=20170114100336',
    ],
    [
      'normal',
      'https://static.wikia.nocookie.net/espokemon/images/3/32/Tipo_normal.gif/revision/latest/scale-to-width-down/48?cb=20170114100442',
    ],
    [
      'grass',
      'https://static.wikia.nocookie.net/espokemon/images/d/d6/Tipo_planta.gif/revision/latest/scale-to-width-down/48?cb=20170114100444',
    ],
    [
      'psychic',
      'https://static.wikia.nocookie.net/espokemon/images/1/15/Tipo_ps%C3%ADquico.gif/revision/latest/scale-to-width-down/48?cb=20170114100445',
    ],
    [
      'rock',
      'https://static.wikia.nocookie.net/espokemon/images/e/e0/Tipo_roca.gif/revision/latest/scale-to-width-down/48?cb=20170114100446',
    ],
    [
      'dark',
      'https://static.wikia.nocookie.net/espokemon/images/8/82/Tipo_siniestro.gif/revision/latest/scale-to-width-down/48?cb=20170114100447',
    ],
    [
      'ground',
      'https://static.wikia.nocookie.net/espokemon/images/1/1d/Tipo_tierra.gif/revision/latest/scale-to-width-down/48?cb=20170114100533',
    ],
    [
      'poison',
      'https://static.wikia.nocookie.net/espokemon/images/1/10/Tipo_veneno.gif/revision/latest/scale-to-width-down/48?cb=20170114100535',
    ],
    [
      'flying',
      'https://static.wikia.nocookie.net/espokemon/images/e/e1/Tipo_volador.gif/revision/latest/scale-to-width-down/48?cb=20170114100536',
    ],
  ]);

d.addEventListener('DOMContentLoaded', (e) => {
  fetchData(id_param);
});

const fetchData = async (id) => {
  $loader.classList.add('visible');
  $footer.classList.remove('visible');
  try {
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    let data = await res.json(),
      pokemon = {
        name: data.name,
        id: data.id,
        types: data.types,
        stats: data.stats,
        img_normal: data.sprites.front_default,
        img_shiny: data.sprites.front_shiny,
        abilities: data.abilities,
      };

    Pokemon(pokemon);
  } catch (err) {
    console.log(err);
    let msg = err.statusText || 'Ocurrio un error';
    $main.innerHTML = `<h2>Error ${err.status}: ${msg}</h2>`;
  } finally {
    $loader.classList.remove('visible');
    $footer.classList.add('visible');
  }
};

const Pokemon = (pokemon) => {
  let $clone = d.importNode($template, true);
  $clone.querySelector(
    '.pok-name'
  ).innerHTML = `${pokemon.name.toUpperCase()} - <span class="pok-id">${
    pokemon.id
  }</span>`;
  $clone.querySelector('.pok-img-normal').src = pokemon.img_normal;
  $clone.querySelector('.pok-img-normal').alt = pokemon.name;
  $clone.querySelector('.pok-img-shiny').src = pokemon.img_shiny;
  $clone.querySelector('.pok-img-shiny').alt = `${pokemon.name} shiny`;
  pokemon.abilities.forEach((ab) => {
    //console.log(ab);
    let $li = d.createElement('li');
    $li.textContent = ab.ability.name;
    $clone.querySelector('.pok-abilities').append($li);
  });
  pokemon.types.forEach((type) => {
    let $li = d.createElement('li');
    let $img = d.createElement('img');
    $img.setAttribute('src', tipos.get(type.type.name));
    $img.setAttribute('alt', type.type.name);
    $li.append($img);
    $clone.querySelector('.pok-types').append($li);
  });
  pokemon.stats.forEach((stat) => {
    let $li = d.createElement('li');
    $li.innerHTML = `${stat.stat.name}: ${stat.base_stat}`;
    $clone.querySelector('.pok-stats').append($li);
  });
  $fragment.append($clone);
  $main.append($fragment);
};
