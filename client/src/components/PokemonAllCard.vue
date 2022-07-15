<template>
  <v-card class="cardPokemonSize" @click="onCards">
    <v-container>
      <v-row class="formatRow">
        <img :src="pokemon.url_image" class="pokemonImageSizeCard" />
      </v-row>
      <h2 class="textCenter">{{ get_name(pokemon) }}</h2>

    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "PokemonAllCard",
  props: {
    pokemon: Object,
  },

  data: () => {
    return {
      pokemons: [],
    };
  },

  methods: {
    onCards() {
      this.$emit("clickOnCards", this.pokemon.id, this.pokemon.model, this.pokemon.url_image);
    },
    get_id(pokemon) {
      return String(pokemon.id);
    },
    get_model(pokemon) {
      return String(pokemon.model);
    },
    get_name(pokemon) {
      return pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    },
  },
};
</script>

<style>
.cardPokemonSize {
  width: 200px;
}
.colunsPokemons {
  column-width: 331px;
}
.pokemonImageSizeCard {
  width: 70%;
  margin-top: 10px;
  margin-bottom: 10px;
}
.formatRow {
  justify-content: center;
  margin-top: 0px;
}
.textCenter {
  text-align: center;
}
</style>