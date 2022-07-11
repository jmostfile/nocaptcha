<template>
  <div class="is-full-width">
    <GifBanner :category="4" title="Edenra - เรื่องสั้นทั้งหมด" :subtitle="description" />
    <div class="container">
      <section class="p-md m-t-xl">
        <div v-if="$fetchState.pending" class="p-y-lg p-x-md">
          <b-loading v-model="isLoading" :is-full-page="true"></b-loading>
        </div>
        <div v-else-if="$fetchState.error" class="p-y-lg p-x-md">
          <h3 class="title has-text-centered">ไม่มีหน้าดังกล่าว</h3>
        </div>
        <ContentAll v-else :content="shortstories" title="เรื่องสั้นทั้งหมด" :limit="24" :type="1" :nuxtlinkname="'read-shortstories-category'" :catparams="true" />
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
    this.shortstories = await fetch(
      `${this.$axios.defaults.baseURL}api/read/sstoriescat/all/`
    )
      .then((res) => res.json())
      .catch((e) => {
        return []
      })
  },
  data() {
    return {
      shortstories: [],
      isLoading: true,
      title: 'Edenra - เรื่องสั้นทั้งหมด',
      description:
        'รวมเรื่องสั้นจบในตอนหลากหลายแนวและหลายหลากหมวดหมู่',
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
