<script lang="ts">
import Emoji from '@/components/Emoji.vue'
import Inspector from '@/components/Inspector.vue'
import emojiData from '@/assets/data.json'
import type { EmojiData } from '@/types'

const serverIP = '192.168.100.7'
const serverPort = '3000'

export default {
  data() {
    return {
      emojiData,
      activeEmoji: emojiData[0],
      serverIP,
      serverPort,
      baseUrl: `http://${serverIP}:${serverPort}`,
      itemSize: 50
    }
  },
  computed: {
    gridItems() {
      return Math.min(Math.floor((window.innerWidth - this.itemSize * 2) / this.itemSize), 9)
    },
    scrollerWidth() {
      return `${this.itemSize * this.gridItems}px`
    }
  },
  methods: {
    setActive(emoji: EmojiData) {
      this.activeEmoji = emoji
    }
  },
  components: { Emoji, Inspector }
}
</script>

<template>
  <div
    class="flex flex-1 flex-col sm:flex-row items-center justify-start sm:justify-center sm:items-start h-full gap-5"
  >
    <Inspector class="sticky" :url="`${baseUrl}/${activeEmoji.unicode}`" />
    <RecycleScroller
      class="h-full overflow-y-auto no-scrollbar"
      key-field="unicode"
      item-class="inline-flex items-center justify-center"
      :style="{ width: scrollerWidth }"
      :items="emojiData"
      :item-size="itemSize"
      :grid-items="gridItems"
    >
      <template #default="{ item }">
        <Emoji
          :url="`${baseUrl}/${item.unicode}`"
          :active="activeEmoji.unicode === item.unicode"
          @click="setActive(item)"
        />
      </template>
    </RecycleScroller>
  </div>
</template>

<style></style>
