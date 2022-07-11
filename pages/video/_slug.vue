<template>
  <div class="is-full-width">
    <div v-if="$fetchState.pending" class="p-y-lg p-x-md">
      <b-loading v-model="isLoading" :is-full-page="true"></b-loading>
    </div>
    <div v-else-if="$fetchState.error" class="p-y-lg p-x-md">
      <h3 class="title has-text-centered">ไม่มีหน้าดังกล่าว</h3>
    </div>
    <template v-else>
      <div v-if="item.title" class="container p-y-lg">
        <section class="p-md p-none-mobile">
          <div class="columns is-mobile is-multiline">
            <div class="column is-full">
              <template v-if="
                (item.viewp === 2 &&
                  isAuthenticated &&
                  loggedInUser &&
                  (loggedInUser.profile.is_subscribed ||
                    loggedInUser.profile.is_subscribed_lifetime)) ||
                (item.viewp === 1 && isAuthenticated) ||
                item.viewp === 0
              ">
                <vue-plyr v-if="item.type === 0" :emit="['play']">
                  <video :poster="item.enimages">
                    <source :src="item.upload" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </vue-plyr>
                <vue-plyr v-if="item.type === 1" :emit="['play']">
                  <div class="video-container plyr__video-embed">
                    <iframe
                      :src="b64_to_utf8(item.src)"
                      allowfullscreen
                      allowtransparency
                      allow="autoplay"
                    >
                    </iframe>
                  </div>
                </vue-plyr>
              </template>
              <div v-else class="is-marginless is-paddingless">
                <figure class="image is-5by3 is-relative">
                  <img :src="item.enimages" :alt="item.title" />
                  <div v-if="item.viewp === 2" class="smember">
                    <small>สำหรับสมาชิกผู้สนับสนุนเท่านั้น</small>
                  </div>
                  <div v-if="item.viewp === 1" class="nmember">
                    <small>สำหรับสมาชิกเท่านั้น</small>
                  </div>
                </figure>
              </div>
            </div>
          </div>
        </section>
        <section class="p-md">
          <div class="columns is-mobile is-multiline">
            <div class="column is-8-tablet is-full-mobile">
              <h1 class="has-text-centered-mobile is-size-5">
                <strong>{{ item.title }}</strong>
              </h1>
            </div>
            <div class="column is-4-tablet is-full-mobile has-text-right has-text-centered-mobile">
              <b-dropdown aria-role="list" position="is-top-right">
                <template #trigger>
                  <b-button label="แชร์" class="button is-fullwidth" icon-left="share-variant"  type="is-text" />
                </template>
                <b-dropdown-item aria-role="listitem">
                  <a :href="'https://www.facebook.com/sharer/sharer.php?u=https://www.edenra.com'+this.$router.currentRoute.path" target="_blank">
                    <b-button icon-left="facebook" class="fab-facebook m-x-sm has-text-white" rounded expanded>Facebook</b-button>
                  </a>
                </b-dropdown-item>
                <b-dropdown-item aria-role="listitem">
                  <a :href="'https://twitter.com/intent/tweet?text='+item.title+'!&url=https://www.edenra.com'+this.$route.fullPath" target="_blank">
                    <b-button icon-left="twitter" class="fab-twitter m-x-sm has-text-white" rounded expanded>Twitter</b-button>
                  </a>
                </b-dropdown-item>
                <b-dropdown-item aria-role="listitem">
                  <b-button @click.stop.prevent="copyURL" icon-left="link" class="m-x-sm" rounded expanded>Copy URL</b-button>
                </b-dropdown-item>
              </b-dropdown>
              <b-button class="button textgreen" type="is-text" icon-left="emoticon">
                ชอบ
              </b-button>
              <b-button class="button textblue" type="is-text" icon-left="emoticon-neutral">
                เฉยๆ
              </b-button>
              <b-button class="button textred" type="is-text" icon-left="emoticon-dead">
                ไม่ชอบ
              </b-button>
            </div>
          </div>
        </section>
        <section class="p-md">
          <div class="columns is-mobile is-multiline">
            <div class="column is-3-tablet is-full-mobile">
              <b-collapse
                class="card"
                animation="slide"
                aria-id="video-show"
              >
                <template #trigger="props">
                  <div
                    class="card-header"
                    role="button"
                    aria-controls="video-show"
                  >
                    <p class="card-header-title text-red">รายการ</p>
                    <a class="card-header-icon">
                      <b-icon
                        :icon="props.open ? 'menu-down' : 'menu-up'"
                      >
                      </b-icon>
                    </a>
                  </div>
                </template>
                <div class="card-content">
                  <nuxt-link :to="{name: 'video-show-slug',params: { slug: show.slug }}" :title="show.name">
                    <figure class="image is-4by5">
                      <img
                        :src="$blobimg(show.poster_images.enimages)"
                        :alt="show.title"
                        @load="onLoaded"
                      />
                    </figure>
                    <h3 class="title is-size-6-touch is-size-5-desktop has-text-centered m-t-md">
                      {{ show.name }}
                    </h3>
                  </nuxt-link>
                </div>
              </b-collapse>
            </div>
            <div class="column is-9-tablet is-full-mobile wb">
              <b-collapse
                class="card h100"
                animation="slide"
                aria-id="video-description"
              >
                <template #trigger="props">
                  <div
                    class="card-header"
                    role="button"
                    aria-controls="video-description"
                  >
                    <p class="card-header-title text-red">รายละเอียดวิดีโอ</p>
                    <a class="card-header-icon">
                      <b-icon
                        :icon="props.open ? 'menu-down' : 'menu-up'"
                      >
                      </b-icon>
                    </a>
                  </div>
                </template>
                <div class="card-content">
                  <div class="content">
                    <div v-html="item.description"></div>
                  </div>
                </div>
              </b-collapse>
            </div>
          </div>
        </section>
      </div>
      <div v-else class="container p-y-lg p-x-md">
        <h3 class="title has-text-centered p-y-lg p-x-md">ไม่มีวิดีโอดังกล่าว</h3>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Base64 } from 'js-base64'
