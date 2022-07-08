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
          <v-btn class="pokemon-text-logo button-margin" @click="show_pokemon(pokemon)" >
          <v-icon left>
            mdi-pencil
          </v-icon>
          Edit
        </v-btn>
        <v-text-field v-model="search" label="Search about a pokemon using name or number" placeholder="Search Pokémons"
          solo></v-text-field>   
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
      <v-dialog v-model="show_dialog" content-class="elevation-0" width="400px">
        <v-col class="pokemon-image-pokedex">
          <v-card v-if="selected_pokemon" class="pokemon-card">
            <v-container>
              <img :src=selected_pokemon.url_image class="pokemon-image" />
              <v-row>
                <v-col>
                  <h1>{{ selected_pokemon.name }}</h1>
                  <v-divider></v-divider>
                  <span>Base Experience/Experiência {{ selected_pokemon.base_experience }} XP</span>
                  <v-divider></v-divider>
                  <span>Height/Altura {{ selected_pokemon.height / 10 }} m</span>
                  <v-divider>class="my-4"</v-divider>
                  <span>Weight/Peso {{ selected_pokemon.weight / 10 }} kg</span>
                  <v-divider></v-divider>
                  <h3>Pokémon Types/Tipo</h3>
                  <button class="button-ability" :type-color="type.type.name" v-for="type in selected_pokemon.types">
                    {{ type.type.name }}
                  </button>
                  <v-divider>class="my-4"</v-divider>
                  <h3>Pokémon Abilities/Habilidades</h3>
                  <v-chip outlined v-for="ability in selected_pokemon.abilities" :key="ability.slot"
                    class="outlined-style black">
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
      return String(pokemon.id)
    },
    get_model(pokemon) {
      return String(pokemon.model)
    },
    get_name(pokemon) {
      return pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    },
    show_pokemon(pokemon) {
      const id = this.get_id(pokemon);
      const model = pokemon.model;
      axios
        .get(`http://127.0.0.1:3000/pokemon/${model}/${id}`)
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
        return items.name.includes(this.search) || items.id.includes(this.search);
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
  width: 700px;
}

.button-ability {
  width: 60px;
  height: 30px;
  color: #ffffff;
  font-size: 12px;
  border-radius: 25px;
  margin-left: 10px;
  margin-bottom: 5px;
  font-weight: bold;
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
  margin-top: 80px;
}

.coluns-pokemons {
  column-width: 331px;
}

.button-crud {
  margin-left: -150px;
 
}

.outlined-style {
  font-weight: bold;
  margin-left: 10px;
  margin-bottom: 5px;
}

.card-pokemon-size {
  width: 200px;
}

.vdialog-width {
  width: 34%;
}

.button-margin {
  margin-bottom: 5px;
}

.pokemon-image-size-card {
  width: 70%;
  margin-top: 10px;
  margin-bottom: 10px;
}

.pokemon-image {
  margin-top: -13%;
  background: #ffcb37;
  font-size: 10px;
  border-radius: 50%;
  width: 23%;
  filter: drop-shadow(0 0.5em 0.5rem rgba(0, 0, 0, 0.5));
}


button[type-color="fire"] {
  background-color: rgb(255, 0, 0);
}

button[type-color="water"] {
  background-color: rgb(34, 48, 178);
}

button[type-color="grass"] {
  background-color: rgb(15, 99, 26);
}

button[type-color="poison"] {
  background-color: rgb(99, 21, 163);
}

button[type-color="flying"] {
  background-color: rgb(88, 88, 88);
}

button[type-color="bug"] {
  background-color: rgb(94, 100, 62);
}

button[type-color="ground"] {
  background-color: rgb(68, 59, 49);
}

button[type-color="fairy"] {
  background-color: rgb(252, 6, 157);
}

button[type-color="psychic"] {
  background-color: rgb(252, 116, 53);
}

button[type-color="ice"] {
  background-color: rgb(132, 144, 255);
  color: black;
}

button[type-color="ghost"] {
  background-color: rgb(0, 0, 0);
  color: white;
}

button[type-color="dragon"] {
  background-color: rgb(97, 18, 7);
}

button[type-color="fighting"] {
  background-color: rgb(39, 88, 51);
}

button[type-color="rock"] {
  background-color: rgb(180, 180, 180);
  color: black;
}

button[type-color="normal"] {
  background-color: rgb(115, 247, 236);
  color: black;
}

button[type-color="electric"] {
  background-color: rgb(255, 238, 0);
  color: black;
}
</style>

