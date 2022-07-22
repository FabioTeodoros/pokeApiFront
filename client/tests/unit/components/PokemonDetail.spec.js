import { shallowMount } from "@vue/test-utils";
import PokemonDetail from "../../../src/components/PokemonDetail";
import pokemonGateway from '../../../src/gateways/pokemon.gateway.js';

//caminho do arquivo qe sera mockado e funcao

jest.mock('../../../src/gateways/pokemon.gateway.js', () => ({
    deletePokemon: jest.fn(),
    updatePokemon: jest.fn()
}));

const factory = () => shallowMount(PokemonDetail, {
    propsData: {
        selectedPokemon: {
            id: 'id',
            name: 'name',
            base_experience: 'base',
            height: 'height',
            weight: 'weight',
            types: [{ type: { name: 'nameType' } }],
            abilities: [{ ability: { name: 'nameAbility' } }]
        },
        show: false, //inicio o componenete como real
    },
    computed: {
        showDialog: {
            get() {
                return this.show;
            },
            set(value) {
                this.$emit("closeDialog", value);
            },
        },
    },
});

describe('Given PokemonDetail', () => {
    let wrapper;
    const value = true;

    describe('When Component initialization', () => {
        it('Then Should validate initial data', () => {
            expect(PokemonDetail.data()).toEqual({
                edit: "EDIT",
                deleteButton: "DELETE",
                icon: "mdi-pencil",
                iconTrash: "mdi-delete",
                showDialogUpdate: false,
                showDialogDelete: false,
            })
        });

        it('Then should validate name', () => {
            expect(PokemonDetail.name).toEqual('PokemonDetail');
        });

        it('Then should import component buttonUpdate', () => {
            expect(PokemonDetail.components.buttonUpdate).toBeDefined();
        });

        it('Then should import component PokemonModalUpdate', () => {
            expect(PokemonDetail.components.PokemonModalUpdate).toBeDefined(); //verifica se esta definido
        });

        it('Then should import component PokemonAlert', () => {
            expect(PokemonDetail.components.PokemonAlert).toBeDefined();
        });
    })

    describe('When Validate methods', () => {
        beforeEach(() => {
            jest.clearAllMocks();
            wrapper = factory();
        });

        describe('deletePokemonUpdate', () => {
            beforeEach(() => {
                pokemonGateway.deletePokemon.mockResolvedValue()
                wrapper.vm.deletePokemonPersonal()
            })

            it('Then changePokemonUpdate is called', () => {
                expect(pokemonGateway.deletePokemon).toHaveBeenCalledWith("id") //quando precisa validar parametros da funcao
            });

            it('Then reloadPage is emitted', () => {
                expect(wrapper.emitted('reloadPage')).toBeTruthy();
            });

            it('Then showDialog is called', () => {
                expect(wrapper.vm.showDialog).toBeFalsy() // verifica se é igual a ffalse igual ou toEquals
            });
        }),

            describe('changePokemonUpdate', () => {
                let pokemon
                beforeEach(() => {
                    pokemonGateway.updatePokemon.mockResolvedValue() //retorno da funcao
                    pokemon = {
                        id: 'id',
                        name: 'name',
                        base_experience: 'base',
                        height: 'height',
                        weight: 'weight',
                        types: [{ type: { name: 'nameType' } }],
                        abilities: [{ ability: { name: 'nameAbility' } }]
                    }
                    wrapper.vm.changePokemonUpdate(pokemon)
                });

                it('Then changePokemonUpdate is called', () => {
                    expect(pokemonGateway.updatePokemon).toHaveBeenCalledWith("id", pokemon) //quando precisa validar parametros da funcao
                });

                it('Then reloadPage is emitted', () => {
                    expect(wrapper.emitted('reloadPage')).toBeTruthy();
                });

                // it('Then', () => {
                //     expect(wrapper.vm.closeUpdate).toHaveBeenCalled() //verifica somente a chamada, vm instancia do objeto montado
                // });

                it('Then showDialog is called', () => {
                    expect(wrapper.vm.showDialog).toBeFalsy() // verifica se é igual a ffalse igual ou toEquals
                });
            }),
            // #componente.computed.showDialog

            describe('When Validate dialog methods', () => {

                it('Then openModalUpdate is called', () => {
                    wrapper.vm.openModalUpdate()
                    expect(wrapper.vm.showDialogUpdate).toBeTruthy()
                });

                it('Then showModalDelete is called', () => {
                    wrapper.vm.showModalDelete()
                    expect(wrapper.vm.showDialogDelete).toBeTruthy()
                });

                it('Then closeUpdate is called', () => {
                    wrapper.vm.closeUpdate()
                    expect(wrapper.vm.showDialog).toBeFalsy()
                });

                it('Then closeDelete is called', () => {
                    wrapper.vm.closeDelete()
                    expect(wrapper.vm.showDialogDelete).toBeFalsy()
                });

            }),

            describe('When Validate computed showDialog', () => {
                it('Then get is called', () => {
                    expect(wrapper.vm.showDialog).toBe(false)
                });

                it('Then set is emitted', () => {
                    expect(wrapper.emitted('closeDialog')).toBe();
                });
            })
    })

});