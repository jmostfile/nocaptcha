<template>
  <div class="is-full-width">
    <div class="container">
      <div v-if="$fetchState.pending" class="p-y-lg p-x-md">
        <b-loading v-model="isLoading" :is-full-page="true"></b-loading>
      </div>
      <div v-else-if="$fetchState.error" class="p-y-lg p-x-md">
        <h3 class="title has-text-centered">ไม่มีหน้าดังกล่าว</h3>
      </div>
      <section v-else class="p-md p-none-mobile">
        <ContentSlug :content="article" :category="{}" :categorylist="[]" :prev="article.prev" :next="article.next" :type="2" :stickytype="3" :refer="false" />
      </section>
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
      article: [],
      title: 'Edenra - ไม่มีหน้าดังกล่าว',
      description: 'ไม่มีหน้าดังกล่าว',
      isLoading: true,
    }
  },
  async fetch() {
    this.article = await fetch(
      `${this.$axios.defaults.baseURL}api/fooddrinks/recipes/${this.$route.params.slug}/`
    )
      .then((res) => res.json())
      .catch((e) => {
        return []
      })
    if (this.article.title) {
      this.title = 'Edenra - ' + this.article.title
      this.description = this.article.description
    } else {
      this.title = 'ไม่มีหน้าดังกล่าว'
      this.description = 'ไม่มีหน้าดังกล่าว'
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