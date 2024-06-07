document.addEventListener('DOMContentLoaded', () => {
  header = document.querySelector('.column');
  if (header) {
    new WobbleWindow(header);
  }
});
  
  