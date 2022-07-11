<template>
  <div class="is-full-width">
    <div class="container">
      <section class="p-md p-none-mobile">
        <div v-if="$fetchState.pending" class="p-y-lg p-x-md">
          <b-loading v-model="isLoading" :is-full-page="true"></b-loading>
        </div>
        <div v-else-if="$fetchState.error" class="p-y-lg p-x-md">
          <h3 class="title has-text-centered">ไม่มีหน้าดังกล่าว</h3>
        </div>
        <div v-else>
          <template v-if="wikis.name">
            <ContentInfo :content="wikis" />
            <ContentList :contentcatlist="wikiscatlist" :nuxtlinkname="'games-wikis-category-slug'" :catparams="true" />
          </template>
          <template v-else>
            <div class="p-y-lg p-x-md">
              <h3 class="title has-text-centered">ไม่มีหน้าดังกล่าว</h3>
            </div>
          </template>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import ContentInfo from '~/components/content/content_info.vue'
import ContentList from '~/components/content/content_list.vue'

export default {
  components: {
      ContentInfo,
      ContentList,
  },
  data() {
    return {
      wikis: [],
      wikiscatlist: [],
      isLoading: true,
      title: 'Edenra - ไม่มีบทสรุปเกมส์ดังกล่าว',
      description: 'ไม่มีบทสรุปเกมส์ดังกล่าว',
    }
  },
  async fetch() {
    this.wikis = await fetch(
      `${this.$axios.defaults.baseURL}api/games/catsdetails/${this.$route.params.category}/`
    )
      .then((res) => res.json())
      .catch((e) => {
        return []
      })
    this.wikiscatlist = await fetch(
      `${this.$axios.defaults.baseURL}api/games/catsdetailslist/${this.$route.params.category}/`
    )
      .then((res) => res.json())
      .catch((e) => {
        return []
      })
    if (typeof this.wikis.name !== 'undefined') {
      this.title = 'Edenra - บทสรุปเกมส์ ' +this.wikis.name
      this.description = this.wikis.description
    } else {
      this.title = 'Edenra - ไม่มีบทสรุปเกมส์ดังกล่าว'
      this.description = 'ไม่มีบทสรุปเกมส์ดังกล่าว'
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
