import Vue from "vue";
import Vuetify from "vuetify/lib";
import zhHant from "vuetify/src/locale/zh-Hant";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: "#6dd7be",
        secondary: "#ffbd19",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2d669b",
        success: "#4CAF50",
        warning: "#FFC107"
      }
    }
  },
  lang: {
    locales: { zhHant },
    current: "zhHant"
  }
});
