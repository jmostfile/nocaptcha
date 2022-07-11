<template>
  <div class="is-full-width">
    <div class="container">
      <div v-if="$fetchState.pending" class="p-y-lg p-x-md">
        <b-loading v-model="isLoading" :is-full-page="true"></b-loading>
      </div>
      <div v-else-if="$fetchState.error" class="p-y-lg p-x-md">
        <h3 class="title has-text-centered">ไม่มีหน้าดังกล่าว</h3>
      </div>
      <template v-else>
        <ContentSlug
          :content="wikidetails"
          :category="wikidetails.category"
          :categorylist="wikiscatlist"
          :prev="wikidetails.prev"
          :next="wikidetails.next"
          :type="1"
          :stickytype="1"
          :refer="true"
          :nuxtlinkname="'games-wikis-category-slug'"
          :nuxtlinknamecat="'games-wikis-category'"
          :catparams="true" />
      </template>
    </div>
  </div>
</template>

<script>
import ContentSlug from '~/components/content/content_slug.vue'

export default {
  components: {
    ContentSlug,
  },
  data() {
    return {
      wikidetails: [],
      wikiscatlist: [],
      title: 'Edenra - ไม่มีบทสรุปเกมส์ดังกล่าว',
      description: 'ไม่มีบทสรุปเกมส์ดังกล่าว',
      isLoading: true,
    }
  },
  async fetch() {
    this.wikidetails = await fetch(
      `${this.$axios.defaults.baseURL}api/games/wikicontent/${this.$route.params.slug}/`
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
    if (this.wikidetails) {
      this.title = 'Edenra - บทสรุปเกมส์ ' + this.wikidetails.category.name + ' ' + this.wikidetails.title
      this.description = this.wikidetails.description
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
<style scoped>
h3 {
  font-size: 1.5em;
  margin-bottom: 0.6666em;
  font-weight: 600;
  line-height: 1.125;
}
@media screen and (max-width: 768px) {
  .container {
    width: 100%;
  }
}
</style>