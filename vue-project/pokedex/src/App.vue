<template>
  <v-app>
    <v-content>
      <v-container style="width: 800px">
        <v-row>
          <v-container>
            <img alt="Pokemon logo" src="./assets/Pokemon.png" class="my-3" height="200">
            <h1 class="text-center white--text mb-3" style="font-size: 3rem">Pokémon Vue JS</h1>
          </v-container>
        </v-row>
        <v-text-field v-model="search" label="Search about a pokemon using name or pokedex number"
          placeholder="Search Pokémons" solo></v-text-field>
        <v-row>
          <v-col align="center" cols="4" v-for="pokemon in filtered_pokemons" :key="pokemon.name">
            <v-card width="550" @click="show_pokemon(pokemon)">
              <v-container>
                <v-row class="mx-0 d-flex justify-center">
                  <img :src=pokemon.url_image width="70%" />
                </v-row>
                <h2 class="text-center">{{ get_name(pokemon) }}</h2>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-dialog v-model="show_dialog" width="400">
      <v-card v-if="selected_pokemon" align="center">
        <v-container>
          <v-row class="d-flex align-center">
            <v-col align="center" cols="5">
              <img :src=selected_pokemon.url_image width="75%" class="my-3" />
            </v-col>
            <v-col cols="12">
              <h1>{{ selected_pokemon.name }}</h1>
              <v-divider>class="my-4"</v-divider>
              <span>Base Experience/Experiência {{ selected_pokemon.base_experience }} XP</span>
              <v-divider>class="my-4"</v-divider>
              <span>Height/Altura {{ selected_pokemon.height / 10 }} m</span>
              <v-divider>class="my-4"</v-divider>
              <span>Weight/Peso {{ selected_pokemon.weight / 10 }} kg</span>
              <v-divider>class="my-4"</v-divider>
              <h3>Pokémon Types/Tipo</h3>
              <v-divider>class="my-4"</v-divider>
              <v-chip v-for="type in selected_pokemon.types" :key="type.slot" class="mr-4">
                {{ type.type.name }}
              </v-chip>
              <v-divider>class="my-4"</v-divider>
               <h3>Pokémon Abilities/Habilidades</h3>
              <v-chip outlined v-for="ability in selected_pokemon.abilities" :key="ability.slot" class="mr-4">
                {{ ability.ability.name }}
              </v-chip>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import axios from 'axios';
export default {
  name: 'App',

  components: {},

  data: () => {
    return {
      pokemons: [],
      search: "",
      show_dialog: false,
      selected_pokemon: null,
    };
  },

  mounted() {
    axios
      .get("http://127.0.0.1:3000/pokemon/all")
      .then((response) => {
        this.pokemons = response.data.results;
      });
  },
  methods: {
    get_id(pokemon) {
      return Number(pokemon.id)
    },
    get_name(pokemon) {
      return pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    },
    show_pokemon(pokemon) {
      const id = this.get_id(pokemon);
      axios
        .get(`http://127.0.0.1:3000/pokemon/official/${id}`)
        .then((response) => {
          this.selected_pokemon = response.data;
          this.selected_pokemon.url_image = pokemon.url_image;
          this.show_dialog = !this.show_dialog;
        });
    },
  },
  computed: {
    filtered_pokemons() {
      return this.pokemons.filter((items) => {
        return items.name.includes(this.search);
      });
    },
  },
};
</script>
<style>
#app {
  background: linear-gradient(to bottom right,
      rgba(218, 74, 38, 0.829),
      rgba(231, 132, 55, 0.808)) no-repeat center center fixed !important;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover !important;
  background-position: center;
  min-height: 100vh;
}
</style>