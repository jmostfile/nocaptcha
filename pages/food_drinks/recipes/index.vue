<template>
  <div class="is-full-width">
    <GifBanner :category="3" title="Edenra - เมนูอาหาร" :subtitle="description" />
    <div class="container">
      <section class="p-md m-t-xl m-b-xl">
        <div v-if="$fetchState.pending" class="p-y-lg p-x-md">
          <b-loading v-model="isLoading" :is-full-page="true"></b-loading>
        </div>
        <div v-else-if="$fetchState.error" class="p-y-lg p-x-md">
          <h3 class="title has-text-centered">ไม่มีหน้าดังกล่าว</h3>
        </div>
        <ContentAll v-else :content="recipes" title="สูตรอาหารทั้งหมด" :limit="20" :type="2" :icon="'food'" :iconclass="'text-yellow'" :nuxtlinkname="'food_drinks-recipes-slug'" />
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
    this.recipes = await fetch(
      `${this.$axios.defaults.baseURL}api/fooddrinks/recipes/all/`
    )
      .then((res) => res.json())
      .catch((e) => {
        return []
      })
  },
  data() {
    return {
      recipes: [],
      isLoading: true,
      description:
        'บทความเมนูอาหารทั้งหมดของ Edenra.com ที่คุณสามารดูหรืออ่านและสามารถทำตามขั้นตอนแต่ละเมนูอาหารได้อย่างง่ายดาย',
    }
  },
  head() {
    return {
      title: 'Edenra - เมนูอาหาร',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Edenra - เมนูอาหาร',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.description,
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: 'Edenra - เมนูอาหาร',
        },
        {
          hid: 'apple-mobile-web-app-title',
          property: 'apple-mobile-web-app-title',
          content: 'Edenra - เมนูอาหาร',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Edenra - เมนูอาหาร',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.description,
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: 'Edenra - เมนูอาหาร',
        },
      ],
    }
  },
}
</script>
