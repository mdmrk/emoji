<script lang="ts">
export default {
  props: {
    url: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<template>
  <div
    class="select-none cursor-pointer inline-flex items-center justify-center w-10 h-10 p-2 shrink-0 bg-secondary outline outline-offset-[-1px] outline-1 outline-white/10 rounded-xl hover:bg-secondary/50"
    :class="{ '!outline-2 !outline-white/30 !outline-offset-[-2px]': active }"
  >
    <img v-lazy="url" />
  </div>
</template>
