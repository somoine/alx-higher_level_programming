#!/usr/bin/node

const request = require('request');
const url = process.argv[2];
const characterId = 18;

request(url, (error, response, body) => {
  if (error) {
    console.log(error);
  } else {
    const films = JSON.parse(body).results;
    const count = films.reduce((acc, film) => {
      return acc + (film.characters.includes(`https://swapi-api.alx-tools.com/api/people/${characterId}/`) ? 1 : 0);
    }, 0);
    console.log(count);
  }
});
