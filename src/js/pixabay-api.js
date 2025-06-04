import { showError } from './notifications';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '50658945-6d505dd3b22d0da0b5135219d';
const PER_PAGE = 15;

export default async function getImagesByQuery(query, page = 1) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    orientation: 'horizontal',
    safesearch: true,
    image_type: 'photo',
    per_page: PER_PAGE,
    page,
  });

  const url = `${BASE_URL}?${searchParams.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('response.status');
    }
    return await response.json();
  } catch (error) {
    showError('Error fetching images');
    throw error;
  }
}
