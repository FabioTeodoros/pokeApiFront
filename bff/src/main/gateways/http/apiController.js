const { default: axios } = require("axios")

const basePath = `http://127.0.0.1:8080/pokemon`;

const apiController = {
  getDetail: async (req, res, model, id) => {
    const url = `${basePath}/${model}/${id}`;
    try {
      const response = await axios.get(url)
      res.status(200).send(response.data)
    } catch (error) {
      res.status(404).send("This pokemon doesn't exist");
    } 
  },

  insertPersonal: async (req, res) => {
    const url = `${basePath}/personal`;
    const response = await axios.post(url, req.body)
      .catch(() => {
        res.status(404).send("Error insert Pokemon");
      })
      res.status(201).send(response.data)
  },

  deletePersonal: async (req, res, id) => {
    const url = `${basePath}/personal/${id}`;
    const response = await axios.delete(url)
      .catch(() => {
        res.status(404).send("Error delete Pokemon");
      })
      res.status(200).send(response.data)
  },

  updatePersonal: async (req, res, id) => {
    const url = `${basePath}/personal/${id}`;
    const response = await axios.put(url, req.body)
      .catch(() => {
        res.status(404).send("Error update Pokemon");
      })
      res.status(200).send(response.data)
  },

  getPokemons: async (req, res, model) => {
    const url = `${basePath}/list?model=${model}`;
    const response = await axios.get(url)
      .catch(() => {
        res.status(404).send("Error get Pokemons");
      })
      res.status(200).send(response.data)
  }
}

module.exports = apiController;


