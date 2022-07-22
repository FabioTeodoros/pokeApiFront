import { mount } from '@vue/test-utils';
import PokemonAlert from "../../../src/components/PokemonAlert.vue";

describe('Given PokemonAlert', () => {
    let wrapper;

    beforeEach(() => {
        jest.clearAllMocks();
        wrapper = mount(PokemonAlert)
    })
    describe('When component initializes', () => {
        it("Then validate PokemonAlert name", () => {
            expect(PokemonAlert.name).toEqual('PokemonAlert');
        });
    })

    describe('When should emit event', () => {
        it('Then should emit event: deletePokemonPersonalApproved', async () => {
            const button = wrapper.find('[data-test-deletePokemon]');
            await button.trigger('click');
            expect(wrapper.emitted('deletePokemonPersonalApproved')).toBeTruthy();
        });

    })
})
