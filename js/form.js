const d = document;
export default function formPokemon() {
  d.addEventListener('submit', (e) => {
    if (e.target.matches('.form-pokemon')) {
      e.preventDefault();
      if (e.target['input-pokemon'].value.trim() === '') {
        d.querySelector('.modal').classList.add('active');
        d.querySelector('.container').classList.add('modal-filter');
        return;
      }
      console.log('click');
      if (location.pathname === '/pokedex_Gabo/index.html') {
        location.href = `./v/pokemon.html?idName=${e.target['input-pokemon'].value.toLowerCase()}`;
      } else {
        location.href = `./pokemon.html?idName=${e.target['input-pokemon'].value.toLowerCase()}`;
      }
      e.target['input-pokemon'].value = '';
    }
  });
}
