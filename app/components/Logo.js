export const Logo = () => {
  const d = document,
    $logo = d.createElement('div'),
    $h1 = d.createElement('h1'),
    $a = d.createElement('a'),
    $img = d.createElement('img');

  $logo.classList.add('logo');
  $h1.textContent = 'Pokédex';
  $a.setAttribute('href', '#/');
  $img.src = './app/public/assets/pokeball.svg';
  $img.alt = 'pokeball';
  $img.classList.add('logo-img');
  $img.classList.add('invertida');

  $a.appendChild($img);
  $logo.appendChild($a);
  $logo.appendChild($h1);

  setTimeout(() => {
    $img.classList.remove('invertida');
  }, 200);

  return $logo;
};
