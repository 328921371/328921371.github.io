document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.column');
    if (header) {
      const wobble = new WobbleWindow(header);
    }
  });
  