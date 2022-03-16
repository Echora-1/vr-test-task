<template>
  <div class="posts-filter">
    <label for="filter">
    </label>
    <div
        :class="[
        'input-wrapper',
        { 'input-wrapper--focused': focused }
      ]"
    >
      <input
          id="filter"
          class="input"
          v-bind="$attrs"
          :placeholder="$attrs.placeholder"
          :value="modelValue"
          @focus="focusHandler"
          @input="inputHandler"
          @blur="blurHandler"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: ""
    },

    id: {
      type: String,
      default: ""
    },
  },

  data() {
    return {
      focused: false
    };
  },

  methods: {
    inputHandler(event) {
      this.$emit("update:modelValue", event.target.value);
    },

    focusHandler() {
      this.focused = true;
    },

    blurHandler() {
      this.focused = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.posts-filter {
  display: flex;
}

.input-wrapper {
  border: 1px solid gray;
  border-radius: 0 4px 4px 0;
  width: 100%;
  background-color: white;

  &--focused {
    border-color: #5E9DE6;
    outline: 2px solid #5E9DE6;
  }
}

input {
  width: 100%;
  height: 30px;
  margin: 0;
  border: none;
  outline: none;
  padding: 3px 6px;
  background: transparent;

  &::placeholder {
    color: rgba(74, 85, 104, 1);
  }
}

label {
  display: inline-block;
  padding: 15px;
  background-color: white;
  border-radius: 4px 0 0 4px;
  border: 1px solid gray;
  border-right: none;
  background-image: url("../assets/icons/magnifying-glass.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 15px;
  cursor: pointer;
}
</style>
