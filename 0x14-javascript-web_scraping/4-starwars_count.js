#!/usr/bin/node

const request = require('request');
const apiUrl = process.argv[2];
const characterId = 18;

request(apiUrl, (error, response, body) => {
  if (error) {
    console.log(error);
  } else {
    const films = JSON.parse(body).results;
    const count = films.reduce((acc, film) => {
      return acc + film.characters.some(character => character.endsWith(`/${characterId}/`));
    }, 0);
    console.log(count);
  }
});
