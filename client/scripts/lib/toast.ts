import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css'

export const error = (text: string) => {
  (<any>Toastify({
    text,
    duration: 3000, 
    newWindow: true,
    gravity: 'top', // `top` or `bottom`
    position: 'center', // `left`, `center` or `right`
    backgroundColor: '#F56565',
    stopOnFocus: true, // Prevents dismissing of toast on hover
  })).showToast();
};

export const success = (text: string) => {
  (<any>Toastify({
    text,
    duration: 3000, 
    newWindow: true,
    gravity: 'top', // `top` or `bottom`
    position: 'center', // `left`, `center` or `right`
    backgroundColor: '#48BB78',
  })).showToast();
};