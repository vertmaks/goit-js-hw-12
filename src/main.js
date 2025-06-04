import { renderGallery } from './js/render-functions';
import { showError } from './js/notifications';

const form = document.querySelector('.form');

form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();

  const currentForm = e.currentTarget;
  const searchQuery = currentForm.elements['search-text'].value.trim();

  if (!searchQuery) {
    showError('Please, fill search field');
    currentForm.reset();
    return;
  }

  renderGallery(searchQuery);
  currentForm.reset();
}
