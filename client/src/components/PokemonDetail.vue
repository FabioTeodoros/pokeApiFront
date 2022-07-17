<template>
  <v-dialog v-model="showDialog" content-class="elevation-0" width="400px">
    <v-col class="pokemonImagePokedex">
      <v-card v-if="selectedPokemon" class="pokemonCard">
        <v-container>
          <img :src="selectedPokemon.url_image" class="pokemonImage" />
          <v-row>
            <v-col>
              <template v-if="selectedPokemon.model == 'personal'">
                <buttonUpdate
                  class="buttonUpdate"
                  :labelButton="edit"
                  :icon="icon"
                  @clickOnCreateButton="openModalUpdate"
                />
                <buttonUpdate
                  class="buttonTrash"
                  :labelButton="deleteButton"
                  :icon="iconTrash"
                  @clickOnCreateButton="showModalDelete"
                />
                <v-dialog
                  v-model="showDialogDelete"
                  persistent
                  max-width="600px"
                >
                  <PokemonAlert
                    @closeDelete="closeDelete"
                    @deletePokemonPersonalApproved="deletePokemonPersonal"
                    :namePokemon="selectedPokemon.name"
                  />
                </v-dialog>

                <v-dialog
                  v-model="showDialogUpdate"
                  persistent
                  max-width="600px"
                >
                  <PokemonModalUpdate
                    @clickCancelUpdateButton="closeModalUpdate"
                    @clickUpdatePersonal="changePokemonUpdate"
                    :selectedPokemon="selectedPokemon"
                  />
                </v-dialog>
              </template>
              <h1>{{ selectedPokemon.name }}</h1>
              <v-divider></v-divider>
              <span
                >Base Experience/Experiência
                {{ selectedPokemon.base_experience }} XP</span
              >
              <v-divider></v-divider>
              <span>Height/Altura {{ selectedPokemon.height }} m</span>
              <v-divider></v-divider>
              <span>Weight/Peso {{ selectedPokemon.weight }} kg</span>
              <v-divider></v-divider>
              <h3>Pokémon Types/Tipo</h3>
              <button
                class="buttonAbility"
                :type-color="type.type.name"
                v-for="type in selectedPokemon.types"
                :key="type.id"
              >
                {{ type.type.name }}
              </button>
              <v-divider></v-divider>
              <h3>Pokémon Abilities/Habilidades</h3>
              <v-chip
                outlined
                v-for="ability in selectedPokemon.abilities"
                :key="ability.slot"
                class="outlinedStyle black"
              >
                {{ ability.ability.name }}
              </v-chip>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-dialog>
</template>

<script>
import PokemonButton from "./PokemonButton.vue";
import PokemonModalUpdate from "./PokemonModalUpdate.vue";
import pokemonGateway from "../gateways/pokemon.gateway";
import Pokedex from "../views/Pokedex.vue";
import PokemonAlert from "./PokemonAlert.vue";

export default {
  name: "PokemonDetail",
  props: {
    selectedPokemon: Object,
    show: Boolean,
  },
  components: {
    buttonUpdate: PokemonButton,
    modalUpdate: PokemonModalUpdate,
    PokemonModalUpdate,
    Pokedex,
    PokemonAlert,
  },

  data: () => {
    return {
      edit: "EDIT",
      deleteButton: "DELETE",
      icon: "mdi-pencil",
      iconTrash: "mdi-delete",
      showDialogUpdate: false,
      showDialogDelete: false,
    };
  },

  methods: {
    openModalUpdate() {
      this.showDialogUpdate = true;
    },
    showModalDelete() {
      this.showDialogDelete = true;
    },
    deletePokemonPersonal() {
      pokemonGateway.deletePokemon(this.selectedPokemon.id);
      this.$emit("reloadPage");
      this.closeUpdate();
    },
    changePokemonUpdate(data) {
      pokemonGateway
        .updatePokemon(this.selectedPokemon.id, data)
        .then(() => {
          this.$emit("reloadPage");
          this.closeUpdate();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    closeModalUpdate() {
      this.showDialogUpdate = false;
    },
    closeUpdate() {
      this.showDialog = false;
    },
    closeDelete() {
      this.showDialogDelete = false;
    },
  },

  computed: {
    showDialog: {
      get() {
        return this.show;
      },
      set(value) {
        this.$emit("closeDialog", value);
      },
    },
  },
};
</script>

<style>
.pokemonImagePokedex {
  background-image: url("../assets/fundo.png");
  background-size: 382px;
}
.pokemonCard {
  text-align: center;
  margin-left: -2.8%;
  margin-bottom: -2.8%;
  margin-top: 80px;
}
.pokemonImage {
  margin-top: -13%;
  background: #ffcb37;
  font-size: 10px;
  border-radius: 50%;
  width: 23%;
  filter: drop-shadow(0 0.5em 0.5rem rgba(0, 0, 0, 0.5));
}
.pokemonVDlogFormat {
  width: 400px;
}
.buttonAbility {
  width: 60px;
  height: 30px;
  color: #ffffff;
  font-size: 12px;
  border-radius: 25px;
  margin-left: 10px;
  margin-bottom: 5px;
  font-weight: bold;
}
.outlinedStyle {
  font-weight: bold;
  margin-left: 10px;
  margin-bottom: 5px;
}
.buttonTrash {
  background: red !important;
  color: #ffffff !important;
  margin-left: 50px;
}
.buttonUpdate {
  background: rgb(185, 218, 207) !important;
}

button[type-color="fire"] {
  background-color: rgb(255, 0, 0);
}

button[type-color="water"] {
  background-color: rgb(34, 48, 178);
}

button[type-color="grass"] {
  background-color: rgb(15, 99, 26);
}

button[type-color="poison"] {
  background-color: rgb(99, 21, 163);
}

button[type-color="flying"] {
  background-color: rgb(88, 88, 88);
}

button[type-color="bug"] {
  background-color: rgb(94, 100, 62);
}

button[type-color="ground"] {
  background-color: rgb(68, 59, 49);
}

button[type-color="fairy"] {
  background-color: rgb(252, 6, 157);
}

button[type-color="psychic"] {
  background-color: rgb(252, 116, 53);
}

button[type-color="ice"] {
  background-color: rgb(132, 144, 255);
  color: black;
}

button[type-color="ghost"] {
  background-color: rgb(0, 0, 0);
  color: white;
}

button[type-color="dragon"] {
  background-color: rgb(97, 18, 7);
}

button[type-color="fighting"] {
  background-color: rgb(39, 88, 51);
}

button[type-color="rock"] {
  background-color: rgb(180, 180, 180);
  color: black;
}

button[type-color="normal"] {
  background-color: rgb(115, 247, 236);
  color: black;
}

button[type-color="electric"] {
  background-color: rgb(255, 238, 0);
  color: black;
}
</style>