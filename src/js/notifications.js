import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function showError(message) {
  iziToast.error({
    message: message,
    position: 'topRight',
    maxWidth: '400px',
  });
}
