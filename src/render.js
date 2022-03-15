const RENEDER_POSITION = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const render = (container, element, place) => {
  switch (place) {
    case RENEDER_POSITION.BEFOREBEGIN:
      container.before(element);
      break;
    case RENEDER_POSITION.AFTERBEGIN:
      container.prepend(element);
      break;
    case RENEDER_POSITION.BEFOREEND:
      container.append(element);
      break;
    case RENEDER_POSITION.AFTEREND:
      container.after(element);
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export {RENEDER_POSITION, render, createElement};
