<script lang="ts">
import Emoji from '@/components/Emoji.vue'
import Inspector from '@/components/Inspector.vue'
import emojiData from '@/assets/data.json'
import type { EmojiData } from '@/types'

const serverIP = import.meta.env.VITE_SERVER_IP || '0.0.0.0'
const serverPort = import.meta.env.VITE_SERVER_PORT || '3000'

export default {
  data() {
    return {
      emojiData,
      activeEmoji: emojiData[0],
      serverIP,
      serverPort,
      baseUrl: `http://${serverIP}:${serverPort}`,
      itemSize: 50,
      maxGridItems: 9
    }
  },
  computed: {
    gridItems() {
      return Math.min(
        Math.floor((window.innerWidth - this.itemSize * 2) / this.itemSize),
        this.maxGridItems
      )
    },
    scrollerWidth() {
      return `${this.itemSize * this.gridItems}px`
    }
  },
  methods: {
    setActive(emoji: EmojiData) {
      this.activeEmoji = emoji
    },
    move(dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') {
      const amount = ['UP', 'DOWN'].includes(dir) ? this.gridItems : 1
      const sign = ['DOWN', 'RIGHT'].includes(dir) ? 1 : -1
      const index =
        (emojiData.findIndex((emoji) => emoji.unicode === this.activeEmoji.unicode) +
          amount * sign) %
        emojiData.length

      this.setActive(emojiData[index])
      ;(this.$refs.scroller as any).scrollToItem(index)
    },
    keyHandler(event: KeyboardEvent) {
      if (event.key === 'ArrowDown') this.move('DOWN')
      else if (event.key === 'ArrowUp') this.move('UP')
      else if (event.key === 'ArrowLeft') this.move('LEFT')
      else if (event.key === 'ArrowRight') this.move('RIGHT')
    }
  },
  created() {
    window.addEventListener('keyup', this.keyHandler)
  },
  beforeUnmount() {
    window.removeEventListener('keyup', this.keyHandler)
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
      ref="scroller"
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
