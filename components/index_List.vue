<template>
  <div ref="indexlist" class="columns is-mobile is-multiline is-relative">
    <div class="column is-10-mobile is-four-fifths-tablet">
      <b-tabs v-model="activeTabList" type="is-toggle" expanded multiline>
        <b-tab-item header-class="bg-ghostwhite">
          <template #header>
            <b-icon icon="new-box" class="text-yellow"></b-icon>
            <span> ล่าสุด </span>
          </template>
          <div class="bg-ghostwhite">
            <div v-for="(item, key) in computedObj" :key="key" class="panel-block">
              <article class="media">
                <nuxt-link v-if="item.category && item.category.slug" :to="{ name: item.nuxtlink,params: { category: item.category.slug,slug: item.slug }}" :title="item.name">
                  <figure class="media-left">
                    <p class="image is-64x64 is-relative has-background-grey-light">
                      <template v-if="item.poster_images">
                        <img
                          :src="$blobimg(item.poster_images.enimages)"
                          :alt="item.name"
                          @load="onLoaded"
                        />
                      </template>
                      <template v-else>
                        <div class="noimage2">
                          <small class="is-size-7">ไม่มีรูปภาพ ณ ตอนนี้</small>
                        </div>
                      </template>
                    </p>
                  </figure>
                </nuxt-link>
                <nuxt-link v-else-if="item.name && item.nuxtlink==='video-show-slug'" :to="{ name: item.nuxtlink,params: { slug: item.slug }}" :title="item.name">
                  <figure class="media-left">
                    <p class="image is-64x64 is-relative has-background-grey-light">
                      <template v-if="item.poster_images">
                        <img
                          :src="$blobimg(item.poster_images.enimages)"
                          :alt="item.name"
                          @load="onLoaded"
                        />
                      </template>
                      <template v-else>
                        <div class="noimage2">
                          <small class="is-size-7">ไม่มีรูปภาพ ณ ตอนนี้</small>
                        </div>
                      </template>
                    </p>
                  </figure>
                </nuxt-link>
                <nuxt-link v-else-if="item.name" :to="{ name: item.nuxtlink,params: { category: item.slug }}" :title="item.name">
                  <figure class="media-left">
                    <p class="image is-64x64 is-relative has-background-grey-light">
                      <template v-if="item.poster_images">
                        <img
                          :src="$blobimg(item.poster_images.enimages)"
                          :alt="item.name"
                          @load="onLoaded"
                        />
                      </template>
                      <template v-else>
                        <div class="noimage2">
                          <small class="is-size-7">ไม่มีรูปภาพ ณ ตอนนี้</small>
                        </div>
                      </template>
                    </p>
                  </figure>
                </nuxt-link>
                <nuxt-link v-else :to="{ name: item.nuxtlink,params: { slug: item.slug }}" :title="item.title">
                  <figure class="media-left">
                    <p class="image is-64x64 is-relative has-background-grey-light">
                      <template v-if="item.poster_images">
                        <img
                          :src="$blobimg(item.poster_images.enimages)"
                          :alt="item.title"
                          @load="onLoaded"
                        />
                      </template>
                      <template v-else>
                        <div class="noimage2">
                          <small class="is-size-7">ไม่มีรูปภาพ ณ ตอนนี้</small>
                        </div>
                      </template>
                    </p>
                  </figure>
                </nuxt-link>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <nuxt-link v-if="item.category && item.category.slug" :to="{ name: item.nuxtlink,params: { category: item.category.slug,slug: item.slug }}" :title="item.title">
                        <strong>{{ item.title }}</strong>
                      </nuxt-link>
                      <nuxt-link v-else-if="item.name && item.nuxtlink==='video-show-slug'" :to="{ name: item.nuxtlink,params: { slug: item.slug }}" :title="item.name">
                        <strong>{{ item.name }}</strong>
                      </nuxt-link>
                      <nuxt-link v-else-if="item.name" :to="{ name: item.nuxtlink,params: { category: item.slug }}" :title="item.name">
                        <strong>{{ item.name }}</strong>
                      </nuxt-link>
                      <nuxt-link v-else :to="{ name: item.nuxtlink,params: { slug: item.slug }}" :title="item.title">
                        <strong>{{ item.title }}</strong>
                      </nuxt-link>
                    </p>
                  </div>
                </div>
              </article>
            </div>
            <div v-if="latest_item.length > 20" class="panel-block">
              <button
                v-if="limit > latest_item.length"
                class="button is-link is-outlined is-fullwidth"
                disabled
              >
                ไม่มีข้อมูลมากกว่านี้
              </button>
              <button
                v-else
                class="button is-link is-outlined is-fullwidth"
                @click="limit = limit + 20"
              >
                ดูมากขึ้น
              </button>
            </div>
          </div>
        </b-tab-item>
        <b-tab-item header-class="bg-ghostwhite">
          <template #header>
            <b-icon icon="fire" class="text-red"></b-icon>
            <span> แนะนำ </span>
          </template>
          <div class="bg-ghostwhite">
            <div v-for="(item, key) in computedObj2" :key="key" class="panel-block">
              <article class="media">
                <nuxt-link v-if="item.nuxtlink==='video-show-slug'" :to="{ name: item.nuxtlink,params: { slug: item.slug }}" :title="item.name">
                  <figure class="media-left">
                    <p class="image is-64x64 is-relative has-background-grey-light">
                      <template v-if="item.poster_images">
                        <img
                          :src="$blobimg(item.poster_images.enimages)"
                          :alt="item.name"
                          @load="onLoaded"
                        />
                      </template>
                      <template v-else>
                        <div class="noimage2">
                          <small class="is-size-7">ไม่มีรูปภาพ ณ ตอนนี้</small>
                        </div>
                      </template>
                    </p>
                  </figure>
                </nuxt-link>
                <nuxt-link v-else :to="{ name: item.nuxtlink,params: { category: item.slug }}" :title="item.name">
                  <figure class="media-left">
                    <p class="image is-64x64 is-relative has-background-grey-light">
                      <template v-if="item.poster_images">
                        <img
                          :src="$blobimg(item.poster_images.enimages)"
                          :alt="item.name"
                          @load="onLoaded"
                        />
                      </template>
                      <template v-else>
                        <div class="noimage2">
                          <small class="is-size-7">ไม่มีรูปภาพ ณ ตอนนี้</small>
                        </div>
                      </template>
                    </p>
                  </figure>
                </nuxt-link>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <nuxt-link v-if="item.nuxtlink==='video-show-slug'" :to="{ name: item.nuxtlink,params: { slug: item.slug }}" :title="item.name">
                        <strong>{{ item.name }}</strong>
                      </nuxt-link>
                      <nuxt-link v-else :to="{ name: item.nuxtlink,params: { category: item.slug }}" :title="item.name">
                        <strong>{{ item.name }}</strong>
                      </nuxt-link>
                    </p>
                  </div>
                </div>
              </article>
            </div>
            <div v-if="pin_item.length > 20" class="panel-block">
              <button
                v-if="limit > pin_item.length"
                class="button is-link is-outlined is-fullwidth"
                disabled
              >
                ไม่มีข้อมูลมากกว่านี้
              </button>
              <button
                v-else
                class="button is-link is-outlined is-fullwidth"
                @click="limit = limit + 20"
              >
                ดูมากขึ้น
              </button>
            </div>
          </div>
        </b-tab-item>
      </b-tabs>
    </div>
    <div class="column is-2-mobile is-one-fifths-tablet p-l-none-mobile">
      <aside class="is-paddingless sticky">
        <p class="menu-label is-hidden-touch">หมวดหมู่</p>
        <ul class="menu-list">
          <li v-for="(item, key) of items" :key="key">
            <nuxt-link :to="item.to">
              <b-icon :icon="item.icon" :class="item.iconclass" />
              <span class="is-hidden-mobile">{{ item.title }}</span>
            </nuxt-link>
          </li>
          <li>
            <a @click="goto('indexlist')">
              <b-icon icon="arrow-up-bold-box" class="has-text-grey-dark" />
              <span class="is-hidden-mobile">เลื่อนขึ้นบน</span>
            </a>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexList',
  data() {
    return {
      recipes: [],
      wikis: [],
      article: [],
      shortstoriesall: [],
      video: [],
      wikicat: [],
      shortstories: [],
      show: [],
      limit: 20,
      activeTabList: 0,
      items: [
        {
          title: 'ทั้งหมด',
          icon: 'home',
          iconclass: 'has-text-primary',
          to: { name: 'index' },
        },
        {
          title: 'อ่าน',
          icon: 'book-open',
          iconclass: 'has-text-info',
          to: { name: 'read' },
        },
        {
          title: 'วิดีโอ',
          icon: 'video',
          iconclass: 'text-green',
          to: { name: 'video' },
        },
        {
          title: 'เกมส์',
          icon: 'google-controller',
          iconclass: 'text-red',
          to: { name: 'games' },
        },
        {
          title: 'อาหารและเครื่องดื่ม',
          icon: 'food-fork-drink',
          iconclass: 'text-yellow',
          to: { name: 'food_drinks' },
        },
      ],
    }
  },
  async fetch() {
    this.recipes = await fetch(
      `${this.$axios.defaults.baseURL}api/fooddrinks/recipes/all/`
    )
      .then((res) => res.json())
      .catch((e) => {
        return []
      })
    this.wikis = await fetch(
      `${this.$axios.defaults.baseURL}api/games/wikiall/all/`
    )
      .then((res) => res.json())
      .catch((e) => {
        return []
      })
    this.article = await fetch(
      `${this.$axios.defaults.baseURL}api/read/article/all/`
    )
      .then((res) => res.json())
      .catch((e) => {
        return []
      })
    this.shortstoriesall = await fetch(
      `${this.$axios.defaults.baseURL}api/read/sstoriesall/all/`
    )
      .then((res) => res.json())
      .catch((e) => {
        return []
      })
    this.video = await fetch(
      `${this.$axios.defaults.baseURL}api/video/all/list/`
    )
      .then((res) => res.json())
      .catch((e) => {
        return []
      })
    this.wikicat = await fetch(
      `${this.$axios.defaults.baseURL}api/games/wikicat/all/`
    )
      .then((res) => res.json())
      .catch((e) => {
        return []
      })
    this.shortstories = await fetch(
      `${this.$axios.defaults.baseURL}api/read/sstoriescat/all/`
    )
      .then((res) => res.json())
      .catch((e) => {
        return []
      })
    this.show = await fetch(
      `${this.$axios.defaults.baseURL}api/video/shows/all/`
    )
      .then((res) => res.json())
      .catch((e) => {
        return []
      })

    if(this.recipes){
      for (const key in this.recipes) {
        this.recipes[key].nuxtlink = 'food_drinks-recipes-slug'
      }
    }
    if(this.wikis){
      for (const key in this.wikis) {
        this.wikis[key].nuxtlink = 'games-wikis-category-slug'
      }
    }
    if(this.article){
      for (const key in this.article) {
        this.article[key].nuxtlink = 'read-article-slug'
      }
    }
    if(this.shortstoriesall){
      for (const key in this.shortstoriesall) {
        this.shortstoriesall[key].nuxtlink = 'read-shortstories-category-slug'
      }
    }
    if(this.video){
      for (const key in this.video) {
        this.video[key].nuxtlink = 'video-slug'
      }
    }
    if(this.wikicat){
      for (const key in this.wikicat) {
        this.wikicat[key].nuxtlink = 'games-wikis-category'
      }
    }
    if(this.shortstories){
      for (const key in this.shortstories) {
        this.shortstories[key].nuxtlink = 'read-shortstories-category'
      }
    }
    if(this.show){
      for (const key in this.show) {
        this.show[key].nuxtlink = 'video-show-slug'
      }
    }
  },
  computed: {
    computedObj() {
      return this.limit ? this.latest_item.slice(0, this.limit) : this.latest_item
    },
    computedObj2() {
      return this.limit ? this.pin_item.slice(0, this.limit) : this.pin_item
    },
    latest_item(){
      const concatjson = this.recipes.concat(this.wikis).concat(this.article).concat(this.shortstoriesall).concat(this.video).concat(this.wikicat).concat(this.shortstories).concat(this.show)
      return concatjson
    },
    pin_item() {
      const obj1 = this.wikicat.filter((wikicat) => wikicat.pin === true)
      const obj2 = this.shortstories.filter((shortstories) => shortstories.pin === true)
      const obj3 = this.show.filter((show) => show.pin === true)
      const concatjson = obj1.concat(obj2).concat(obj3)
      return concatjson
    },
  },
  methods: {
    goto(refName) {
      const element = this.$refs[refName]
      const top = element.offsetTop

      window.scrollTo(0, top)
    },
    onLoaded() {
      URL.revokeObjectURL(this.src)
    },
  },
}
</script>
<style scoped>
.sticky {
  /* position: -webkit-sticky; */
  position: sticky;
  top: 70px;
}

.noimage2 {
  position: absolute;
  width: 100%;
  top: 7%;
  left: 0;
  z-index: 2;
  text-align: center;
  color: #fff;
  padding: 0.25rem 0;
}

.media .image img {
  height: 64px;
}
@media screen and (max-width: 768px) {
  .sticky {
    top: calc(100vh - 19rem);
  }
}
</style>
<style>
@media screen and (max-width: 768px) {
  .b-tabs .tab-content {
    padding: 1rem 0;
  }

  .menu-list a:hover {
    background-color: transparent;
  }
}
</style>
