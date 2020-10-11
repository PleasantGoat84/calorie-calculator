<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" temporary>
      <v-list-item class="py-5 accent">
        <v-list-item-content>
          <v-list-item-title class="text-h5 white--text">
            製作我的餐單!
          </v-list-item-title>
          <v-list-item-subtitle class="white--text">
            卡路里計算器
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav class="text-left">
        <v-subheader class="px-2">操作與功能</v-subheader>

        <v-list-item
          link
          @click="
            dialog = true;
            drawer = false;
          "
        >
          <v-list-item-icon>
            <v-icon>mdi-chart-bar</v-icon>
          </v-list-item-icon>

          <v-list-item-content>查看統計結果</v-list-item-content>
        </v-list-item>

        <v-divider />
        <v-subheader class="px-2">食品類別</v-subheader>

        <v-list-item
          v-for="(kind, i) in foodKinds"
          :key="i"
          link
          @click="
            tab = i;
            drawer = false;
          "
        >
          <v-list-item-content>
            <v-list-item-title>{{ kind }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
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

    <v-main class="pb-15">
      <v-container fluid class="px-0">
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

    <v-bottom-navigation
      fixed
      background-color="accent"
      dark
      class="d-flex align-center subtitle-1"
      v-if="selected[0]"
    >
      <div>已選取 {{ selected.length }} 項食品</div>
      <v-spacer />
      <div>共 {{ totalCalorie }} 卡路里</div>
    </v-bottom-navigation>

    <v-btn fab color="info" x-large fixed right bottom @click="dialog = true">
      <v-icon>mdi-chart-bar</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" max-width="60%">
      <v-card>
        <v-card-title>
          我的餐單
        </v-card-title>

        <v-simple-table class="mx-10 text-left">
          <thead>
            <tr>
              <th>
                食品名稱
              </th>
              <th>
                份量
              </th>
              <th>
                卡路里
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(food, i) in selected" :key="i">
              <td>{{ food.name }}</td>
              <td>{{ food.quantity }}</td>
              <td>{{ food.calorie }}</td>
            </tr>

            <tr class="accent white--text">
              <td>總計</td>
              <td>-</td>
              <td>{{ totalCalorie }}</td>
            </tr>
          </tbody>
        </v-simple-table>

        <v-card-actions class="mt-5 pb-5">
          <v-spacer />

          <v-btn color="primary">
            複製資料
          </v-btn>

          <v-btn color="primary" text @click="dialog = false">
            返回
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import foodData, { Food } from "./data/food";

@Component
export default class CalorieCalc extends Vue {
  private dialog = false;
  private tab = 0;
  private drawer = false;
  private selected: Food[] = [];

  private readonly tableHeaders = [
    { text: "食品名稱", value: "name" },
    { text: "份量", value: "quantity" },
    { text: "卡路里", value: "calorie" }
  ];

  readonly foodData = foodData;
  get foodKinds() {
    return Object.keys(this.foodData);
  }

  get totalCalorie() {
    const calories = this.selected.map(food => food.calorie);
    return calories[1] ? calories.reduce((total, cur) => total + cur) : 0;
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

.v-bottom-navigation {
  $p: 13%;
  padding-left: $p;
  padding-right: $p;
}
</style>
