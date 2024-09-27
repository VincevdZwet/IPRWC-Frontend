import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200",

    env: {
      apiUrl: 'http://127.0.0.1:8000',
    },

    setupNodeEvents(on, config) {
      // require("cypress-localstorage-commands/plugin")(on, config);
      // return config;
    },
  },

  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.ts",
  },
});
