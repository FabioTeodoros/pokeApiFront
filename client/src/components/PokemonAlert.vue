<template>
  <v-card class="cardFormat">
    <v-card-title class="colorBackGroundTitle">
      <span class="pokemonTitle">POKÉMON PERSONAL DELETE</span>
    </v-card-title>
    <v-spacer></v-spacer>
    <v-card-text class="cardFormatBody">
      <v-container>
        <v-row>
          <div class="pokemonQuestion">
            Do you really want to delete {{ namePokemon }}?
          </div>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class="buttonYes" @click="onDelete()">
        <div>Yes</div>
      </v-btn>
      <v-btn class="buttonNo" @click="onCancel()">
        <div>Cancel</div>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "PokemonAlert",

  props: {
    namePokemon: String,
  },

  methods: {
    onDelete() {
      this.$emit("deletePokemonPersonalApproved");
    },
    onCancel() {
      this.$emit("closeDelete");
    },
  },
};
</script>

<style>
.pokemonQuestion {
  margin-top: 20px;
  font-size: 25px;
  color: rgb(0, 0, 0);
  padding: 0 80px;
  display: flex;
}
.pokemonTitle {
  font-size: 13px;
  color: rgb(255, 255, 255);
  padding: 0 150px;
  max-height: 15px;
  align-items: center;
}
.buttonYes {
  text-align: center;
  background-color: rgb(0, 128, 0) !important;
  color: white !important;
  margin-right: 130px;
  margin-bottom: 20px;
}
.buttonNo {
  text-align: center;
  background-color: black !important;
  color: white !important;
  margin-right: 150px;
  margin-bottom: 20px;
}
.colorBackGroundTitle {
  background-color: rgb(150, 10, 10) !important;
  padding: 2px 25px 18px !important;
}
.cardFormat {
  border-radius: 15px 0px 15px 15px !important;
}
</style>