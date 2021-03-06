import Noty from 'noty';

export const handlerErrors = ({ response: {data} }) => {
  new Noty({
    type: 'error',
    layout: 'topRight',
    theme: 'nest',
    text: Array.isArray(data.errors) ? Object.keys(data.errors).map((key) => (data.errors[key])).join(', ') : data.message,
    timeout: 5000,
  }).show();
};

export const showLoader = () => {
  document.body.classList.add('loader');
};

export const hideLoader = () => {
  document.body.classList.remove('loader');
};

export const overHiddenBody = () => {
  document.body.style.overflow = 'hidden';
};

export const overVissibleBody = () => {
  document.body.style.overflow = '';
};
