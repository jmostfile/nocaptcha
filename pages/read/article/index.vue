<template>
  <div class="is-full-width">
    <GifBanner :category="4" title="Edenra - บทความทั้งหมด" :subtitle="description" />
    <div class="container">
      <section class="p-md m-t-xl">
        <div v-if="$fetchState.pending" class="p-y-lg p-x-md">
          <b-loading v-model="isLoading" :is-full-page="true"></b-loading>
        </div>
        <div v-else-if="$fetchState.error" class="p-y-lg p-x-md">
          <h3 class="title has-text-centered">ไม่มีหน้าดังกล่าว</h3>
        </div>
        <ContentAll v-else :content="article" title="บทความทั้งหมด" :limit="20" :type="2" :icon="'book-outline'" :iconclass="'text-green'" :nuxtlinkname="'read-article-slug'" />
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
  async fetch() {
    this.article = await fetch(
      `${this.$axios.defaults.baseURL}api/read/article/all/`
    )
      .then((res) => res.json())
      .catch((e) => {
        return []
      })
  },
  data() {
    return {
      article: [],
      isLoading: true,
      description:
        'รวมบทความที่มีประโยชน์ในด้านต่างๆ หลากหลายแนวทางให้ท่านเลือกอ่านได้ตามความต้องการ',
    }
  },
  head() {
    return {
      title: 'Edenra - บทความทั้งหมด',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Edenra - บทความทั้งหมด',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.description,
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: 'Edenra - บทความทั้งหมด',
        },
        {
          hid: 'apple-mobile-web-app-title',
          property: 'apple-mobile-web-app-title',
          content: 'Edenra - บทความทั้งหมด',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Edenra - บทความทั้งหมด',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.description,
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: 'Edenra - บทความทั้งหมด',
        },
      ],
    }
  },
}
</script>
