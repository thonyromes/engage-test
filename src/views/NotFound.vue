<template>
  <div class="wrapper">
    <div class="box box--center">
      <h1>404</h1>
      <h3>Page or Resource not Found</h3>
      <div>
        <router-link :to="{ name: 'Home' }" class="">Back to home</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style lang="scss" scoped>
.box {
  max-width: 50rem;
  width: 90%;
  color: white;
  text-align: center;
  font-size: 1.5rem;

  &--center {
    margin: 5rem auto;
  }
}
</style>