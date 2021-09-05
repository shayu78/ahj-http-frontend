import { getAllTickets, getTicket, setTicketStatus } from './requests';
import ticketsListElement, { getItemData, showError } from './general';

import Modal from './Modal';
import Ticket from './Ticket';

function initApps() {
  const button = document.querySelector('.button');
  button.addEventListener('click', () => {
    const modal = new Modal('add', 'Добавить тикет', {
      id: null,
      name: '',
      description: '',
      status: false,
      created: '',
    });
    document.body.append(modal.show());
  });

  ticketsListElement.addEventListener('click', (event) => {
    const item = event.target.closest('.tickets-list__item');
    if (item) {
      const itemData = getItemData(item);
      const classes = event.target.classList;
      if (classes.contains('tickets-list__fulfilled')) {
        setTicketStatus(itemData.id, !itemData.status)
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
      } else if (classes.contains('button-action-wrapper__edit-button')) {
        const modal = new Modal('edit', 'Изменить тикет', itemData);
        document.body.append(modal.show());
      } else if (classes.contains('button-action-wrapper__remove-button')) {
        const modal = new Modal('remove', 'Удалить тикет', itemData);
        document.body.append(modal.show());
      } else {
        const ticketItemElement = document.querySelector(
          `[data-id="${itemData.id}"]`
        );
        if (ticketItemElement) {
          const ticketDescriptionElement = ticketItemElement.querySelector(
            '.tickets-list__description'
          );
          if (
            ticketDescriptionElement &&
            ticketDescriptionElement.classList.contains('visually-hidden')
          ) {
            getTicket(itemData.id)
              .then((result) => {
                new Ticket(
                  result.id,
                  result.name,
                  result.status,
                  result.created,
                  result.description
                ).showDescription();
              })
              .catch((e) => {
                showError(e.message);
              });
          } else ticketDescriptionElement.classList.add('visually-hidden');
        }
      }
    }
  });

  getAllTickets()
    .then((result) => {
      result.map((value) => {
        return ticketsListElement.append(
          new Ticket(
            value.id,
            value.name,
            value.status,
            value.created
          ).addToDOM()
        );
      });
    })
    .catch((e) => {
      showError(e.message);
    });
}

initApps();
