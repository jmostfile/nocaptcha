<template>
  <aside class="section p-x-lg">
    <p class="menu-label">เมนู</p>
    <ul class="menu-list">
      <li v-for="(item, key) of items" :key="key">
        <nuxt-link :to="item.to">
          <b-icon :icon="item.icon" :class="item.iconclass" /> {{ item.title }}
        </nuxt-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      q: null,
      c: null,
      items: [
        {
          title: 'หน้าแรก',
          icon: 'home',
          to: { name: 'index' },
          iconclass: 'has-text-primary',
        },
        {
          title: 'อ่าน',
          icon: 'book-open',
          to: { name: 'read' },
          iconclass: 'has-text-info',
        },
        {
          title: 'วิดีโอ',
          icon: 'video',
          to: { name: 'video' },
          iconclass: 'text-green',
        },
        {
          title: 'เกมส์',
          icon: 'google-controller',
          to: { name: 'games' },
          iconclass: 'text-red',
        },
        {
          title: 'อาหารและเครื่องดื่ม',
          icon: 'food-fork-drink',
          to: { name: 'food_drinks' },
          iconclass: 'text-yellow',
        },
      ],
    }
  },
  methods: {
    Search() {
      if (this.$route.name === 'search') {
        this.$router.replace({
          name: 'search',
          query: { q: this.q, c: this.c },
        })
      }
      if (this.$route.name !== 'search') {
        this.$router.push({
          name: 'search',
          query: { q: this.q, c: this.c },
        })
      }
    },
  },
}
</script>
