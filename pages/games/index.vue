<template>
  <div class="is-full-width">
    <GifBanner :category="1" />
    <div class="container">
      <section class="p-md m-t-md">
        <IndexList />
      </section>
    </div>
  </div>
</template>

<script>
import GifBanner from '~/components/GifBanner'
import IndexList from '~/components/games/index_List'

export default {
  components: {
    GifBanner,
    IndexList,
  },
  data() {
    return {
      title: 'Edenra - เกมส์',
      description:
        'รวมเนื้อหาเกี่ยวกับบทสรุปเกมส์ เกมส์ลดราคา บทความเกมส แนะนำเกมส์น่าเล่น และอื่นๆที่เกี่ยวข้องกับเกมส์',
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.description,
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: this.title,
        },
        {
          hid: 'apple-mobile-web-app-title',
          property: 'apple-mobile-web-app-title',
          content: this.title,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.description,
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: this.title,
        },
      ],
    }
  },
}
</script>
