export const Loader = () => {
  const $loader = document.createElement('img'),
    $contLoader = document.createElement('div');
  $loader.src = './app/public/assets/three-dots.svg';
  $loader.alt = 'Cargando...';
  $contLoader.classList.add('loader');

  $contLoader.appendChild($loader);

  return $contLoader;
};
