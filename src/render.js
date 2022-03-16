import AbstractView from "./view/abstract-view";

const RENEDER_POSITION = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const render = (container, element, place) => {
  const parent = container instanceof AbstractView ? container.element : container;
  const child = element instanceof AbstractView ? element.element : element;
  switch (place) {
    case RENEDER_POSITION.BEFOREBEGIN:
      parent.before(child);
      break;
    case RENEDER_POSITION.AFTERBEGIN:
      parent.prepend(child);
      break;
    case RENEDER_POSITION.BEFOREEND:
      parent.append(child);
      break;
    case RENEDER_POSITION.AFTEREND:
      parent.after(child);
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export {RENEDER_POSITION, render, createElement};
