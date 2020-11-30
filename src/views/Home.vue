<template>
  <div class="wrapper">
    <div class="box box--center">
      <catalogue-create />
    </div>
  </div>
</template>

<script>
import CatalogueCreate from "../components/CatalogueCreate.vue";

export default {
  name: "Home",
  components: {
    CatalogueCreate,
  },
};
</script>

<style lang="scss" scoped>
.box {
  max-width: 50rem;
  width: 90%;

  &--center {
    margin: 5rem auto;
  }
}
</style>