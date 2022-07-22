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
          :icon="icon"
        />
        <v-btn class="buttonTypePage" @click="typePage()">{{
          selectModel
        }}</v-btn>
        <v-dialog v-model="showDialogCrud" persistent max-width="600px">
          <PokemonModalCreate
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
            <PokemonCard @clickOnCards="showPokemon" :pokemon="pokemon" />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <template>
      <PokemonDetail
        @closeDialog="showDialog = $event"
        :selectedPokemon="selectedPokemon"
        :show="showDialog"
        @reloadPage="reloadPokemons"
      />
    </template>
  </v-app>
</template>

<script>
import pokemonGateway from "../gateways/pokemon.gateway";
import PokemonButton from "../components/PokemonButton.vue";
import PokemonImgLogo from "../components/PokemonImgLogo.vue";
import PokemonTextLogo from "../components/PokemonTextLogo.vue";
import PokemonModalCreate from "../components/PokemonModalCreate.vue";
import PokemonSearch from "../components/PokemonSearch.vue";
import PokemonCard from "../components/PokemonCard.vue";
import PokemonDetail from "../components/PokemonDetail.vue";

export default {
  name: "App",

  components: {
    PokemonButton,
    PokemonImgLogo,
    PokemonTextLogo,
    PokemonModalCreate,
    PokemonSearch,
    PokemonCard,
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
      icon: "mdi-pencil",
      selectModel: "all",
      count: 2,
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
          this.reloadPokemons();
          this.showDialogCrud = false;
        })
        .catch((error) => {
          console.log(error);
          this.showDialogCrud = false;
        });
    },
    showCreate() {
      this.showDialogCrud = true;
    },
    closeCreate() {
      this.showDialogCrud = false;
    },
    typePage() {
      switch (this.count) {
        case 1:
          this.selectModel = "all";
          this.count = 2;
          break;
        case 2:
          this.selectModel = "personal";
          this.count = 3;
          break;
        case 3:
          this.selectModel = "official";
          this.count = 1;
          break;
      }
      this.reloadPokemons();
    },
    reloadPokemons() {
      pokemonGateway
        .getPokemons(this.selectModel)
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
.buttonTypePage {
  margin-left: 5px;
  margin-bottom: 5px;
  background-color: rgb(0, 0, 0) !important;
  color: rgb(255, 255, 255) !important;
  min-width: 115px !important;
}
</style>

