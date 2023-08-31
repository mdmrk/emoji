<script lang="ts">
export default {
  props: {
    url: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <img class="h-40 w-40 shrink-0" v-lazy="url" :key="url" />
</template>