export default {
  async fetch() {
    this.item = await fetch(
      `${this.$axios.defaults.baseURL}api/video/${this.$route.params.slug}/watch/`
    ).then((res) => res.json())
    if (this.item.title) {
      this.title = this.item.title
      this.description = this.item.description
      this.show = await fetch(
        `${this.$axios.defaults.baseURL}api/video/showsdetails/${this.item.showname.slug}/`
      )
        .then((res) => res.json())
        .catch((e) => {
          return []
        })
    } else {
      this.title = 'Edenra - ไม่มีวิดีโอดังกล่าว'
      this.description = 'ไม่มีวิดีโอดังกล่าว'
      this.show = []
    }
  },
  data() {
    return {
      item: [],
      show: [],
      comments: [],
      rate: [],
      smile: 0,
      meh: 0,
      frown: 0,
      commentTextarea: '',
      errors: [],
      isLoading: true,
      title: 'Edenra - ไม่มีวิดีโอดังกล่าว',
      description: 'ไม่มีวิดีโอดังกล่าว',
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser', 'ipv4user']),
  },
  methods: {
    /*
    playing() {
      const id = this.item.id
      const ip = this.ipv4user
      this.logs_video({ id, ip })
        .then((response) => {
          if (response.data.uip && response.data.views) {
            document.getElementById('uip').innerHTML = response.data.uip
            document.getElementById('views').innerHTML = response.data.views
          }
        })
        .catch((e) => {
          this.errors.push(e)
        })
    },
    */
    copyURL() {
      const aux = document.createElement('input')
      aux.setAttribute('value', window.location.href)
      document.body.appendChild(aux)
      aux.select()
      document.execCommand('copy')
      document.body.removeChild(aux)
      this.$buefy.toast.open({message: 'Copy URL เรียบร้อยแล้ว',type: 'is-success'})
    },
    b64_to_utf8(str) {
      str = str.replace(/\s/g, '')
      return decodeURIComponent(escape(Base64.atob(str)))
    },
    /*
    RateVideo(vrate) {
      const token = JSON.parse(localStorage.getItem('token'))
      const ip = this.ipv4user
      const user = token || ''
      const video = this.item.slug
      const rate = vrate
      this.rate_video({ user, video, rate, ip })
        .then((response) => {
          const slug = 'rates'
          const params = String(this.$route.params.slug)
          this.get_video({ slug, params })
            .then((response) => {
              this.rate = response.data
              if (this.rate) {
                this.smile = this.rate.filter(
                  (rate) => rate.like === true
                ).length
                this.meh = this.rate.filter(
                  (rate) => rate.normal === true
                ).length
                this.frown = this.rate.filter(
                  (rate) => rate.dislike === true
                ).length
              }
            })
            .catch((e) => {
              this.errors.push(e)
            })
        })
        .catch((e) => {
          this.errors.push(e)
        })
    },
    CommentSubmit() {
      const token = JSON.parse(localStorage.getItem('token'))
      const ip = this.ipv4user
      const user = token || ''
      const video = this.item.slug
      const comment = this.commentTextarea
      this.post_comment_video({ user, video, comment, ip })
        .then((response) => {
          if (response.data.status === 406 && user) {
            this.commentTextarea = ''
            Toast.open({
              message: 'แสดงความคิดเห็นได้ 5 นาทีต่อครั้ง',
              type: 'is-danger',
            })
          } else if (response.data.status === 406) {
            this.commentTextarea = ''
            Toast.open({
              message: 'แสดงความคิดเห็นได้ 30 วันต่อครั้ง',
              type: 'is-danger',
            })
          } else {
            const slug = 'comments'
            const params = String(this.$route.params.slug)
            this.get_video({ slug, params })
              .then((response) => {
                this.commentTextarea = ''
                this.comments = response.data
              })
              .catch((e) => {
                this.commentTextarea = ''
                this.errors.push(e)
              })
          }
        })
        .catch((e) => {
          this.commentTextarea = ''
          this.errors.push(e)
        })
    },
    CommentReset() {
      this.commentTextarea = ''
      document.getElementById('commentTextarea').value = ''
    },
    CommentDelete(cid) {
      const token = JSON.parse(localStorage.getItem('token'))
      const id = cid
      this.del_comment_video({ token, id })
        .then((response) => {
          const slug = 'comments'
          const params = String(this.$route.params.slug)
          this.get_video({ slug, params })
            .then((response) => {
              this.comments = response.data
            })
            .catch((e) => {
              this.errors.push(e)
            })
        })
        .catch((e) => {
          this.errors.push(e)
        })
    },
    */
    dateFormatter(dt) {
      const split = dt.split('T')
      const date = new Date(split[0])
      return (
        date.getDate() +
        ' ' +
        date.toLocaleString('th', { month: 'long' }) +
        ' ' +
        date.getFullYear()
      )
    },
    formatCash(n) {
      if (n < 1e3) return n
      if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K'
      if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M'
      if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B'
      if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T'
    },
    /*
    alsmile() {
      if (this.rate && this.account && this.account.user[0]) {
        return (
          this.rate.filter(
            (rate) =>
              rate.like === true && rate.user.id === this.account.user[0].id
          ).length > 0
        )
      } else {
        return false
      }
    },
    almeh() {
      if (this.rate && this.account && this.account.user[0]) {
        return (
          this.rate.filter(
            (rate) =>
              rate.normal === true && rate.user.id === this.account.user[0].id
          ).length > 0
        )
      } else {
        return false
      }
    },
    alfrown() {
      if (this.rate && this.account && this.account.user[0]) {
        return (
          this.rate.filter(
            (rate) =>
              rate.dislike === true && rate.user.id === this.account.user[0].id
          ).length > 0
        )
      } else {
        return false
      }
    },
    */
    onLoaded() {
      URL.revokeObjectURL(this.src)
    },
  },
  head() {
    return {
      title: 'Edenra - ' + this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Edenra - ' + this.title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.description,
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: 'Edenra - ' + this.title,
        },
        {
          hid: 'apple-mobile-web-app-title',
          property: 'apple-mobile-web-app-title',
          content: 'Edenra - ' + this.title,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Edenra - ' + this.title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.description,
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: 'Edenra - ' + this.title,
        },
      ],
    }
  },
}
</script>
<style scoped>
.content h1:not(:first-child) {
  margin-top: 0.5em;
}

