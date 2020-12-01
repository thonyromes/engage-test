<template>
  <div class="card">
    <h3 class="card__title">Add Catalogue Item</h3>
    <div class="card__body">
      <div class="heading-field">
        <router-link :to="{ name: 'List' }" class="btn btn--sm btn--default"
          >View Catalogue</router-link
        >
      </div>
      <form @submit.prevent="addItem">
        <ul v-if="errors" class="error">
          <li v-for="error in errors" :key="error" class="error__text">
            {{ error }}
          </li>
        </ul>
        <div class="input-field">
          <label for="description" class="input-field__label"
            >Description</label
          >
          <textarea
            name="description"
            id="description"
            class="input-field__input"
            v-model="description"
          ></textarea>
        </div>
        <div class="upload-field">
          <label for="uploads" class="upload-field__label">Upload Image</label>
          <input
            type="file"
            class="input-field__input"
            @change="onFileChange"
            accept="image/*"
          />
        </div>
        <div class="upload-preview">
          <img
            :src="imageSrc"
            alt="preview"
            class="img-thumb"
            v-show="imageSrc"
          />
        </div>
        <div class="btn-field">
          <button class="btn btn--primary" :disabled="isAdding" type="submit">
            Add to Catalogue
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { mapGetters, mapMutations } from "vuex";

const createItem = (description, image) => ({
  item: {
    id: uuidv4(),
    description,
    image,
  },
});

export default {
  name: "CatalogueCreate",
  data() {
    return {
      description: "",
      image: null,
      imageSrc: null,
      isAdding: false,
      errors: [],

      // for edits
      routeId: "",
      catalogueItem: null,
    };
  },

  computed: {
    ...mapGetters(["getCatalogueById"]),

    getItem() {
      this.catalogueItem = this.getCatalogueById(this.routeId);
    },

    isItemExist() {
      return this.catalogueItem ? true : false;
    },

    getRouteId() {
      this.routeId = this.$route.params.id;
    },

    createImageThumb() {
      const reader = new FileReader();

      reader.readAsDataURL(this.catalogueItem.image);

      reader.onload = (e) => {
        this.imageSrc = e.target.result;
      };
    },
  },

  methods: {
    ...mapMutations(["addToCatalogue"]),

    addItem(e) {
      const asynFun = async () => {
        this.isAdding = true;
        this.errors = [];

        try {
          if (!this.description) {
            this.errors.push("Description is required");
          }
          if (!this.imageSrc) {
            this.errors.push("Image is required");
          }

          if (!this.description || !this.imageSrc) {
            return;
          }

          await this.addToCatalogue(createItem(this.description, this.image));

          await ((this.description = ""),
          (this.image = null),
          (this.imageSrc = null),
          e.target.reset());

          await alert("Item Added");
        } catch (err) {
          console.log(err);
        } finally {
          await (this.isAdding = false);
        }
      };

      asynFun();
    },

    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;

      if (!files.length) return;

      this.image = files[0];

      this.createImage(files[0]);
    },

    createImage(file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (e) => {
        this.imageSrc = e.target.result;
      };
    },
  },

  created() {
    const asyncFun = async () => {
      try {
        await this.getRouteId;
        await this.getItem;
        if (!this.isItemExist) {
          return;
        }
        await this.createImageThumb;
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

.input-field {
  padding: 0.5rem 1rem;

  textarea {
    resize: none;
    min-height: 5rem;
  }

  &__label {
    font-weight: 600;
    width: 100%;
  }

  &__input {
    border: 1px solid fade-out($border-color, 0.8);
    width: 100%;
    border-radius: 0.25rem;
    padding: 0.5rem;
    @include transition(box-shadow);

    &:focus {
      outline: none;
      box-shadow: $input-shadow;
    }
  }
}

.upload-field {
  padding: 0.5rem 1rem;

  &__label {
    font-weight: 600;
    width: 100%;
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

  &[disabled] {
    opacity: 0.5;
  }
}

.upload-preview {
  padding: 0.75rem;
}

.img {
  &-thumb {
    height: 5rem;
  }
}

.error {
  list-style: none;
  padding: 0.5rem;
  margin: 0;

  &__text {
    color: red;
    font-size: 0.85rem;
    font-weight: 500;
  }
}
</style>