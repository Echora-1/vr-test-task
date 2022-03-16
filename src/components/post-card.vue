<template>
  <div class="card">
      <p class="card__title">{{ content.title }}</p>
      <p class="card__text">{{ content.text }}</p>
      <p class="card__author">{{ content.author }}</p>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default() {
        return {
          title: "",
          text: "",
          author: ""
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  background-color: white;
  padding: 20px;

  p {
    margin-top: 0;
    line-height: 125%;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__title {
    color: #5E9DE6;
    font-size: 26px;
    margin-bottom: 20px;
  }

  &__text {
    color: black;
    font-size: 22px;
    margin-bottom: 30px;
  }

  &__author {
    color: gray;
    font-size: 18px;
    margin-bottom: 0;
  }
}
</style>
