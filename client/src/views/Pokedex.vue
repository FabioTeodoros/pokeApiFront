<template>
  <v-app>
    <v-content>
      <v-container class="cardsBackground">
        <v-row>
          <v-container>
            <PokemonImgLogo />
            <PokemonTextLogo />
          </v-container>
        </v-row>
        <PokemonButton
          @clickOnCreateButton="showCreate"
          :labelButton="create"
        />
        <v-dialog v-model="showDialogCrud" persistent max-width="600px">
          <PokemonModalCrud
            @clickCancelButton="closeCreate"
            @clickInsertPersonal="insertPersonal"
          />
        </v-dialog>
        <PokemonSearch v-model="search" />
        <v-row>
          <v-col
            class="coluns-pokemons"
            v-for="pokemon in filteredPokemons"
            :key="pokemon.name"
          >
            <PokemonAllCard @clickOnCards="showPokemon" :pokemon="pokemon" />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <template>
      <PokemonDetail
        @closeDialog="showDialog = $event"
        :pokemons="pokemons"
        :selected-pokemon="selectedPokemon"
        :show="showDialog"
      />
    </template>
  </v-app>
</template>

<script>
import pokemonGateway from "../gateways/pokemon.gateway";
import PokemonButton from "../components/PokemonButton.vue";
import PokemonImgLogo from "../components/PokemonImgLogo.vue";
import PokemonTextLogo from "../components/PokemonTextLogo.vue";
import PokemonModalCrud from "../components/PokemonModalCrud.vue";
import PokemonSearch from "../components/PokemonSearch.vue";
import PokemonAllCard from "../components/PokemonAllCard.vue";
import PokemonDetail from "../components/PokemonDetail.vue";

export default {
  name: "App",

  components: {
    PokemonButton,
    PokemonImgLogo,
    PokemonTextLogo,
    PokemonModalCrud,
    PokemonSearch,
    PokemonAllCard,
    PokemonDetail,
  },

  data: () => {
    return {
      pokemons: [],
      search: "",
      showDialog: false,
      showDialogCrud: false,
      selectedPokemon: undefined,
      create: "CREATE",
    };
  },

  mounted() {
    this.reloadPokemons();
  },

  methods: {
    showPokemon(id, model, url_image) {
      pokemonGateway
        .getPokemon(model, id)
        .then((response) => {
          this.selectedPokemon = response.data;
          this.selectedPokemon.url_image = url_image;
          this.selectedPokemon.model = model;
          this.showDialog = true;
          console.log("Show Pokémons Successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    insertPersonal(data) {
      pokemonGateway
        .insertPokemon(data)
        .then(() => {
          console.log("Create Pokémon Successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deletePersonal(inputId) {
      pokemonGateway.deletePokemon(inputId);
    },

    updatePersonal(
      inputId,
      inputName,
      inputExp,
      inputHeight,
      inputWeight,
      inputAbility1,
      inputAbility2,
      inputType1,
      inputType2
    ) {
      const data = {
        name: inputName,
        base_experience: inputExp,
        height: inputHeight,
        weight: inputWeight,
        abilities: [
          { ability: { name: inputAbility1 } },
          { ability: { name: inputAbility2 } },
        ],
        types: [{ type: { name: inputType1 }, type: { name: inputType2 } }],
      };
      pokemonGateway
        .updatePokemon(inputId, data)
        .then(() => {
          console.log("Update Pokémon Successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showCreate() {
      this.showDialogCrud = true;
    },
    closeCreate() {
      this.showDialogCrud = false;
    },
    reloadPokemons() {
      pokemonGateway
        .getPokemons()
        .then((response) => {
          this.pokemons = response.data.results;
          console.log("Get all Pokémons Succes");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  computed: {
    filteredPokemons() {
      return this.pokemons.filter((items) => {
        return (
          items.name.includes(this.search) || items.id.includes(this.search)
        );
      });
    },
  },
};
</script>

<style>
#app {
  background: linear-gradient(
      to bottom right,
      rgba(245, 54, 7, 0.829),
      rgba(240, 189, 150, 0.808)
    )
    no-repeat center center fixed !important;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover !important;
  background-position: center;
  min-height: 100px;
}

.cardsBackground {
  width: 700px;
}
</style>

