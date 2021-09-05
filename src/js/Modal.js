/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { createTicket, editTicket, removeTicket } from './requests';
import ticketsListElement, { showError } from './general';

import Ticket from './Ticket';

export default class Modal {
  constructor(operation, title, data) {
    this.operation = operation;
    this.title = title;
    this.data = data;
    this.createDOM();
    this.addStyles();
    this.addListeners();
  }

  createDOM() {
    this.modalElement = document.createElement('div');
    this.formElement = document.createElement('form');
    this.formContentElement = document.createElement('div');
    this.formHeaderElement = document.createElement('div');
    this.formTitleElement = document.createElement('h4');
    this.formTitleElement.textContent = this.title;
    this.formBodyElement = document.createElement('div');
    switch (this.operation) {
      case 'add':
      case 'edit': {
        this.formLabelNameElement = document.createElement('label');
        this.formLabelNameElement.setAttribute('for', 'name');
        this.formLabelNameElement.textContent = 'Краткое описание';
        this.formInputNameElement = document.createElement('input');
        this.formInputNameElement.setAttribute('type', 'text');
        this.formInputNameElement.setAttribute('id', 'name');
        this.formInputNameElement.setAttribute('name', 'name');
        this.formInputNameElement.setAttribute('required', '');
        this.formInputNameElement.value = this.data.name;
        this.formLabelDescriptionElement = document.createElement('label');
        this.formLabelDescriptionElement.setAttribute('for', 'description');
        this.formLabelDescriptionElement.textContent = 'Подробное описание';
        this.formTextAreaDescriptionElement =
          document.createElement('textarea');
        this.formTextAreaDescriptionElement.setAttribute('id', 'description');
        this.formTextAreaDescriptionElement.setAttribute('name', 'description');
        this.formTextAreaDescriptionElement.setAttribute('rows', '3');
        this.formTextAreaDescriptionElement.value = this.data.description;

        this.formBodyElement.append(this.formLabelNameElement);
        this.formBodyElement.append(this.formInputNameElement);
        this.formBodyElement.append(this.formLabelDescriptionElement);
        this.formBodyElement.append(this.formTextAreaDescriptionElement);
        break;
      }
      case 'remove': {
        this.formTextElement = document.createElement('p');
        this.formTextElement.textContent =
          'Вы уверены, что хотите удалить тикет? Это действие необратимо.';
        this.formBodyElement.append(this.formTextElement);
        break;
      }
      default:
    }
    this.formFooterElement = document.createElement('div');
    this.formButtonsWrapperElement = document.createElement('div');
    this.formCancelButtonElement = document.createElement('button');
    this.formCancelButtonElement.textContent = 'Отмена';
    this.formOkButtonElement = document.createElement('button');
    this.formOkButtonElement.textContent = 'Ок';

    this.modalElement.append(this.formElement);
    this.formElement.append(this.formContentElement);
    this.formContentElement.append(this.formHeaderElement);
    this.formContentElement.append(this.formBodyElement);
    this.formContentElement.append(this.formFooterElement);
    this.formHeaderElement.append(this.formTitleElement);
    this.formFooterElement.append(this.formButtonsWrapperElement);
    this.formButtonsWrapperElement.append(this.formCancelButtonElement);
    this.formButtonsWrapperElement.append(this.formOkButtonElement);
  }

  addStyles() {
    this.modalElement.classList.add('modal');
    this.formElement.classList.add('modal-dialog');
    this.formContentElement.classList.add('modal-dialog__content');
    this.formHeaderElement.classList.add('modal-dialog__header');
    this.formTitleElement.classList.add('modal-dialog__title');
    this.formBodyElement.classList.add('modal-dialog__body');
    if (this.formLabelNameElement)
      this.formLabelNameElement.classList.add('modal-dialog__label');
    if (this.formLabelDescriptionElement)
      this.formLabelDescriptionElement.classList.add('modal-dialog__label');
    if (this.formInputNameElement)
      this.formInputNameElement.classList.add('modal-dialog__input');
    if (this.formTextAreaDescriptionElement)
      this.formTextAreaDescriptionElement.classList.add(
        'modal-dialog__textarea'
      );
    if (this.formTextElement)
      this.formTextElement.classList.add('modal-dialog__text');
    this.formFooterElement.classList.add('modal-dialog__footer');
    this.formButtonsWrapperElement.classList.add('modal-button-wrapper');
    this.formCancelButtonElement.classList.add(
      'button',
      'modal-button-wrapper__button'
    );
    this.formOkButtonElement.classList.add(
      'button',
      'modal-button-wrapper__button'
    );
  }

  addListeners() {
    this.formCancelButtonElement.addEventListener('click', (event) => {
      event.preventDefault();
      this.modalElement.remove(this);
    });

    this.formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      switch (this.operation) {
        case 'add': {
          const formData = new FormData();
          formData.append('name', this.formInputNameElement.value);
          formData.append(
            'description',
            this.formTextAreaDescriptionElement.value
          );
          createTicket(formData)
            .then((result) => {
              ticketsListElement.append(
                new Ticket(
                  result.id,
                  result.name,
                  result.status,
                  result.created
                ).addToDOM()
              );
            })
            .catch((e) => {
              showError(e.message);
            });
          break;
        }
        case 'remove': {
          removeTicket(this.data.id)
            .then((result) => {
              new Ticket(
                result.id,
                result.name,
                result.status,
                result.created
              ).remove();
            })
            .catch((e) => {
              showError(e.message);
            });
          break;
        }
        case 'edit': {
          const formData = new FormData();
          formData.append('id', this.data.id);
          formData.append('name', this.formInputNameElement.value);
          formData.append(
            'description',
            this.formTextAreaDescriptionElement.value
          );
          editTicket(formData)
            .then((result) => {
              new Ticket(
                result.id,
                result.name,
                result.status,
                result.created,
                result.description
              ).update();
            })
            .catch((e) => {
              showError(e.message);
            });
          break;
        }
        default:
      }
      this.modalElement.remove(this);
    });
  }

  show() {
    return this.modalElement;
  }
}
