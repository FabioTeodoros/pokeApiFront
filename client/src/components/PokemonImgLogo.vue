<template>
  <v-container>
    <img :src="require('../assets/Pokemon.png')" class="pokemonLogo" />
  </v-container>
</template>

<script>
export default {
    name: 'PokemonImgLogo'
}
</script>

<style>
.pokemonLogo {
  background-size: 500px;
  height: 200px;
  width: 510px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>