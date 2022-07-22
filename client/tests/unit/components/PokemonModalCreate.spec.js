import { shallowMount } from "@vue/test-utils";
import PokemonModalCreate from "../../../src/components/PokemonModalCreate.vue";

const factory = () => shallowMount(PokemonModalCreate, {
    props: {
        labelButton: {
            type: String,
        },
    },
});

describe('Given PokemonModalCreate', () => {
    let wrapper;

    describe('When Component initialization', () => {
        it('Then Should validate initial data', () => {
            expect(PokemonModalCreate.data()).toEqual({
                inputName: null,
                inputExp: null,
                inputWeight: null,
                inputHeight: null,
                inputAbility1: null,
                inputAbility2: null,
                inputType1: null,
                inputType2: null,
            })
        })

        it('Then should validate name', () => {
            expect(PokemonModalCreate.name).toEqual('PokemonModalCreate');
        });
    })

    describe('When Validate methods', () => {
        beforeEach(() => {
            const data = {
                name: "name",
                base_experience: "1",
                height: "1",
                weight: "1",
                abilities: [
                    { ability: { name: "ability1" } },
                    { ability: { name: "ability2" } },
                ],
                types: [
                    { type: { name: "type1" } },
                    { type: { name: "type2" } },
                ],
            }
        });

        it('Then changePokemonUpdate is called', () => {
            expect(PokemonModalCreate.onInsert()).toHaveBeenCalledWith() 
        });

    })
})


