import { Header } from './components/Header.js';
import { PokemonContainer } from './components/PokemonContainer.js';
import { Loader } from './components/Loader.js';
import { Router } from './router/router.js';
import { Modal } from './components/Modal.js';
import { Menu } from './components/Menu.js';
import { Footer } from './components/Footer.js';
import { paginacion } from './helpers/pagination.js';

export const App = () => {
  const $root = document.getElementById('root');

  $root.innerHTML = null;
  $root.appendChild(Modal());
  $root.appendChild(Header());
  $root.appendChild(Menu());
  $root.appendChild(Loader());
  $root.appendChild(PokemonContainer());
  $root.appendChild(Footer());

  Router();
};
