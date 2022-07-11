<template>
  <div class="is-full-width">
    <GifBanner
      :category="2"
      title="Edenra - รายการ Video"
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
        <ContentAll v-else :content="show" title="รายการทั้งหมด" :limit="20" :type="1" :icon="'file-document'" :iconclass="'has-text-info'" :nuxtlinkname="'video-show-slug'" :catparams="false" />
      </section>
    </div>
  </div>
</template>

<script>
import GifBanner from '~/components/GifBanner'
import ContentAll from '~/components/content/content_all'

export default {
  name: 'ShowIndexPage',
  components: {
    GifBanner,
    ContentAll,
  },
  async fetch() {
    this.show = await fetch(
      `${this.$axios.defaults.baseURL}api/video/shows/all/`
    )
      .then((res) => res.json())
      .catch((e) => {
        return []
      })
  },
  data() {
    return {
      show: [],
      isLoading: true,
      title: 'Edenra - รายการ Video',
      description:
        'รายการหลักของ Video ที่คุณสามารถเลือกชมรายการที่คุณชอบและต้องการดูได้ตามอัธยาศัย',
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
