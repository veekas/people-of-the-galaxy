const axios = require('axios');

export const getPlanets = (pageNumber = 1) => {
  const url = `https://swapi.co/api/planets/?page=${pageNumber}`;
  return axios.get(url)
    .then(res => res.data.results)
    .catch(err => new Error(err.data));
};

export const getPlanetResidents = residentUrls => {
  // convert urls to promises
  const promiseMap = [];
  residentUrls.map(url => promiseMap.push(axios.get(url)));

  // resolve all promises
  return Promise.all(promiseMap)
    .then(results => {
      const residents = [];
      results.map(resident => residents.push(resident.data));
      return residents;
    })
    .catch(err => new Error(err.message, err.data));
};
