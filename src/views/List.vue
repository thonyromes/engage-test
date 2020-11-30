<template>
  <div class="wrapper">
    <div class="box box--center">
      <catalogue-list />
    </div>
  </div>
</template>

<script>
import CatalogueList from "../components/CatalogueList.vue";

export default {
  name: "List",
  components: {
    CatalogueList,
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