<template>
  <div class="card">
    <h3 class="card__title">Item Details</h3>
    <div class="card__body">
      <div class="heading-field">
        <router-link :to="{ name: 'List' }" class="btn btn--sm btn--default"
          >View Catalogue List</router-link
        >
      </div>
      <div class="list-field">
        <div class="catalogue-view" v-if="isItemExist">
          <div class="align-center">
            <img
              :src="imageSrc"
              alt="image"
              class="catalogue-view__image"
              :style="{ width: catalogueItem.img.imageWidth + 'px' }"
            />
          </div>
          <p
            class="catalogue-view__desc"
            :style="{
              color: catalogueItem.desc.textColor,
              fontSize: catalogueItem.desc.fontSize + 'px',
            }"
          >
            {{ catalogueItem.desc.description }}
          </p>
        </div>
        <div v-else>
          <p>No such Catalogue item! {{ catalogueItem }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CatalogueView",

  data() {
    return {
      routeId: "",
      catalogueItem: null,
      imageSrc: null,
    };
  },

  computed: {
    ...mapGetters(["getCatalogueById"]),

    getRouteId() {
      this.routeId = this.$route.params.id;
    },

    getItem() {
      this.catalogueItem = this.getCatalogueById(this.routeId);
    },

    isItemExist() {
      return !!this.catalogueItem;
    },
  },

  methods: {
    createImage(file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (e) => {
        this.imageSrc = e.target.result;
      };
    },

    goto404() {
      this.$router.push("/not-found");
    },
  },

  created() {
    try {
      this.getRouteId;
      this.getItem;
      if (!this.isItemExist) {
        this.goto404();
        return;
      }
      this.createImage(this.catalogueItem.img.image);
    } catch (err) {
      console.log(err);
    }
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
}

.list-field {
  padding: 0.5rem;
}

.catalogue {
  &-view {
    padding: 0.5rem;

    &__image {
      max-width: 100%;
      width: 15rem;
    }

    &__desc {
      margin-top: 0.5rem;
    }
  }
}

.align-center {
  text-align: center;
}
</style>