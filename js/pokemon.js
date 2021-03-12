import formPokemon from './form.js';
import cerrarModal from './modal.js';

const d = document,
  search = new URLSearchParams(window.location.search),
  idName_param = search.get('idName'),
  $main = d.querySelector('main'),
  $template = d.getElementById('pok-template').content,
  $fragment = d.createDocumentFragment(),
  $loader = d.querySelector('.loader'),
  $footer = d.querySelector('footer'),
  tipos = new Map([
    ['bug', '../assets/BugIC.gif'],
    ['dark', '../assets/DarkIC.gif'],
    ['dragon', '../assets/DragonIC.gif'],
    ['electric', '../assets/ElectricIC.gif'],
    ['fairy', '../assets/FairyIC.gif'],
    ['fighting', '../assets/FightingIC.gif'],
    ['fire', '../assets/FireIC.gif'],
    ['flying', '../assets/FlyingIC.gif'],
    ['ghost', '../assets/GhostIC.gif'],
    ['grass', '../assets/GrassIC.gif'],
    ['ground', '../assets/GroundIC.gif'],
    ['ice', '../assets/IceIC.gif'],
    ['normal', '../assets/NormalIC.gif'],
    ['poison', '../assets/PoisonIC.gif'],
    ['psychic', '../assets/PsychicIC.gif'],
    ['rock', '../assets/RockIC.gif'],
    ['steel', '../assets/SteelIC.gif'],
    ['water', '../assets/WaterIC.gif'],
  ]);

d.addEventListener('DOMContentLoaded', (e) => {
  fetchData(`https://pokeapi.co/api/v2/pokemon/${idName_param}`);
  formPokemon();
  cerrarModal();
});

const fetchData = async (url) => {
  $loader.classList.add('visible');
  $footer.classList.remove('visible');
  try {
    let res = await fetch(url);
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
  $main.innerHTML = '';
  let $clone = d.importNode($template, true);
  $clone.querySelector(
    '.pok-name'
  ).innerHTML = `${pokemon.name.toUpperCase()} - <span class="pok-id">ID:${
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
