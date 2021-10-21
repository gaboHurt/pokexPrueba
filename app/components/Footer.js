export const Footer = () => {
  const $footer = document.createElement('footer'),
    $container_footer = `
    <div class="container-footer">
        <p>💖 Gracias por tu visita 💖</p>
        <p>🔥 Esta es una página de prueba para aprender JS 🔥</p>
    </div>`;

  $footer.innerHTML = $container_footer;

  return $footer;
};
