import axios from "axios";

const api = "http://localhost:3000/pokemon/";
const crud = "http://localhost:3000/"

const pokemonGateway = {
  async getPokemons(model) {
    return await axios.get(api + model);
  },
  async getPokemon(model, id) {
    return await axios.get(api + model + "/" + id);
  },
  async insertPokemon(pokemon) {
    return await axios.post(crud + "insert", pokemon);
  },
  async deletePokemon(id) {
    return await axios.delete(crud + "delete/" + id);
  },
  async updatePokemon(id, pokemon) {
    return await axios.put(crud + "update/" + id, pokemon);
  },
};

export default pokemonGateway;