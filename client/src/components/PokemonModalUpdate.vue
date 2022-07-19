<template>
  <v-card class="colorBackGround">
    <v-card-title>
      <span class="text-h5">POKÉMON PERSONAL UPDATE</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col class="pokemonCrud">
            <v-text-field label="Name" v-model="inputName"></v-text-field>
          </v-col>
          <v-col class="pokemonCrud">
            <v-text-field label="EXP" v-model="inputExp"></v-text-field>
          </v-col>
          <v-col class="pokemonCrud">
            <v-text-field label="Height" v-model="inputHeight"></v-text-field>
          </v-col>
          <v-col class="pokemonCrud">
            <v-text-field label="Weight" v-model="inputWeight"></v-text-field>
          </v-col>
          <v-col class="pokemonCrud">
            <v-text-field
              label="Ability 1"
              v-model="inputAbility1"
            ></v-text-field>
          </v-col>
          <v-col class="pokemonCrud">
            <v-text-field
              label="Ability 2"
              v-model="inputAbility2"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-select
              class="pokemonCrud"
              :items="['', 'fire', 'water', 'grass', 'normal']"
              label="Type 1"
              v-model="inputType1"
            >
            </v-select>
          </v-col>
          <v-col>
            <v-select
              class="pokemonCrud"
              :items="['', 'fire', 'water', 'grass', 'normal']"
              label="Type 2"
              v-model="inputType2"
            >
            </v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class="buttonCrudUpdate" @click="onUpdate()">
        <div>Update</div>
      </v-btn>
      <v-btn class="buttonCrudCancel" @click="onCancel()">
        <div>Cancel</div>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import pokemonGateway from "../gateways/pokemon.gateway";

components: {
  pokemonGateway;
}

export default {
  name: "PokemonModalCrud",
  props: {
    selectedPokemon: Object,
  },

  data() {
    return {
      inputName: this.selectedPokemon.name,
      inputExp: this.selectedPokemon.base_experience,
      inputWeight: this.selectedPokemon.weight,
      inputHeight: this.selectedPokemon.height,
      inputAbility1: this.selectedPokemon.abilities[0].ability.name,
      inputAbility2: this.selectedPokemon.abilities[1].ability.name,
      inputType1: this.selectedPokemon.types[0].type.name,
      inputType2: this.selectedPokemon.types[1].type.name,
    };
  },

  methods: {
    onUpdate() {
      const data = {
        name: this.inputName,
        base_experience: this.inputExp,
        height: this.inputHeight,
        weight: this.inputWeight,
        abilities: [
          { ability: { name: this.inputAbility1 } },
          { ability: { name: this.inputAbility2 } },
        ],
        types: [
          { type: { name: this.inputType1 } },
          { type: { name: this.inputType2 } },
        ],
      };
      this.$emit("clickUpdatePersonal", data);
    },
    onCancel() {
      this.$emit("clickCancelUpdateButton");
    },
  },
};
</script>

<style>
.pokemonCrud {
  min-width: 100px;
  margin-top: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
}
.pokemonId {
  width: 500px;
}
.buttonCrudUpdate {
  text-align: center;
  background-color: green !important;
  color: white !important;
}
.buttonCrudCancel {
  text-align: center;
  background-color: black !important;
  color: white !important;
}
.buttonCrudDelete {
  text-align: center;
  background-color: red !important;
  color: white !important;
}
.colorBackGround {
  background-color: rgb(175, 184, 178) !important;
}
</style>