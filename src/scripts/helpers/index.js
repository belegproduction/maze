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
