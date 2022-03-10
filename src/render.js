const RENEDER_POSITION = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEFIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export {RENEDER_POSITION, renderTemplate};
