<template>
  <div class="is-full-width">
    <GifBanner
      :category="1"
      title="Edenra - บทสรุปเกมส์"
      :subtitle="description"
    />
    <div class="container">
      <section class="p-md m-t-xl m-b-xl">
        <div v-if="$fetchState.pending" class="p-y-lg p-x-md">
          <b-loading v-model="isLoading" :is-full-page="true"></b-loading>
        </div>
        <div v-else-if="$fetchState.error" class="p-y-lg p-x-md">
          <h3 class="title has-text-centered">ไม่มีหน้าดังกล่าว</h3>
        </div>
        <ContentAll v-else :content="wikis" title="บทสรุปเกมส์" :limit="20" :type="1" :icon="'file-document'" :iconclass="'has-text-info'" :nuxtlinkname="'games-wikis-category'" :catparams="true" />
      </section>
    </div>
  </div>
</template>

<script>
import GifBanner from '~/components/GifBanner'
import ContentAll from '~/components/content/content_all'

export default {
  components: {
    GifBanner,
    ContentAll,
  },
  data() {
    return {
      wikis: [],
      isLoading: true,
      title: 'Edenra - บทสรุปเกมส์',
      description:
        'รายการบทสรุปเกมส์ที่ Edenra.com หารายละเอียด รวบรวมข้อมูล จัดทำเนื้อหา เพื่อให้คุณได้เล่นเกมส์ต่างๆได้ง่ายยิ่งขึ้น',
    }
  },
  async fetch() {
    this.wikis = await fetch(
      `${this.$axios.defaults.baseURL}api/games/wikicat/all/`
    )
      .then((res) => res.json())
      .catch((e) => {
        return []
      })
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
