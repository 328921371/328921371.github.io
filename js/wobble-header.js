document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.column');
    if (header) {
      new WobbleWindow(header);
    }
  });
  