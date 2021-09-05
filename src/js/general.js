/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const ticketsListElement = document.querySelector('.tickets-list');

export default ticketsListElement;
export const preloaderModalElement = document.querySelector('.preloader-modal');
const errorModalElement = document.querySelector('.error-modal');
const errorModalTextElement = document.querySelector('.error-modal__text');

export function getItemData(item) {
  const { id } = item.dataset;
  const textElement = item.querySelector('.tickets-list__text');
  const descriptionElement = item.querySelector('.tickets-list__description');
  const dateElement = item.querySelector('.tickets-list__created');
  const fulfilledElement = item.querySelector('.tickets-list__fulfilled');
  const fulfilledStatus = fulfilledElement.classList.contains(
    'tickets-list__fulfilled_checked'
  );
  return {
    id,
    name: textElement.textContent,
    description: descriptionElement.textContent,
    status: fulfilledStatus,
    created: dateElement.textContent,
  };
}

export function showError(text) {
  errorModalTextElement.textContent = text;
  errorModalElement.classList.remove('visually-hidden');
  setTimeout(() => {
    errorModalElement.classList.add('visually-hidden');
  }, 2000);
}
