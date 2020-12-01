<template>
  <div class="card">
    <h3 class="card__title">Catalogue List</h3>
    <div class="card__body">
      <div class="heading-field">
        <router-link :to="{ name: 'Home' }" class="btn btn--sm btn--default"
          >Add Catalogue Item</router-link
        >
      </div>
      <div class="list-field">
        <ul class="catalogue" v-if="getLength">
          <li
            v-for="(item, index) in catalogue"
            :key="item.id"
            class="catalogue-list"
          >
            <router-link
              :to="{ name: 'Details', params: { id: item.id } }"
              class="catalogue-item"
              title="View"
            >
              <img
                :src="imageSrc[index]"
                alt="image"
                class="catalogue-item__image"
              />
              <p class="catalogue-item__desc">
                {{ item.description }}
              </p>
            </router-link>
            <div class="operations">
              <router-link
                :to="{ name: 'Details', params: { id: item.id } }"
                class="btn btn--sm btn--primary mx-1"
                >View</router-link
              >
              <router-link to="#" class="btn btn--sm btn--default mx-1"
                >Edit</router-link
              >
              <button
                type="button"
                class="btn btn--sm btn--danger mx-1"
                @click="deleteItem(item.id)"
              >
                Delete
              </button>
            </div>
          </li>
        </ul>
        <div v-else>
          <p>Catalogue is empty!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "CatalogueList",

  data() {
    return {
      catalogue: [],
      imageSrc: [],
    };
  },

  computed: {
    ...mapGetters(["getCatalogue"]),

    getLength() {
      return this.catalogue.length;
    },

    getList() {
      this.catalogue = this.getCatalogue;
    },

    createImages() {
      this.catalogue.map((val, i) => {
        const reader = new FileReader();

        reader.readAsDataURL(val.image);

        reader.onload = (e) => {
          this.imageSrc[i] = e.target.result;
        };
      });
    },
  },

  methods: {
    ...mapMutations(["deleteItemById"]),

    deleteItem(id) {
      this.deleteItemById(id);
      this.getList;
      this.createImages;
      alert("item deleted");
    },
  },

  created() {
    this.getList;
    this.createImages;
  },
};
</script>

<style lang="scss" scoped>
// variables
$border-color: #232333;
$text-color: #232333;
$color-primary: #333355;
$shadow-color: #232333;
$card-bg: white;
$card-title-bg: black;

$input-shadow: 0 0 0 0.1rem fade-out($shadow-color, 0.5);

$box-shadow: 0 8px 6px 0 fade-out($border-color, 0.95);

// mixins
@mixin transition($prop) {
  transition: $prop 0.25s ease-in-out;
}

.card {
  background-color: $card-bg;
  box-shadow: 3px 3px 6px 0 fade-out($border-color, 0.95);
  border-radius: 0.25rem;

  &__title {
    background-color: fade-out($card-title-bg, 0.99);
    border-bottom: 1px solid fade-out($border-color, 0.9);
    font-weight: 500;
    margin-bottom: 0;
    padding: 0.5rem;
    text-align: center;
  }
}

.btn-field {
  padding: 0.5rem 1rem;
  text-align: center;
}

.heading-field {
  padding: 0.5rem 1rem;
  text-align: right;
}

.btn {
  border-radius: 0.25rem;
  display: inline-block;
  padding: 0.5rem 1rem;
  font-weight: 500;
  border: none;
  @include transition(box-shadow);

  &:hover,
  &:focus,
  &:active {
    outline: none;
    box-shadow: $input-shadow;
    text-decoration: none;
  }

  &--sm {
    font-size: 0.75rem;
    padding: 0.35rem 0.75rem;
  }
  &--primary {
    background-color: $color-primary;
    color: white;
  }
  &--default {
    color: $text-color;
    background-color: fade-out(black, 0.95);
  }
  &--danger {
    color: white;
    background-color: tomato;
  }
}

.list-field {
  padding: 0.5rem;
}

.catalogue {
  list-style: none;
  padding: 0;
  margin: 0;

  &-list {
    padding: 0.5rem;
    border-bottom: 1px solid fade-out($border-color, 0.95);
    margin-bottom: 0.5rem;

    @include transition(box-shadow);

    &:hover {
      box-shadow: $box-shadow;
    }
  }

  &-item {
    color: $text-color;
    display: flex;
    text-decoration: none;

    &__image {
      width: 5rem;
    }
    &__desc {
      margin-left: 0.5rem;
      font-size: 0.85rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}

.operations {
  padding: 0.5rem;
  text-align: right;
}

.mx-1 {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}
</style>