export const Modal = () => {
  const d = document,
    $modal = d.createElement('div'),
    $modalInfo = `
    <div class="modal-info">
        <button class="btn-cerrar">✖</button>
        <h3>Por favor, ingresa un nombre o id de un pokémon 📝</h3>
    </div>`;

  $modal.classList.add('modal');
  $modal.innerHTML = $modalInfo;

  d.addEventListener('click', (e) => {
    if (e.target.matches('.btn-cerrar')) {
      d.querySelector('.modal').classList.remove('active');
    }

    if (e.target.matches('.modal')) {
      d.querySelector('.modal').classList.remove('active');
    }
  });

  return $modal;
};
