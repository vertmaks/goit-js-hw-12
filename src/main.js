import getImagesByQuery from './js/pixabay-api';
import {
  createGallery,
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

async function renderGallery(query, page) {
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    if (!data.hits.length) {
      showError(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      hideLoadMoreButton();
      gallery.innerHTML = '';
      return;
    }

    createGallery(data.hits);

    const totalPages = Math.ceil(data.totalHits / 15);

    if (page >= totalPages) {
      hideLoadMoreButton();
      showError("We're sorry, but you've reached the end of search results.");
    } else {
      showLoadMoreButton();
    }

    if (page > 1) {
      const cardHeight = document
        .querySelector('.gallery-item')
        .getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  } catch (error) {
    console.log(error);
    showError('An error occurred while loading images.');
  } finally {
    hideLoader();
  }
}
