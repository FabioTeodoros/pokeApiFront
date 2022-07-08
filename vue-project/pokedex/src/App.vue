<template>
  <v-app>
    <v-content>
      <v-container class="cards-background">
        <v-row>
          <v-container>
            <img :src="require('./assets/Pokemon.png')" class="pokemon-logo" />
            <h1 class="pokemon-text-logo">Pokémon Vue JS</h1>
          </v-container>
        </v-row>
        <v-text-field v-model="search" label="Search about a pokemon using name or pokedex number"
          placeholder="Search Pokémons" solo></v-text-field>
        <v-row>
          <v-col class="coluns-pokemons" v-for="pokemon in filtered_pokemons" :key="pokemon.name">
            <v-card class="card-pokemon-size" @click="show_pokemon(pokemon)">
              <v-container>
                <v-row class="mx-0 d-flex justify-center">
                  <img :src=pokemon.url_image class="pokemon-image-size-card" />
                </v-row>
                <h2 class="text-center">{{ get_name(pokemon) }}</h2>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-template>
      <v-dialog v-model="show_dialog" content-class="elevation-0" width="400">
        <v-col class="pokemon-image-pokedex">
          <v-card v-if="selected_pokemon" class="pokemon-card mt-15">
            <v-container>
              <img :src=selected_pokemon.url_image class="pokemon-image"/>
              <v-row>
                <v-col>
                  <h1>{{ selected_pokemon.name }}</h1>
                  <v-divider>class="my-4"</v-divider>
                  <span>Base Experience/Experiência {{ selected_pokemon.base_experience }} XP</span>
                  <v-divider>class="my-4"</v-divider>
                  <span>Height/Altura {{ selected_pokemon.height/10 }} m</span>
                  <v-divider>class="my-4"</v-divider>
                  <span>Weight/Peso {{ selected_pokemon.weight/10 }} kg</span>
                  <v-divider>class="my-4"</v-divider>
                  <h3>Pokémon Types/Tipo</h3>
                  <v-chip v-for="type in selected_pokemon.types" :key="type.slot" class="my-1 mr-3 mb-1">
                    {{ type.type.name }}
                  </v-chip>
                  <v-divider>class="my-4"</v-divider>
                  <h3>Pokémon Abilities/Habilidades</h3>
                  <v-chip outlined v-for="ability in selected_pokemon.abilities" :key="ability.slot"
                    class="my-1 mr-3 mb-10">
                    {{ ability.ability.name }}
                  </v-chip>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-dialog>
    </v-template>
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
      selected_pokemon: false,
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
      rgba(245, 54, 7, 0.829),
      rgba(240, 189, 150, 0.808)) no-repeat center center fixed !important;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover !important;
  background-position: center;
  min-height: 100px;
}

.cards-background {
  width: 800px;
}

.pokemon-image-pokedex {
  background-image: url('./assets/fundo.png');
  background-size: 382px;
}

.pokemon-logo {
  background-size: 500px;
  height: 200px;
  width: 510px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.pokemon-text-logo {
  font-size: 50px;
  text-align: center;
  color: rgb(255, 255, 255);
}

.pokemon-card {
  text-align: center;
  margin-left: -2.8%;
  margin-bottom: -2.8%;
}

.coluns-pokemons {
  column-width: 200px;
}

.card-pokemon-size {
  width: 500px;
}

.pokemon-image-size-card {
  width: 70%;
}

.pokemon-image {
  margin-top: -13%;
  background: #ffcb37;
  font-size: 10px;
  border-radius: 50%;
  width: 23%;
  filter: drop-shadow(0 0.5em 0.5rem rgba(0, 0, 0, 0.5));
}
</style>

