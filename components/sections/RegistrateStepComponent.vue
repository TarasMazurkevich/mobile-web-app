<template>
  <div class="registrate_inputGroup">
    <div
      v-for="(input, i) in inputsData"
      :key="i"
      class="registrate_inputWrap"
    >
      <input
        :v-model="input.value"
        :id="input.name"
        :type="input.type"
        :name="input.name"
        class="registrate-input"
        require
      >
      <label
        :for="input.name"
        class="registrate-label"
      >{{ input.label }}</label>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    inputsData: Array
  }
}

</script>

<style lang="scss">

  .registrate {
    &_inputGroup {
      display: grid;
      grid-template-rows: auto;
      grid-gap: .8em;
      overflow-y: auto;
    }

    &-input {
      border: {
        width: 1.5px;
        style: solid;
        color: var(--color-line);
      }
      border-radius: 6px;
      padding: {
        top: .3em;
        left: .5em;
        bottom: .3em;
      }
      width: 100%;
      color: var(--color-font-in-colorful);
      font-weight: 400;
      font-size: 18px;
      color: var(--color-font-secondary);

      &:not(:first-child) {
        margin-top: 10px;
      }
    }
  }

</style>
