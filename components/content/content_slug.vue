<template>
    <section class="p-md p-none-mobile">
        <template v-if="content.title">
            <template v-if="content.viewp === 2">
            <template v-if=" isAuthenticated && loggedInUser && (loggedInUser.profile.is_subscribed || loggedInUser.profile.is_subscribed_lifetime)">
                <article class="bg-ghostwhite content">
                <div class="p-md">
                    <header class="entry-header">
                    <h1 class="text-red">{{ content.title }}</h1>
                    </header>
                    <div id="blobimg" v-html="b64_to_utf8(content.encontent)" @load="searchimg()"></div>
                </div>
                <footer></footer>
                </article>
            </template>
            <h4 v-else class="has-text-centered text-red is-size-1 p-y-lg">
                สำหรับสมาชิกผู้สนับสนุนเท่านั้น
            </h4>
            </template>
            <template v-else-if="content.viewp === 1">
            <template v-if="isAuthenticated">
                <article
                class="bg-ghostwhite content"
                >
                <div class="p-md">
                    <header class="entry-header">
                    <h1 class="text-red">{{ content.title }}</h1>
                    </header>
                    <div id="blobimg" v-html="b64_to_utf8(content.encontent)" @load="searchimg()"></div>
                </div>
                <footer></footer>
                </article>
            </template>
            <h4 v-else class="has-text-centered text-red is-size-1 p-y-lg">
                สำหรับสมาชิกเท่านั้น
            </h4>
            </template>
            <template v-else-if="content.viewp === 0">
                <article class="bg-ghostwhite content">
                    <div class="p-md">
                    <header class="entry-header">
                        <h1 class="text-red">{{ content.title }}</h1>
                    </header>
                    <div id="blobimg" v-html="b64_to_utf8(content.encontent)" @load="searchimg()"></div>
                    </div>
                    <footer></footer>
                </article>
            </template>
            <div v-if="refer && content.ref" class="message is-info">
                <div class="message-header">
                    <p>อ้างอิง</p>
                </div>
                <div class="message-body" v-html="reflink"></div>
            </div>
            <section v-if="stickytype===1" class="sticky-foot bg-ghostwhite p-md">
                <div class="columns is-mobile">
                <div class="column is-2-tablet is-2-mobile">
                  <b-dropdown aria-role="list" position="is-top-right">
                    <template #trigger>
                      <b-button label="แชร์บทความ" class="button is-fullwidth is-hidden-mobile" icon-left="share-variant"  type="is-info is-light" />
                      <b-button class="button is-fullwidth is-flex-mobile is-hidden-tablet" icon-left="share-variant"  type="is-info is-light" />
                    </template>
                    <b-dropdown-item aria-role="listitem">
                      <a :href="'https://www.facebook.com/sharer/sharer.php?u=https://www.edenra.com'+this.$router.currentRoute.path" target="_blank">
                        <b-button icon-left="facebook" class="fab-facebook m-x-sm has-text-white" rounded expanded>Facebook</b-button>
                      </a>
                    </b-dropdown-item>
                    <b-dropdown-item aria-role="listitem">
                      <a :href="'https://twitter.com/intent/tweet?text='+content.title+'!&url=https://www.edenra.com'+this.$route.fullPath" target="_blank">
                        <b-button icon-left="twitter" class="fab-twitter m-x-sm has-text-white" rounded expanded>Twitter</b-button>
                      </a>
                    </b-dropdown-item>
                    <b-dropdown-item aria-role="listitem">
                      <b-button @click.stop.prevent="copyURL" icon-left="link" class="m-x-sm" rounded expanded>Copy URL</b-button>
                    </b-dropdown-item>
                  </b-dropdown>
                </div>
                <div class="column is-10-tablet is-10-mobile">
                    <div class="columns is-mobile">
                    <div class="column is-1-tablet is-3-mobile">
                        <template v-if="prev.title">
                        <b-tooltip label="หน้าก่อนหน้า" type="is-light" animated>
                            <nuxt-link :to="{ name: nuxtlinkname,params: { category: content.category.slug,slug: prev.slug }}" :title="prev.title">
                            <b-button icon-right="chevron-left" class="is-fullwidth" />
                            </nuxt-link>
                        </b-tooltip>
                        </template>
                        <template v-else>
                        <b-tooltip label="ไม่มีหน้าก่อนหน้า" type="is-light" animated>
                            <b-button icon-right="chevron-left" class="is-fullwidth" disabled />
                        </b-tooltip>
                        </template>
                    </div>
                    <div class="column is-10-tablet is-6-mobile">
                        <b-tooltip label="สารบัญ" type="is-light" animated class="is-full-width">
                        <b-dropdown aria-role="list" position="is-top-right" expanded>
                            <button
                            slot="trigger"
                            slot-scope="{ active }"
                            class="button is-primary is-fullwidth"
                            >
                            <span>สารบัญ</span>
                            <b-icon :icon="active ? 'menu-up' : 'menu-down'"></b-icon>
                            </button>
                            <template v-if="Array.isArray(categorylist) && categorylist.length">
                            <b-dropdown-item v-if="catparams" aria-role="listitem" has-link>
                              <ul class="menu-list">
                                <nuxt-link :to="{ name: nuxtlinknamecat,params: { category: content.category.slug }}">
                                  <li><h4 class="has-text-link">หน้าสารบัญ</h4></li>
                                </nuxt-link>
                              </ul>
                            </b-dropdown-item>
                            <b-dropdown-item
                                v-for="(categorylist, keycategorylist) in categorylist"
                                :key="keycategorylist"
                                aria-role="listitem"
                                has-link
                                :title="categorylist.title"
                            >
                                <ul class="menu-list" :class="{'has-background-grey-lighter':(content.slug === categorylist.slug)}">
                                <nuxt-link v-if="catparams" :to="{ name: nuxtlinkname,params: { category: categorylist.category.slug,slug: categorylist.slug }}" :title="categorylist.title">
                                  <li><h4 class="has-text-link">{{ categorylist.title }}</h4></li>
                                </nuxt-link>
                                <nuxt-link v-else :to="{ name: nuxtlinkname,params: { slug: categorylist.slug }}" :title="categorylist.title">
                                  <li><h4 class="has-text-link">{{ categorylist.title }}</h4></li>
                                </nuxt-link>
                                </ul>
                            </b-dropdown-item>
                            </template>
                            <template v-else>
                            <b-dropdown-item aria-role="listitem">
                                <h3>ยังไม่มีข้อมูล</h3>
                            </b-dropdown-item>
                            </template>
                        </b-dropdown>
                        </b-tooltip>
                    </div>
                    <div class="column is-1-tablet is-3-mobile has-text-right">
                        <template v-if="next.title">
                        <b-tooltip label="หน้าถัดไป" type="is-light" animated>
                            <nuxt-link :to="{ name: nuxtlinkname,params: { category: content.category.slug,slug: next.slug }}" :title="next.title">
                            <b-button icon-right="chevron-right" class="is-fullwidth" />
                            </nuxt-link>
                        </b-tooltip>
                        </template>
                        <template v-else>
                        <b-tooltip label="ไม่มีหน้าถัดไป" type="is-light" animated>
                            <b-button icon-right="chevron-right" class="is-fullwidth" disabled />
                        </b-tooltip>
                        </template>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            <section v-if="stickytype===2" class="sticky-foot bg-ghostwhite p-md m-b-md">
              <div class="columns is-mobile">
                <div class="column is-2-tablet is-2-mobile">
                  <b-dropdown aria-role="list" position="is-top-right">
                    <template #trigger>
                      <b-button label="แชร์บทความ" class="button is-fullwidth is-hidden-mobile" icon-left="share-variant"  type="is-info is-light" />
                      <b-button class="button is-fullwidth is-flex-mobile is-hidden-tablet" icon-left="share-variant"  type="is-info is-light" />
                    </template>
                    <b-dropdown-item aria-role="listitem">
                      <a :href="'https://www.facebook.com/sharer/sharer.php?u=https://www.edenra.com'+this.$router.currentRoute.path" target="_blank">
                        <b-button icon-left="facebook" class="fab-facebook m-x-sm has-text-white" rounded expanded>Facebook</b-button>
                      </a>
                    </b-dropdown-item>
                    <b-dropdown-item aria-role="listitem">
                      <a :href="'https://twitter.com/intent/tweet?text='+content.title+'!&url=https://www.edenra.com'+this.$route.fullPath" target="_blank">
                        <b-button icon-left="twitter" class="fab-twitter m-x-sm has-text-white" rounded expanded>Twitter</b-button>
                      </a>
                    </b-dropdown-item>
                    <b-dropdown-item aria-role="listitem">
                      <b-button @click.stop.prevent="copyURL" icon-left="link" class="m-x-sm" rounded expanded>Copy URL</b-button>
                    </b-dropdown-item>
                  </b-dropdown>
                </div>
                <div class="column is-10-tablet is-10-mobile">
                  <div class="columns is-mobile">
                    <div class="column is-1-tablet is-3-mobile">
                      <template v-if="prev.title">
                        <b-tooltip label="บทความก่อนหน้า" type="is-light" animated>
                          <nuxt-link :to="{ name: 'read-article-slug',params: { slug: prev.slug }}" :title="prev.title">
                            <b-button icon-right="chevron-left" class="is-fullwidth" />
                          </nuxt-link>
                        </b-tooltip>
                      </template>
                      <template v-else>
                        <b-tooltip label="ไม่มีบทความก่อนหน้า" type="is-light" animated>
                          <b-button icon-right="chevron-left" class="is-fullwidth" disabled />
                        </b-tooltip>
                      </template>
                    </div>
                    <div class="column is-10-tablet is-6-mobile">
                      <b-tooltip label="หน้ารวมบทความ" type="is-light" animated class="is-full-width">
                        <nuxt-link :to="{ name: 'read-article'}" title="หน้ารวมบทความ">
                          <button class="button is-primary is-fullwidth">หน้ารวมบทความ</button>
                        </nuxt-link>
                      </b-tooltip>
                    </div>
                    <div class="column is-1-tablet is-3-mobile has-text-right">
                      <template v-if="next.title">
                        <b-tooltip label="บทความถัดไป" type="is-light" animated>
                          <nuxt-link :to="{ name: 'read-article-slug',params: { slug: next.slug }}" :title="next.title">
                            <b-button icon-right="chevron-right" class="is-fullwidth" />
                          </nuxt-link>
                        </b-tooltip>
                      </template>
                      <template v-else>
                        <b-tooltip label="ไม่มีบทความถัดไป" type="is-light" animated>
                          <b-button icon-right="chevron-right" class="is-fullwidth" disabled />
                        </b-tooltip>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section v-if="stickytype===3" class="sticky-foot bg-ghostwhite p-md m-b-md">
              <div class="columns is-mobile">
                <div class="column is-2-tablet is-2-mobile">
                  <b-dropdown aria-role="list" position="is-top-right">
                    <template #trigger>
                      <b-button label="แชร์บทความ" class="button is-fullwidth is-hidden-mobile" icon-left="share-variant"  type="is-info is-light" />
                      <b-button class="button is-fullwidth is-flex-mobile is-hidden-tablet" icon-left="share-variant"  type="is-info is-light" />
                    </template>
                    <b-dropdown-item aria-role="listitem">
                      <a :href="'https://www.facebook.com/sharer/sharer.php?u=https://www.edenra.com'+this.$router.currentRoute.path" target="_blank">
                        <b-button icon-left="facebook" class="fab-facebook m-x-sm has-text-white" rounded expanded>Facebook</b-button>
                      </a>
                    </b-dropdown-item>
                    <b-dropdown-item aria-role="listitem">
                      <a :href="'https://twitter.com/intent/tweet?text='+content.title+'!&url=https://www.edenra.com'+this.$route.fullPath" target="_blank">
                        <b-button icon-left="twitter" class="fab-twitter m-x-sm has-text-white" rounded expanded>Twitter</b-button>
                      </a>
                    </b-dropdown-item>
                    <b-dropdown-item aria-role="listitem">
                      <b-button @click.stop.prevent="copyURL" icon-left="link" class="m-x-sm" rounded expanded>Copy URL</b-button>
                    </b-dropdown-item>
                  </b-dropdown>
                </div>
                <div class="column is-10-tablet is-10-mobile">
                  <div class="columns is-mobile">
                    <div class="column is-1-tablet is-3-mobile">
                      <template v-if="prev.title">
                        <b-tooltip label="เมนูก่อนหน้า" type="is-light" animated>
                          <nuxt-link :to="{ name: 'food_drinks-recipes-slug',params: { slug: prev.slug }}" :title="prev.title">
                            <b-button icon-right="chevron-left" class="is-fullwidth" />
                          </nuxt-link>
                        </b-tooltip>
                      </template>
                      <template v-else>
                        <b-tooltip label="ไม่มีเมนูก่อนหน้า" type="is-light" animated>
                          <b-button icon-right="chevron-left" class="is-fullwidth" disabled />
                        </b-tooltip>
                      </template>
                    </div>
                    <div class="column is-10-tablet is-6-mobile">
                      <b-tooltip label="หน้ารวมเมนู" type="is-light" animated class="is-full-width">
                        <nuxt-link :to="{ name: 'food_drinks-recipes'}" title="หน้ารวมเมนู">
                          <button class="button is-primary is-fullwidth">หน้ารวมเมนู</button>
                        </nuxt-link>
                      </b-tooltip>
                    </div>
                    <div class="column is-1-tablet is-3-mobile has-text-right">
                      <template v-if="next.title">
                        <b-tooltip label="เมนูถัดไป" type="is-light" animated>
                          <nuxt-link :to="{ name: 'food_drinks-recipes-slug',params: { slug: next.slug }}" :title="next.title">
                            <b-button icon-right="chevron-right" class="is-fullwidth" />
                          </nuxt-link>
                        </b-tooltip>
                      </template>
                      <template v-else>
                        <b-tooltip label="ไม่มีเมนูถัดไป" type="is-light" animated>
                          <b-button icon-right="chevron-right" class="is-fullwidth" disabled />
                        </b-tooltip>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </section>
        </template>
        <template v-else>
            <div class="p-y-lg p-x-md">
            <h3 class="title has-text-centered">ไม่มีหน้าดังกล่าว</h3>
            </div>
        </template>
        <input id="pscp" type="hidden" value=" " />
    </section>
