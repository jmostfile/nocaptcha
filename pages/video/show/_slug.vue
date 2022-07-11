<template>
  <div class="is-full-width has-background-grey-lighter is-paddingless">
    <div class="container p-b-lg">
      <div v-if="$fetchState.pending" class="p-y-lg p-x-md">
        <b-loading v-model="isLoading" :is-full-page="true"></b-loading>
      </div>
      <div v-else-if="$fetchState.error" class="p-y-lg p-x-md">
        <h3 class="title has-text-centered">ไม่มีหน้าดังกล่าว</h3>
      </div>
      <template v-else>
        <section v-if="content.name">
          <ContentInfo :content="content" :type="2" />
          <ContentList :contentcatlist="contentcatlist" :type="2" :nuxtlinkname="'video-show-slug'" :catparams="true" />
        </section>
        <div v-else class="p-y-lg p-x-md">
          <h3 class="title has-text-centered">ไม่มีหน้าดังกล่าว</h3>
        </div>
      </template>
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
  async fetch() {
    this.content = await fetch(
      `${this.$axios.defaults.baseURL}api/video/showsdetails/${this.$route.params.slug}/`
    )
      .then((res) => res.json())
      .catch((e) => {
        return []
      })
    this.contentcatlist = await fetch(
      `${this.$axios.defaults.baseURL}api/video/showsdetailslist/${this.$route.params.slug}/`
    )
      .then((res) => res.json())
      .catch((e) => {
        return []
      })
    if (this.content) {
      this.title = this.content.name
      this.description = this.content.description
    } else {
      this.title = 'Edenra - ไม่มีหน้าดังกล่าว'
      this.description = 'ไม่มีหน้าดังกล่าว'
    }
  },
  data() {
    return {
      content: [],
      contentcatlist: [],
      errors: [],
      isLoading: true,
      title: 'Edenra - ไม่มีหน้าดังกล่าว',
      description: 'ไม่มีหน้าดังกล่าว',
    }
  },
  head() {
    return {
      title: 'Edenra - รายการ ' + this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Edenra - รายการ ' + this.title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.description,
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: 'Edenra - รายการ ' + this.title,
        },
        {
          hid: 'apple-mobile-web-app-title',
          property: 'apple-mobile-web-app-title',
          content: 'Edenra - รายการ ' + this.title,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Edenra - รายการ ' + this.title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.description,
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: 'Edenra - รายการ ' + this.title,
        },
      ],
    }
  },
}
</script>
