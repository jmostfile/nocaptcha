<template>
  <div class="is-full-width">
    <GifBanner
      :category="1"
      title="Edenra - เล่นเกมส์"
      :subtitle="description"
    />
    <div class="container">
      <section class="p-md m-t-md">
        <PlayList />
      </section>
      <div class="m-b-xxl p-b-xxl"><div class="m-b-xxl p-b-xxl"></div></div>
    </div>
  </div>
</template>

<script>
import GifBanner from '~/components/GifBanner'
import PlayList from '~/components/games/play_List'

export default {
  components: {
    GifBanner,
    PlayList,
  },
  data() {
    return {
      title: 'Edenra - เล่นเกมส์',
      description:
        'มาร่วมเล่นเกมส์ที่ Edenra.com จัดทำขึ้นเพื่อความสนุกสนานของคุณ สามารถเลือกเล่นเกมส์ที่คุณต้องการได้ตามอัธยาศัย',
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
