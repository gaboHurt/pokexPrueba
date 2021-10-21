export const FormPokemon = () => {
  const d = document,
    $form = d.createElement('form'),
    $inputPokemon = d.createElement('input'),
    $btnBuscar = d.createElement('input');

  $form.classList.add('form-pokemon');
  $inputPokemon.classList.add('input-pokemon');
  $inputPokemon.type = 'search';
  $inputPokemon.name = 'input_pokemon';
  $inputPokemon.placeholder = 'Buscar por Nombre o ID';
  $btnBuscar.type = 'submit';
  $btnBuscar.value = '🔍';
  $btnBuscar.classList.add('btn-buscar');

  $form.appendChild($inputPokemon);
  $form.appendChild($btnBuscar);

  d.addEventListener('submit', (e) => {
    if (e.target.matches('.form-pokemon')) {
      e.preventDefault();
      if ($inputPokemon.value.trim() === '') {
        d.querySelector('.modal').classList.add('active');
        $inputPokemon.value = '';
        return false;
      }
      location.hash = `#/pokemon/${$inputPokemon.value}`;
      $inputPokemon.value = '';
    }
  });
  return $form;
};
