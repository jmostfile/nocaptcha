<template>
  <div class="is-full-width">
    <GifBanner :category="4" />
    <div class="container">
      <section class="p-md m-t-md">
        <IndexList />
      </section>
    </div>
  </div>
</template>

<script>
import GifBanner from '~/components/GifBanner'
import IndexList from '~/components/read/index_List'

export default {
  components: {
    GifBanner,
    IndexList,
  },
  data() {
    return {
      description:
        'รวมเรื่องที่คุณสามารถอ่านออนไลน์ได้บน Edenra.com ไม่ว่าจะเป็นเรื่องสั้น นิยาย บทความ ความรู้ ฯลฯ ที่มีหลากหลายหมวดหมู่ให้คุณเลือกสรร',
    }
  },
  head() {
    return {
      title: 'Edenra - อ่าน',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Edenra - อ่าน',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.description,
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: 'Edenra - อ่าน',
        },
        {
          hid: 'apple-mobile-web-app-title',
          property: 'apple-mobile-web-app-title',
          content: 'Edenra - อ่าน',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Edenra - อ่าน',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.description,
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: 'Edenra - อ่าน',
        },
      ],
    }
  },
}
</script>
