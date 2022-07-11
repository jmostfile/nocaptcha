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
          <template v-if="content.name">
            <ContentInfo :content="content" />
            <ContentList :contentcatlist="contentcatlist" :nuxtlinkname="'read-shortstories-category-slug'" :catparams="true" />
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
      content: [],
      contentcatlist: [],
      isLoading: true,
      title: 'Edenra - ไม่มีเรื่องสั้นดังกล่าว',
      description: 'ไม่มีเรื่องสั้นดังกล่าว',
    }
  },
  async fetch() {
    this.content = await fetch(
      `${this.$axios.defaults.baseURL}api/read/sstoriescats/${this.$route.params.category}/`
    )
      .then((res) => res.json())
      .catch((e) => {
        return []
      })
    this.contentcatlist = await fetch(
      `${this.$axios.defaults.baseURL}api/read/sstoriescatslist/${this.$route.params.category}/`
    )
      .then((res) => res.json())
      .catch((e) => {
        return []
      })
    if (this.content) {
      this.title = 'Edenra - เรื่องสั้น ' + this.content.name
      this.description = this.content.description
    } else {
      this.title = 'Edenra - ไม่มีเรื่องสั้นดังกล่าว'
      this.description = 'ไม่มีเรื่องสั้นดังกล่าว'
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
