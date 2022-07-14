
<template>
  <v-btn class="button-margin" @click="onClick">
    <v-icon left> mdi-pencil </v-icon>
    <div>CREATE</div>
  </v-btn>
</template>


<script>
export default{
    name: 'PokemonCreate',
    methods: {
      onClick (){
        this.$emit("clickOnCreateButton")
        console.log("componente")
      }
    }
};

</script>

<style>
.button-margin {
  margin-bottom: 5px;
}

</style>