/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { format } from 'date-fns';

export default class Ticket {
  constructor(id, name, status, created, description = '') {
    this.id = id;
    this.name = name;
    this.status = status;
    const date = new Date(created);
    date.toString() === 'Invalid Date'
      ? (this.created = created)
      : (this.created = format(new Date(created), 'dd.MM.yy HH:mm'));
    this.description = description;
  }

  createDOM() {
    this.ticketItemElement = document.createElement('li');
    this.ticketItemElement.setAttribute('data-id', this.id);
    this.ticketBasicElement = document.createElement('div');
    this.ticketFulfilledElement = document.createElement('div');
    this.ticketTextElement = document.createElement('p');
    this.ticketTextElement.textContent = this.name;
    this.ticketCreatedElement = document.createElement('p');
    this.ticketCreatedElement.textContent = this.created;
    this.ticketButtonActionWrapperElement = document.createElement('div');
    this.ticketEditButtonElement = document.createElement('button');
    this.ticketEditButtonElement.textContent = '✎';
    this.ticketRemoveButtonElement = document.createElement('button');
    this.ticketRemoveButtonElement.textContent = 'x';
    this.ticketDescriptionElement = document.createElement('p');
    this.ticketDescriptionElement.textContent = '';

    this.ticketItemElement.append(this.ticketBasicElement);
    this.ticketItemElement.append(this.ticketDescriptionElement);
    this.ticketBasicElement.append(this.ticketFulfilledElement);
    this.ticketBasicElement.append(this.ticketTextElement);
    this.ticketBasicElement.append(this.ticketCreatedElement);
    this.ticketBasicElement.append(this.ticketButtonActionWrapperElement);
    this.ticketButtonActionWrapperElement.append(this.ticketEditButtonElement);
    this.ticketButtonActionWrapperElement.append(
      this.ticketRemoveButtonElement
    );
  }

  addStyles() {
    this.ticketItemElement.classList.add('tickets-list__item');
    this.ticketBasicElement.classList.add('tickets-list__basic');
    this.ticketFulfilledElement.classList.add('tickets-list__fulfilled');
    if (this.status === true)
      this.ticketFulfilledElement.classList.add(
        'tickets-list__fulfilled_checked'
      );
    this.ticketTextElement.classList.add('tickets-list__text');
    this.ticketCreatedElement.classList.add('tickets-list__created');
    this.ticketButtonActionWrapperElement.classList.add(
      'button-action-wrapper'
    );
    this.ticketEditButtonElement.classList.add(
      'button',
      'button-action-wrapper__edit-button'
    );
    this.ticketRemoveButtonElement.classList.add(
      'button',
      'button-action-wrapper__remove-button'
    );
    this.ticketDescriptionElement.classList.add(
      'tickets-list__description',
      'visually-hidden'
    );
  }

  addToDOM() {
    this.createDOM();
    this.addStyles();
    return this.ticketItemElement;
  }

  showDescription() {
    this.ticketItemElement = document.querySelector(`[data-id="${this.id}"]`);
    if (this.ticketItemElement) {
      this.ticketDescriptionElement = this.ticketItemElement.querySelector(
        '.tickets-list__description'
      );
      if (this.ticketDescriptionElement) {
        this.ticketDescriptionElement.textContent = this.description;
        this.ticketDescriptionElement.classList.remove('visually-hidden');
      }
    }
  }

  update() {
    this.ticketItemElement = document.querySelector(`[data-id="${this.id}"]`);
    if (this.ticketItemElement) {
      this.ticketFulfilledElement = this.ticketItemElement.querySelector(
        '.tickets-list__fulfilled'
      );
      if (this.ticketFulfilledElement) {
        this.status === true
          ? this.ticketFulfilledElement.classList.add(
              'tickets-list__fulfilled_checked'
            )
          : this.ticketFulfilledElement.classList.remove(
              'tickets-list__fulfilled_checked'
            );
      }
      this.ticketTextElement = this.ticketItemElement.querySelector(
        '.tickets-list__text'
      );
      if (this.ticketTextElement)
        this.ticketTextElement.textContent = this.name;
      this.ticketDescriptionElement = this.ticketItemElement.querySelector(
        '.tickets-list__description'
      );
      if (this.ticketDescriptionElement)
        this.ticketDescriptionElement.textContent = this.description;
    }
  }

  remove() {
    this.ticketItemElement = document.querySelector(`[data-id="${this.id}"]`);
    if (this.ticketItemElement) this.ticketItemElement.remove();
  }
}