</template>
<script>
import { mapGetters } from 'vuex'
import { Base64 } from 'js-base64'
export default {
  name: 'ContentSlug',
  props: {
    content: Object,
    category: Object,
    categorylist: {
      type: Array,
      default() {
        return []
      }
    },
    prev: Object,
    next: Object,
    nuxtlinkname: {
      type: String,
      default: '',
    },
    nuxtlinknamecat: {
      type: String,
      default: '',
    },
    catparams: {
      type: Boolean,
      default: false,
    },
    type: {
      type: Number,
      default: 1,
    },
    stickytype: {
      type: Number,
      default: 1,
    },
    refer: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isBlob: false,
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
    reflink() {
      const re = /(?![^<]*>|[^<>]*<\/(?!(?:p|pre)>))((https?:)\/\/[a-z0-9&#=./\-?_]+)/gi
      const subst = '<a href="$1" target="_blank">$1</a>'
      const result = this.content.ref.replace(re, subst)
      return result.replace(/(?:\r\n|\r|\n)/g, '<br>')
    },
  },
  mounted() {
    let ctrlDown = false
    let shiftDown = false
    const ctrlKey = 17
    const shiftKey = 16
    const cmdKey = 91
    const cmdFKey = 224

    window.addEventListener('keyup', function (e) {
      if (e.keyCode === 44 || e.which === 44) {
        if (document.getElementsByTagName('article')[0]) {
          document.getElementsByTagName('article')[0].remove()
        }
        const aux = document.createElement('input')
        aux.setAttribute('value', ' ')
        document.body.appendChild(aux)
        aux.select()
        document.execCommand('copy')
        document.body.removeChild(aux)
        const copyText = document.getElementById('pscp')
        copyText.select()
        document.execCommand('copy')
      }
      if (
        e.which === 123 ||
        e.keyCode === 123 ||
        e.which === 120 ||
        e.keyCode === 120 ||
        e.which === 118 ||
        e.keyCode === 118
      ) {
        document.getElementsByTagName('article')[0].remove()
      }
      if (
        e.keyCode === ctrlKey ||
        e.keyCode === cmdKey ||
        e.keyCode === cmdFKey ||
        e.which === ctrlKey ||
        e.which === cmdKey ||
        e.which === cmdFKey
      )
        ctrlDown = false
      if (e.keyCode === shiftKey || e.which === shiftKey) shiftDown = false
    })
    window.addEventListener('keydown', function (e) {
      if (
        e.keyCode === ctrlKey ||
        e.keyCode === cmdKey ||
        e.keyCode === cmdFKey ||
        e.which === ctrlKey ||
        e.which === cmdKey ||
        e.which === cmdFKey
      )
        ctrlDown = true
      if (e.keyCode === shiftKey || e.which === shiftKey) shiftDown = true

      if (ctrlDown && shiftDown) {
        document.getElementsByTagName('article')[0].remove()
      }
    })
    window.addEventListener('focus', this.searchimg)
    window.addEventListener('blur', this.searchimg)
    window.addEventListener(
      'contextmenu',
      function (e) {
        e.preventDefault()
      },
      false
    )
  },
  methods: {
    b64_to_utf8(str) {
      str = str.replace(/\s/g, '')
      return decodeURIComponent(escape(Base64.atob(str)))
    },
    copyURL() {
      const aux = document.createElement('input')
      aux.setAttribute('value', window.location.href)
      document.body.appendChild(aux)
      aux.select()
      document.execCommand('copy')
      document.body.removeChild(aux)
      this.$buefy.toast.open({message: 'Copy URL เรียบร้อยแล้ว',type: 'is-success'})
    },
    searchimg() {
      const getDivId = document.getElementById('blobimg')
      let images = []
      if (!this.isBlob) {
        if (getDivId) {
          images = getDivId.getElementsByTagName('img')
          for (let i = 0; i < images.length; i++) {
            const img = images[i]
            const blobsrc = this.$blobimg(img.src)
            img.src = blobsrc
          }
          this.isBlob = true
        }
      }
    },
    onLoaded() {
      URL.revokeObjectURL(this.src)
    },
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

article.content {
  /*
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  */
  user-select: none;
  position: relative;
}

article {
  position: relative;
  overflow: hidden;
}

article > div {
  width: 100%;
}

article::before,
article footer {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  z-index: 2;
  padding: 1rem;
}

.message-body a {
  overflow-wrap: anywhere;
}

.sticky-foot {
  /* position: -webkit-sticky; */
  position: sticky;
  bottom: 0;
  z-index: 3;
}
@media screen and (max-width: 768px) {
  article.content {
    font-size: 0.5rem !important;
  }
}
</style>