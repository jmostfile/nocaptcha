<template>
  <div class="is-full-width">
    <GifBanner
      :category="2"
      title="Edenra - วิดีโอทั้งหมด"
      :subtitle="description"
    />
    <div class="container">
      <section class="p-md m-t-xl">
        <div v-if="$fetchState.pending" class="p-y-lg p-x-md">
          <b-loading v-model="isLoading" :is-full-page="true"></b-loading>
        </div>
        <div v-else-if="$fetchState.error" class="p-y-lg p-x-md">
          <h3 class="title has-text-centered">ไม่มีหน้าดังกล่าว</h3>
        </div>
        <ContentAll v-else :content="video" title="วิดีโอทั้งหมด" :limit="24" :type="3" :icon="'video'" :iconclass="'text-green'" />
      </section>
    </div>
  </div>
</template>

<script>
import GifBanner from '~/components/GifBanner'
import ContentAll from '~/components/content/content_all'

export default {
  name: 'AllVideoPage',
  components: {
    GifBanner,
    ContentAll,
  },
  async fetch() {
    this.video = await fetch(
      `${this.$axios.defaults.baseURL}api/video/all/list/`
    )
      .then((res) => res.json())
      .catch((e) => {
        return []
      })
  },
  data() {
    return {
      video: [],
      isLoading: true,
      title: 'Edenra - วิดีโอทั้งหมด',
      description:
        'รวมวิดีโอต่างๆจากทุกรายการของ Edenra ซึ่งมีมากมายหลายแนวให้ท่านสามารถเลือกรับชมได้ตามความต้องการ',
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