.video-container {
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 30px;
  height: 0;
  overflow: hidden;
}

.video-container iframe,
.video-container object,
.video-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.smember {
  position: absolute;
  width: 100%;
  bottom: 50%;
  left: 0;
  z-index: 2;
  text-align: center;
  color: #ff6663;
  font-size: 300%;
  padding: 0.25rem 0;
  background-color: #000;
}

.nmember {
  position: absolute;
  width: 100%;
  bottom: 50%;
  left: 0;
  z-index: 2;
  text-align: center;
  color: #ff6663;
  font-size: 300%;
  padding: 0.25rem 0;
  background-color: #000;
}

.button.is-text {
  text-decoration: none;
}

.textgreen {
  color: #719f40 !important;
}

.textred {
  color: #ff6663 !important;
}

.textblue {
  color: #70c8c0 !important;
}

.wb {
  word-break: break-all;
}

.content figure {
  margin-left: 0;
  margin-right: 1em;
  text-align: center;
}

.h100 {
  height: 100%;
}

.profile-bg {
  border-radius: 50%;
  position: relative;
  margin-right: 0.25rem;
}

.support {
  background: linear-gradient(
    50deg,
    #719f40,
    #f26f2c 6%,
    #fbc244 24%,
    #70c8c0 80%,
    #f69c86
  );
}

.profile-bg img {
  width: 94%;
  height: 94%;
  max-width: 56px;
  max-height: 56px;
  border-radius: 50%;

  /* -o-object-fit: cover; */
  object-fit: cover;

  /* -o-object-position: 50% 0; */
  object-position: 50% 0;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  /* -webkit-transform: translate(-50%, -50%); */
}

.media + .media {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
}

.content figure:not(:last-child) {
  margin-bottom: 1em;
}
@media screen and (max-width: 768px) {
  .ratebutton {
    border-radius: 2px;
    font-size: 0.85rem;
  }

  .smember {
    font-size: 200%;
    bottom: 35%;
  }

  .nmember {
    font-size: 200%;
    bottom: 35%;
  }
}
</style>
