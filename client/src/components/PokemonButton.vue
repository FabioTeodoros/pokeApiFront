<template>
  <v-btn class="buttonMargin" @click="onClick" data-test-createButton>
    <v-icon left> {{ icon }} </v-icon>
    <div>{{ labelButton }}</div>
  </v-btn>
</template>

<script>
export default {
  name: "PokemonButton",
  props: {
    labelButton: {
      type: String,
    },
    icon: {
      type: String,
    },
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