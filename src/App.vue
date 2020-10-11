<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" temporary>
      <!-- -->
    </v-navigation-drawer>

    <v-app-bar app color="primary darken-2" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-toolbar-title>製作我的餐單</v-toolbar-title>

      <template v-slot:extension>
        <v-tabs v-model="tab">
          <v-tab v-for="(kind, i) in foodKinds" :key="i">
            {{ kind }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid class="px-0">
        <!-- <v-tabs-items v-model="tab">
          <v-tab-item v-for="(kind, i) in foodKinds" :key="i">
            <v-card color="info" class="white--text mx-auto">
              <v-card-title>
                <h2>{{ kind }}</h2>
              </v-card-title>

              <v-data-table
                v-model="selected[i]"
                class="rounded-0"
                show-select
                :headers="tableHeaders"
                :items="foodData[kind]"
                item-key="name"
                :items-per-page="15"
              />
            </v-card>
          </v-tab-item>
        </v-tabs-items> -->

        <v-card color="info" class="white--text mx-auto">
          <v-card-title>
            <h2>{{ foodKinds[tab] }}</h2>
          </v-card-title>

          <v-data-table
            v-model="selected"
            class="rounded-0"
            show-select
            :headers="tableHeaders"
            :items="foodData[foodKinds[tab]]"
            item-key="name"
            :items-per-page="15"
          />
        </v-card>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import foodData from "./data/food";

@Component
export default class CalorieCalc extends Vue {
  private tab = 0;
  private drawer = false;
  private selected = [];

  private readonly tableHeaders = [
    { text: "食品名稱", value: "name" },
    { text: "份量", value: "quantity" },
    { text: "卡路里", value: "calorie" }
  ];

  readonly foodData = foodData;
  get foodKinds() {
    return Object.keys(this.foodData);
  }

  created() {
    //
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.v-card {
  width: 95%;
  @media (min-width: 1000px) {
    width: 85%;
  }
}
</style>
