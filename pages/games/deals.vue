<template>
  <div class="is-full-width">
    <GifBanner
      :category="1"
      title="Edenra - เกมส์ลดราคา"
      :subtitle="description"
    />
    <div class="container">
      <section class="p-md m-t-md">
        <DealsList />
      </section>
    </div>
  </div>
</template>

<script>
import GifBanner from '~/components/GifBanner'
import DealsList from '~/components/games/deals_List'

export default {
  components: {
    GifBanner,
    DealsList,
  },
  data() {
    return {
      title: 'Edenra - เกมส์ลดราคา',
      description:
        'รายการเกมส์ที่ลดราคาอยู่ ไม่ว่าจะเป็นเกมส์ใน Steam Origin Uplay Epic Games Uplay GOG PlayStation XBOX Andriod iOS หรือจาก Website ที่ขายเกมส์ต่างๆ',
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
