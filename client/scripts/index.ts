import '../styles/global.scss';
import '../styles/style.scss';

document.getElementsByTagName('form')[0].addEventListener('submit', async e => {
  e.preventDefault();

  const inputElement = <HTMLInputElement>document.getElementById('username');
  const username = inputElement.value;

});
