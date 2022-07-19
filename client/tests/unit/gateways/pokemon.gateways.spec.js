const { default: pokemonGateway } = require("/home/fabiots/Área de Trabalho/pokemonApiFront/pokeApiFront/client/src/gateways/pokemon.gateway.js");
const { default: axios } = require("axios");

jest.spyOn(axios, "get");
jest.spyOn(axios, "post");
jest.spyOn(axios, "delete");
jest.spyOn(axios, "put");

axios.get = jest.fn();
axios.post = jest.fn();
axios.delete = jest.fn();
axios.put = jest.fn();

describe("Given pokemon.gateway", () => {
  const api = "http://localhost:3000/pokemon/";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("When getPokemons is called", () => {
    const model = "modelMock"

    beforeEach(async () => {
      await pokemonGateway.getPokemons(model);
    });

    it("Then axios.get is called", () => {
      expect(axios.get).toHaveBeenCalledWith(api + model);
    });
  });

  describe("When getPokemon is called", () => {
    const model = "modelMock"
    const id = "idMock";

    beforeEach(async () => {
      await pokemonGateway.getPokemon(model, id);
    });

    it("Then axios.get is called", () => {
      expect(axios.get).toHaveBeenCalledWith(api + "modelMock" + "idMock");
    });
  });
});
