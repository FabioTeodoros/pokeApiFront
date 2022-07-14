<template>
  <v-col class="pokemon-image-pokedex">
    <v-card v-if="selected_pokemon" class="pokemon-card">
      <v-container>
        <img :src="selected_pokemon.url_image" class="pokemon-image" />
        <v-row>
          <v-col>
            <h1>{{ selected_pokemon.name }}</h1>
            <v-divider></v-divider>
            <span>Id {{ selected_pokemon.id }}</span>
            <v-divider></v-divider>
            <span
              >Base Experience/Experiência
              {{ selected_pokemon.base_experience }} XP</span
            >
            <v-divider></v-divider>
            <span>Height/Altura {{ selected_pokemon.height }} m</span>
            <v-divider>class="my-4"</v-divider>
            <span>Weight/Peso {{ selected_pokemon.weight }} kg</span>
            <v-divider></v-divider>
            <h3>Pokémon Types/Tipo</h3>
            <button
              class="button-ability"
              :type-color="type.type.name"
              v-for="type in selected_pokemon.types"
              :key="type.id"
            >
              {{ type.type.name }}
            </button>
            <v-divider>class="my-4"</v-divider>
            <h3>Pokémon Abilities/Habilidades</h3>
            <v-chip
              outlined
              v-for="ability in selected_pokemon.abilities"
              :key="ability.slot"
              class="outlined-style black"
            >
              {{ ability.ability.name }}
            </v-chip>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "PokemonCard",

  show_pokemon(pokemon) {
    const id = this.get_id(pokemon);
    const model = pokemon.model;
    pokemonGateway
      .getPokemon(model, id)
      .then((response) => {
        this.selected_pokemon = response.data;
        this.selected_pokemon.url_image = pokemon.url_image;
        this.show_dialog = !this.show_dialog;
        console.log("Show Pokémons Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style>
.pokemon-image-pokedex {
  background-image: url("../assets/fundo.png");
  background-size: 382px;
}

.pokemon-card {
  text-align: center;
  margin-left: -2.8%;
  margin-bottom: -2.8%;
  margin-top: 80px;
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