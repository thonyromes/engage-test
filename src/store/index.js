import { createStore } from 'vuex'

const store = createStore({
  state: { 
      catalogue: [
        // {id: $, description: $, image: $}
      ]
  },

  getters: {
    getCatalogueLength(state) {
      const tempCatalogue = state.catalogue;

      return tempCatalogue.length;
    },

    getCatalogue(state) {
      const tempCatalogue = state.catalogue;

      return tempCatalogue;
    },

    getCatalogueById: (state) => (id) => {
      const tempCatalogue = state.catalogue;

      return tempCatalogue.find(item => item.id === id)
    }
  },

  mutations: {
    addToCatalogue(state, payload) {
      const tempCatalogue = state.catalogue;

      tempCatalogue.push(payload.item);

      state.catalogue = tempCatalogue;
    },

    deleteItemById(state, id) {
      const tempCatalogue = state.catalogue;

      state.catalogue = tempCatalogue.filter(item => item.id !== id);
    }
  }

})

export default store;