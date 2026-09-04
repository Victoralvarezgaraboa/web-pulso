(() => {
  const renderNavigation = () => {
    if (document.querySelector('.demo-return-nav')) return;

    const navigation = document.createElement('nav');
    navigation.className = 'demo-return-nav';
    navigation.setAttribute('aria-label', 'Navegación de la demostración');
    navigation.innerHTML = `
      <a href="https://pulsogestiona.es/" aria-label="Volver a la página principal de Pulso">← Volver a Pulso</a>
      <a href="https://pulsogestiona.es/herramientas#demos">Ver todas las demos</a>
    `;
    document.body.appendChild(navigation);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderNavigation, { once: true });
  } else {
    renderNavigation();
  }
})();
