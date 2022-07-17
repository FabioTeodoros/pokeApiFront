<template>
  <v-text-field
    @input="handleInput"
    label="Search about a pokemon using name or number"
    placeholder="Search Pokémons"
    solo
  ></v-text-field>
</template>

<script>
export default {
  prop: ["hidden"],
  model: {
    prop: "hidden",
    event: "blur",
  },
  methods: {
    handleInput(value) {
      this.$emit("blur", value);
    },
  },
};
</script>