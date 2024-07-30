#!/usr/bin/node

const request = require('request');
const movieId = process.argv[2];
const apiUrl = `https://swapi-api.alx-tools.com/api/films/${movieId}/`;

request(apiUrl, (error, response, body) => {
  if (error) {
    console.error(error);
  } else {
    const characters = JSON.parse(body).characters;
    const characterPromises = characters.map(characterUrl => {
      return new Promise((resolve, reject) => {
        request(characterUrl, (charError, charResponse, charBody) => {
          if (charError) {
            reject(charError);
          } else {
            resolve(JSON.parse(charBody).name);
          }
        });
      });
    });
    Promise.all(characterPromises)
      .then(names => names.forEach(name => console.log(name)))
      .catch(error => console.error(error));
  }
});
