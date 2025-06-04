import {
  renderGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';
import { showError } from './js/notifications';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

form.addEventListener('submit', handleFormSubmit);

async function handleFormSubmit(e) {
  e.preventDefault();

  const currentForm = e.currentTarget;
  const searchQuery = currentForm.elements['search-text'].value.trim();

  if (!searchQuery) {
    showError('Please, fill search field');
    currentForm.reset();
    return;
  }

  currentQuery = searchQuery;
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();

  await renderGallery(currentQuery, currentPage);
  currentForm.reset();
}

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  await renderGallery(currentQuery, currentPage);
});
