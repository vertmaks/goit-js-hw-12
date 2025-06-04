import getImagesByQuery from './pixabay-api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { showError } from './notifications';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        views,
        likes,
        comments,
        downloads,
      }) => `<li class="gallery-item">
        <a class="img-link" href="${largeImageURL}">
          <img
            class="gall-img"
            src="${webformatURL}"
            alt="${tags}"
        />
          <div class="stats-wrapper">
            <ul class="stats-list">
              <li class="stats-item">Views </br><span class="stats-number">${views}</span></li>
              <li class="stats-item">Likes </br><span class="stats-number">${likes}</span></li>
              <li class="stats-item">Comments </br><span class="stats-number">${comments}</span></li>
              <li class="stats-item">Downloads </br><span class="stats-number">${downloads}</span></li>
          </ul>
          </div>
        </a>
      </li>`
    )
    .join('');

  gallery.innerHTML += markup;

  lightbox.refresh();
}

export async function renderGallery(query, page) {
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
  } finally {
    hideLoader();
  }
}

export function clearGallery() {
  gallery.innerHTML = '';
}

// I'm using my own loader, not a library
export function showLoader() {
  loader.style.display = 'inline-block';
}

export function hideLoader() {
  loader.style.display = 'none';
}

export function showLoadMoreButton() {
  loadMoreBtn.style.display = 'block';
}

export function hideLoadMoreButton() {
  loadMoreBtn.style.display = 'none';
}
