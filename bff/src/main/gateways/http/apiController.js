const https = require('https');
const axios = require('axios');
const { all } = require('express/lib/application');

const basePath = `http://127.0.0.1:8080/pokemon`;

const api = {
  getDetail: async (req, res, model, id) => {
    const url = `${basePath}/${model}/${id}`;
    const response = await axios.get(url)
    .catch((error) => {
      console.log(error)
      res.status(500).send();
    })
    res.send(response.data);
  },

  insertPersonal: async (req, res) => {
    const url = `${basePath}/personal`;
    const response = await axios.post(url, req.body)
    .catch((error) => {
      console.log(error)
      res.status(500).send();
    })
    res.status(201).send(response.data);
  },

  deletePersonal: async (req, res, id) => {
    const url = `${basePath}/personal/${id}`;
    const response = await axios.delete(url)
    .catch((error) => {
      console.log(error)
      res.status(500).send();
    })
    res.send(response.data);
  },

 updatePersonal: async (req, res, id) => {
    const url = `${basePath}/personal/${id}`;
    const response = await axios.put(url, req.body)
    .catch((error) => {
      console.log(error)
      res.status(500).send();
    })
    res.send(response.data);
  },

  getPokemons: async (req, res, model) => {
    const url = `${basePath}/list?model=${model}`;
    const response = await axios.get(url)
    .catch((error) => {
      console.log(error)
      res.status(500).send();
    })
    res.send(response.data);
  }
}

module.exports = api;


