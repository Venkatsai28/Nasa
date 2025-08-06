const API_KEY = 'DEMO_KEY'; // Replace with your actual API key
const BASE_URL = 'https://api.nasa.gov/planetary/apod';

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const imageContainer = document.getElementById('current-image-container');
const historyList = document.getElementById('search-history');

document.addEventListener('DOMContentLoaded', () => {
  getCurrentImageOfTheDay();
  addSearchToHistory();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const date = input.value;
  getImageOfTheDay(date);
  saveSearch(date);
  addSearchToHistory();
});

function getCurrentImageOfTheDay() {
  const currentDate = new Date().toISOString().split("T")[0];
  getImageOfTheDay(currentDate);
}

function getImageOfTheDay(date) {
  const url = `${BASE_URL}?date=${date}&api_key=${API_KEY}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayImage(data);
    })
    .catch(err => {
      imageContainer.innerHTML = `<p>Error fetching image: ${err.message}</p>`;
    });
}

function displayImage(data) {
  imageContainer.innerHTML = `
    <h3>${data.title}</h3>
    <img src="${data.url}" alt="${data.title}">
    <p>${data.explanation}</p>
  `;
}

function saveSearch(date) {
  let searches = JSON.parse(localStorage.getItem('searches')) || [];
  if (!searches.includes(date)) {
    searches.push(date);
    localStorage.setItem('searches', JSON.stringify(searches));
  }
}

function addSearchToHistory() {
  let searches = JSON.parse(localStorage.getItem('searches')) || [];
  historyList.innerHTML = '';
  searches.forEach(date => {
    const li = document.createElement('li');
    li.textContent = date;
    li.addEventListener('click', () => {
      getImageOfTheDay(date);
    });
    historyList.appendChild(li);
  });
}

