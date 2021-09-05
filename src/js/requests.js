/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { preloaderModalElement } from './general';

// const SERVER_URL = 'https://ahj7-http-backend.herokuapp.com';
// const SERVER_URL = 'http://localhost:7070';
const { SERVER_URL } = process.env;
// console.log(SERVER_URL);

async function fetchData(url, opts) {
  preloaderModalElement.classList.remove('visually-hidden');
  try {
    const response = await fetch(url, opts);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    preloaderModalElement.classList.add('visually-hidden');
    return data;
  } catch (e) {
    preloaderModalElement.classList.add('visually-hidden');
    throw new Error(e.message);
  }
}

export async function getAllTickets() {
  return fetchData(`${SERVER_URL}?method=allTickets`, {
    method: 'GET',
  });
}

export async function getTicket(id) {
  return fetchData(`${SERVER_URL}?method=ticketById&id=${id}`, {
    method: 'GET',
  });
}

export async function setTicketStatus(id, status) {
  return fetchData(
    `${SERVER_URL}?method=ticketSetStatus&id=${id}&status=${status}`,
    {
      method: 'PATCH',
    }
  );
}

export async function createTicket(data) {
  return fetchData(`${SERVER_URL}?method=createTicket`, {
    method: 'POST',
    body: data,
  });
}

export async function removeTicket(id) {
  return fetchData(`${SERVER_URL}?method=removeTicket&id=${id}`, {
    method: 'DELETE',
  });
}

export async function editTicket(data) {
  return fetchData(`${SERVER_URL}?method=editTicket`, {
    method: 'PATCH',
    body: data,
  });
}
