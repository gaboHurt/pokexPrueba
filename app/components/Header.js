import { FormPokemon } from './FormPokemon.js';
import { Logo } from './Logo.js';

export const Header = () => {
  const $header = document.createElement('header'),
    $contHeader = document.createElement('div');

  $header.classList.add('header');
  $contHeader.classList.add('cont-header');
  $contHeader.appendChild(Logo());
  $contHeader.appendChild(FormPokemon());
  $header.appendChild($contHeader);

  return $header;
};
