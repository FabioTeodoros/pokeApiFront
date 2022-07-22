const { default: pokemonGateway } = require("../../../src/gateways/pokemon.gateway");
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
    const api = "http://localhost:3000/pokemon/"
    const crud = "http://localhost:3000/"

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
            expect(axios.get).toHaveBeenCalledWith(api + "modelMock" + "/idMock");
        });
    });

    describe("When insertPokemon is called", () => {
        const pokemon = "pokemonMock"

        beforeEach(async () => {
            await pokemonGateway.insertPokemon(pokemon);
        });

        it("Then axios.get is called", () => {
            expect(axios.post).toHaveBeenCalledWith(crud + "insert", pokemon);
        });
    });

    describe("When deletePokemon is called", () => {
        const id = "idMock"

        beforeEach(async () => {
            await pokemonGateway.deletePokemon(id);
        });

        it("Then axios.get is called", () => {
            expect(axios.delete).toHaveBeenCalledWith(crud + "delete/" + id);
        });
    });

    describe("When updatePokemon is called", () => {
        const id = "idMock"
        const pokemon = "pokemonMock"

        beforeEach(async () => {
            await pokemonGateway.updatePokemon(id, pokemon);
        });

        it("Then axios.get is called", () => {
            expect(axios.put).toHaveBeenCalledWith(crud + "update/" + id, pokemon);
        });
    });
});
