<template>
  <div class="wrapper">
    <div class="box box--center">
      <catalogue-view />
    </div>
  </div>
</template>

<script>
import CatalogueView from "../components/CatalogueView.vue";

export default {
  name: "Details",
  components: {
    CatalogueView,
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