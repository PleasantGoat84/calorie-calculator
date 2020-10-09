<template>
  <v-app>
    <v-navigation-drawer app>
      <!-- -->
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon />

      <v-toolbar-title>製作我的餐單</v-toolbar-title>

      <template v-slot:extension>
        <v-tabs>
          <v-tab v-for="(kind, i) in foodKinds" :key="i">
            {{ kind }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
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
</style>
