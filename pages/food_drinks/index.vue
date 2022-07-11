<template>
  <div class="is-full-width">
    <GifBanner :category="3" />
    <div class="container">
      <section class="p-md">
        <IndexList />
      </section>
    </div>
  </div>
</template>

<script>
import GifBanner from '~/components/GifBanner'
import IndexList from '~/components/food_drinks/index_List'

export default {
  components: {
    GifBanner,
    IndexList,
  },
  data() {
    return {
      description:
        'รวมเรื่องอาหารและเครื่องดื่มหลากหลายหมวดหมู่ให้คุณเลือกสรร มีทั้งสูตรอาหาร เมนูอาหาร รีวิว บทความต่างๆที่เกี่ยวข้องกับอาหารและเครื่องดื่ม',
    }
  },
  head() {
    return {
      title: 'Edenra - อาหารและเครื่องดื่ม',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Edenra - อาหารและเครื่องดื่ม',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.description,
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: 'Edenra - อาหารและเครื่องดื่ม',
        },
        {
          hid: 'apple-mobile-web-app-title',
          property: 'apple-mobile-web-app-title',
          content: 'Edenra - อาหารและเครื่องดื่ม',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Edenra - อาหารและเครื่องดื่ม',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.description,
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: 'Edenra - อาหารและเครื่องดื่ม',
        },
      ],
    }
  },
}
</script>
