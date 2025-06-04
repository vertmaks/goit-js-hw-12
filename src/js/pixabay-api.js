import { showError } from './notifications';

export default function getImagesByQuery(query) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '50658945-6d505dd3b22d0da0b5135219d';
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    orientation: 'horizontal',
    safesearch: true,
    image_type: 'photo',
  });

  const url = `${BASE_URL}?${searchParams.toString()}`;

  return fetch(url);
}
