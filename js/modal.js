const d = document;

export default function cerrarModal() {
  d.addEventListener('click', (e) => {
    if (e.target.matches('.btn-cerrar')) {
      console.log('click');
      d.querySelector('.modal').classList.remove('active');
      d.querySelector('.container').classList.remove('modal-filter');
    }

    if (e.target.matches('.modal')) {
      console.log('click modal');
      d.querySelector('.modal').classList.remove('active');
      d.querySelector('.container').classList.remove('modal-filter');
    }
  });
}
