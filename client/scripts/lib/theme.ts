const theme = <'light' | 'dark' | null>localStorage.getItem('theme');

if (theme === 'dark') {
  document.body.classList.add('dark');
  (<HTMLInputElement>document.querySelector('input[type="checkbox"]')).checked = true;
}

export const getTheme = () => {
  return <'light' | 'dark' | null>localStorage.getItem('theme') || 'light';
}