<template>
  <div class="is-full-width">
    <GifBanner :category="2" />
    <div class="container">
      <section class="p-md">
        <IndexList />
      </section>
    </div>
  </div>
</template>

<script>
import GifBanner from '~/components/GifBanner'
import IndexList from '~/components/video/index_List'

export default {
  name: 'IndexVideoPage',
  components: {
    GifBanner,
    IndexList,
  },
  data() {
    return {
      title: 'Edenra - วิดีโอ',
      description:
        'หมวดวิดีโอของ Edenra.com ที่จะรวมวิดีโอรายการต่างๆของ Edenra ซึ่งมีมากมายหลายแนวให้ท่านสามารถเลือกรับชมได้ตามความต้องการ',
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
