import { createStore } from 'vuex';

const store = createStore({
  state: {
    catalogue: [],
  },

  getters: {
    getCatalogueLength(state) {
      return state.catalogue.length;
    },

    getCatalogue(state) {
      return state.catalogue;
    },

    getCatalogueById: (state) => (id) => {
      return state.catalogue.find((item) => item.id === id);
    },
  },

  mutations: {
    addToCatalogue(state, payload) {
      const tempCatalogue = [...state.catalogue];

      tempCatalogue.push(payload.item);

      state.catalogue = tempCatalogue;
    },

    deleteItemById(state, id) {
      const tempCatalogue = [...state.catalogue];

      state.catalogue = tempCatalogue.filter((item) => item.id !== id);
    },

    updateInCatalogue(state, payload) {
      const tempCatalogue = state.catalogue.map((val) =>
        val.id === payload.item.id ? { ...payload.item } : val,
      );

      state.catalogue = tempCatalogue;
    },
  },
});

export default store;
