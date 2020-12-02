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
        <ul class="catalogue" v-if="getCatalogueLength > 0">
          <li v-for="item in catalogue" :key="item.id" class="catalogue-list">
            <div class="ouput">
              <router-link
                :to="{ name: 'Details', params: { id: item.id } }"
                class="catalogue-item"
                title="View"
              >
                <img
                  :src="imageSrc[item.id]"
                  alt="image"
                  class="catalogue-item__image"
                />
                <p
                  class="catalogue-item__desc"
                  :style="{
                    color: item.desc.textColor,
                  }"
                >
                  {{ item.desc.description }}
                </p>
              </router-link>
            </div>
            <div class="operations">
              <router-link
                :to="{ name: 'Details', params: { id: item.id } }"
                class="btn btn--sm btn--primary mx-1"
                >View</router-link
              >
              <router-link
                :to="{ name: 'Home', params: { id: item.id } }"
                class="btn btn--sm btn--default mx-1"
                >Edit</router-link
              >
              <button
                type="button"
                class="btn btn--sm btn--danger mx-1"
                :disabled="isDeleting"
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
      imageSrc: {},
      isDeleting: false,
    };
  },

  computed: {
    ...mapGetters(["getCatalogue", "getCatalogueLength"]),

    getCatalogueList() {
      this.catalogue = this.getCatalogue;
    },

    createImages() {
      this.imageSrc = {};

      this.catalogue.map((val) => {
        const reader = new FileReader();

        reader.readAsDataURL(val.img.image);

        reader.onload = (e) => {
          this.imageSrc[val.id] = e.target.result;
        };
      });
    },
  },

  methods: {
    ...mapMutations(["deleteItemById"]),

    deleteItem(id) {
      const asyncFun = async () => {
        this.isDeleting = true;
        try {
          await this.deleteItemById(id);
          await this.getCatalogueList;
          await this.createImages;
          await alert("item deleted");
        } catch (err) {
          console.log(err);
        } finally {
          await (this.isDeleting = false);
        }
      };

      asyncFun();
    },
  },

  created() {
    const asyncFun = async () => {
      try {
        await this.getCatalogueList;
        await this.createImages;
      } catch (err) {
        console.log(err);
      }
    };

    asyncFun();
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

img {
  max-width: 100%;
  height: auto;
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
    display: flex;
    @include transition(box-shadow);

    &:hover {
      box-shadow: $box-shadow;
    }

    .output {
      flex: 1 1 auto;
      width: auto;
    }

    .operations {
      flex: 0 0 6rem;
      width: 6rem;
      margin-left: auto;
      text-align: center;

      .btn {
        display: inline-block;
        width: 100%;
        margin: 0.15rem 0;
      }
    }
  }

  &-item {
    color: $text-color;
    display: flex;
    text-decoration: none;

    &__image {
      width: 6rem;
      flex: 0 0 6rem;
      height: 6rem;
      border-radius: 0.25rem;
      object-fit: cover;
      object-position: top;
    }
    &__desc {
      width: auto;
      flex: 1 1 auto;
      margin-left: 0.5rem;
      font-size: 0.85rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}

.mx-1 {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}
</style>