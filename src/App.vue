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

        <v-list-item
          link
          @click="
            dayCalDialog = true;
            drawer = false;
          "
        >
          <v-list-item-icon>
            <v-icon>mdi-calculator</v-icon>
          </v-list-item-icon>

          <v-list-item-content>計算每日代謝量</v-list-item-content>
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

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-toolbar-title>製作我的餐單</v-toolbar-title>

      <v-spacer />

      <v-btn text x-large @click="dayCalDialog = true">
        <v-icon left>mdi-calculator</v-icon>
        每日代謝量
      </v-btn>

      <template v-slot:extension>
        <v-tabs v-model="tab">
          <v-tab>
            所有食品
          </v-tab>

          <v-tab v-for="(kind, i) in foodKinds" :key="i">
            {{ kind }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main class="pb-15">
      <v-container fluid class="px-0">
        <v-card color="info" class="white--text mx-auto table-card">
          <v-card-title>
            <h2>{{ foodKinds[tab] }}</h2>

            <v-spacer />

            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="搜尋食品"
              single-line
              hide-details
              dark
            />
          </v-card-title>

          <v-data-table
            v-model="selected"
            show-select
            :headers="tableHeaders"
            :items="tableData"
            item-key="name"
            :items-per-page="15"
            :search="search"
          />
        </v-card>
      </v-container>
    </v-main>

    <v-footer class="info" dark>
      <v-container class="py-0">
        <v-row no-gutters class="px-5">
          <v-col cols="auto" class="d-flex align-center">
            卡路里計算器
          </v-col>
          <v-col class="d-flex align-center justify-center">
            <span> Developed by <b>Terry_CCI</b> @ 勞校電腦科組 </span>
          </v-col>
          <v-col cols="auto" class="d-flex align-center">
            2020.10
            <v-img src="./assets/70.svg" contain width="60px" class="ml-2" />
          </v-col>
        </v-row>
      </v-container>
    </v-footer>

    <v-bottom-navigation
      fixed
      background-color="accent"
      dark
      class="d-flex align-center subtitle-1"
      v-if="selected[0]"
    >
      <div class="d-flex align-center">
        <v-icon class="mr-2">mdi-check</v-icon>
        已選取 {{ selected.length }} 項食品
      </div>

      <v-spacer />

      <div class="d-flex align-center">
        <v-icon class="mr-2">mdi-fire</v-icon>
        共 {{ totalCalorie }} 卡路里
      </div>
    </v-bottom-navigation>

    <v-btn fab color="info" x-large fixed right bottom @click="dialog = true">
      <v-icon>mdi-chart-bar</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" max-width="70%">
      <v-card>
        <v-card-title class="py-5">
          <h3>
            我的餐單
          </h3>
        </v-card-title>

        <v-simple-table class="mx-10 text-left total-table elevation-2">
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
              <th class="action"></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(food, i) in selected" :key="i">
              <td>{{ food.name }}</td>
              <td>{{ food.quantity }}</td>
              <td>{{ food.calorie }}</td>
              <td class="text-center">
                <v-btn icon @click="deleteFood(i)" data-html2canvas-ignore>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>

            <tr class="accent white--text">
              <td>總計</td>
              <td>-</td>
              <td>{{ totalCalorie }}</td>
              <td></td>
            </tr>
          </tbody>
        </v-simple-table>

        <v-card-actions class="pa-6">
          <v-btn
            color="red"
            dark
            @click="
              selected = [];
              dialog = false;
            "
          >
            清空已選食品
          </v-btn>

          <v-spacer />

          <v-btn color="primary" @click="dialog = false">
            返回
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dayCalDialog" max-width="50%">
      <v-card>
        <v-card-title>每日代謝量</v-card-title>

        <v-container fluid>
          <v-row>
            <v-col cols="5" class="pl-8">
              <v-radio-group row label="性別" v-model="sex">
                <v-radio label="男" color="blue" value="m" />
                <v-radio label="女" color="pink" value="f" />
              </v-radio-group>
              <v-text-field
                label="身高"
                placeholder="請輸入身高"
                suffix="cm"
                type="number"
                min="0"
                v-model="height"
                :rules="[positiveNum]"
              />
              <v-text-field
                label="體重"
                placeholder="請輸入體重"
                suffix="kg"
                type="number"
                min="0"
                v-model="weight"
                :rules="[positiveNum]"
              />
              <v-text-field
                label="年齡"
                placeholder="請輸入年齡"
                suffix="歲"
                type="number"
                min="0"
                v-model="age"
                :rules="[positiveNum]"
              />
            </v-col>
            <v-col cols>
              <h2 class="mb-3">每日熱量需求</h2>
              <div
                v-for="(type, i) in dayCalResult"
                :key="i"
                class="subtitle-1"
              >
                {{ type.text }}:
                <b class="accent--text">{{
                  dayCalInputValid ? type.value : "--"
                }}</b>
                卡
              </div>
            </v-col>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer />

          <v-btn color="primary" @click="dayCalDialog = false">
            返回
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-overlay :value="saving" z-index="284">
      <v-progress-circular indeterminate color="accent" />
    </v-overlay>
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
  private saving = false;

  private search = "";

  private dayCalDialog = false;
  private readonly positiveNum = (v: string) =>
    !v || !v.length || Number(v) > 0;

  // dayCal stuffs
  private sex: "m" | "f" = "m";
  private height = "";
  private weight = "";
  private age = "";

  private readonly tableHeaders = [
    { text: "食品名稱", value: "name" },
    { text: "份量", value: "quantity", sortable: false, filterable: false },
    { text: "卡路里", value: "calorie", filterable: false }
  ];

  readonly foodData = foodData;

  get tableData() {
    if (this.tab > 0) {
      return this.foodData[this.foodKinds[this.tab]];
    } else {
      const allFood: Food[] = [];
      Object.values(this.foodData).forEach(food => {
        allFood.push(...food);
      });

      return allFood;
    }
  }

  get foodKinds() {
    return ["所有食品", ...Object.keys(this.foodData)];
  }

  get totalCalorie() {
    const calories = this.selected.map(food => food.calorie);
    return calories[0] ? calories.reduce((total, cur) => total + cur) : 0;
  }

  deleteFood(idx: number) {
    this.selected.splice(idx, 1);
  }

  get dayCalInputValid() {
    return !!Number(this.height) && !!Number(this.weight) && !!Number(this.age);
  }

  get dayCalResult() {
    const c = {
      m: {
        base: 66,
        w: 13.8,
        h: 5,
        a: -6.8
      },
      f: {
        base: 655,
        w: 9.6,
        h: 1.8,
        a: -4.7
      }
    }[this.sex];
    const types = [
      { text: "基礎代謝量", ratio: 1 },
      { text: "辦公室久坐型", ratio: 1.2 },
      { text: "輕度活動型", ratio: 1.375 },
      { text: "中度運動型", ratio: 1.55 },
      { text: "重度運動型", ratio: 1.725 },
      { text: "體力勞動型", ratio: 1.9 }
    ];

    return types.map(t => ({
      text: t.text,
      value: Math.floor(
        (c.base +
          Number(this.weight) * c.w +
          Number(this.height) * c.h +
          Number(this.age) * c.a) *
          t.ratio
      )
    }));
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

.v-card.table-card {
  width: 95%;
  @media (min-width: 1000px) {
    width: 85%;
  }
}

.v-bottom-navigation {
  $p: 11%;
  padding-left: $p;
  padding-right: $p;
}

.total-table {
  max-height: 95vh;
  overflow-y: auto;

  .action {
    width: 100px;
  }
}
</style>
