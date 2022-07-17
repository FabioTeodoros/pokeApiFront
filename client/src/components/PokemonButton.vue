<template>
  <v-btn class="buttonMargin" @click="onClick">
    <v-icon left> {{ icon }} </v-icon>
    <div>{{ labelButton }}</div>
  </v-btn>
</template>

<script>
export default {
  name: "PokemonButton",
  props: {
    labelButton: String,
    icon: String,
  },
  methods: {
    onClick() {
      this.$emit("clickOnCreateButton");
    },
  },
};
</script>

<style>
.buttonMargin {
  margin-bottom: 5px;
}
</style>