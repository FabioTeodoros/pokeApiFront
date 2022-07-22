import { mount } from '@vue/test-utils';
import PokemonButton from "../../../src/components/PokemonButton.vue";

describe('PokemonButton', () => {
    let wrapper;

    beforeEach(() => {
        jest.clearAllMocks();
        wrapper = mount(PokemonButton, {
            propsData: {
                labelButton: 'create',
                icon: 'mdi-pencil',
            }
        });
    });

    describe('Given PokemonButton', () => {
        describe('When component initializes', () => {
            it("Then validate PokemonButton name", () => {
                expect(PokemonButton.name).toEqual('PokemonButton');
            });
            it('Then validate prop labelButton', () => {
                expect(PokemonButton.props.labelButton).toEqual({ type: String });
            });
            it('Then validate prop icon', () => {
                expect(PokemonButton.props.icon).toEqual({ type: String });
            });
        })

        describe('When should emit event', () => {
            it('Then should emit event: clickOnCreateButton', async () => {
                const button = wrapper.find('[data-test-createButton]');
                await button.trigger('click');
                expect(wrapper.emitted('clickOnCreateButton')).toBeTruthy();
            });

        })
    })
})