<template>
  <v-card class="colorBackGround">
    <v-card-title>
      <span class="text-h5">POKÉMON PERSONAL CREATE</span>
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
          <v-col class="pokemonCrud">
            <v-select
              :items="['', 'fire', 'water', 'grass', 'normal']"
              label="Type 1"
              v-model="inputType1"
            >
            </v-select>
          </v-col>
          <v-col class="pokemonCrud">
            <v-select
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
      <v-btn class="buttonCrudInsert" @click="onInsert">
        <div>Insert</div>
      </v-btn>
      <v-btn class="buttonCrudCancel" @click="onCancel">
        <div>Cancel</div>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "PokemonModalCreate",
  props: {
    labelButton: {
     type: String,
    },
  },

  data() {
    return {
      inputName: null,
      inputExp: null,
      inputWeight: null,
      inputHeight: null,
      inputAbility1: null,
      inputAbility2: null,
      inputType1: null,
      inputType2: null,
    };
  },

  methods: {
    onInsert() {
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
      this.$emit("clickInsertPersonal", data);
      this.clearText();
    },
    onCancel() {
      this.$emit("clickCancelButton");
      this.clearText();
    },
    clearText() {
      this.inputName = "";
      this.inputExp = "";
      this.inputWeight = "";
      this.inputHeight = "";
      this.inputAbility1 = "";
      this.inputAbility2 = "";
      this.inputType1 = "";
      this.inputType2 = "";
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
.buttonCrudInsert {
  text-align: center;
  background-color: green !important;
  color: white !important;
}
.buttonCrudCancel {
  text-align: center;
  background-color: black !important;
  color: white !important;
}
.colorBackGround {
  background-color: rgb(209, 201, 201) !important;
}
</style>