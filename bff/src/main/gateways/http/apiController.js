const { default: axios } = require("axios")

const basePath = `http://127.0.0.1:8080/pokemon`;

const apiController = {
  getDetail: async (req, res, model, id) => {
    const url = `${basePath}/${model}/${id}`;
    try {
      const response = await axios.get(url)
      res.status(200).send(response.data)
    } catch (error) {
      res.status(404).send("This pokemon doesn't exist")
    }
  },

  insertPersonal: async (req, res) => {
    const url = `${basePath}/personal`;
    try {
      const response = await axios.post(url, req.body)
      res.status(201).send(response.data)
    } catch (error) {
      res.status(404).send("Error insert Pokemon");
    }
  },

  deletePersonal: async (req, res, id) => {
    const url = `${basePath}/personal/${id}`;
    try {
      const response = await axios.delete(url)
      res.status(200).send(response.data)
    } catch (error) {
      res.status(404).send("Error delete Pokemon");
    }
  },

  updatePersonal: async (req, res, id) => {
    const url = `${basePath}/personal/${id}`;
    try {
      const response = await axios.put(url, req.body)
      res.status(200).send(response.data)
    } catch (error) {
      res.status(404).send("Error update Pokemon");
    }
  },

  getPokemons: async (req, res, model) => {
    const url = `${basePath}/list?model=${model}`;
    try {
      const response = await axios.get(url)
      res.status(200).send(response.data)
    } catch (error) {
      res.status(404).send("Error get Pokemons");
    }
  }
}

module.exports = apiController;


