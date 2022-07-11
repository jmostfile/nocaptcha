<template>
  <div ref="video">
    <div v-if="$fetchState.pending" class="p-y-lg p-x-md">
      <b-loading v-model="isLoading" :is-full-page="true"></b-loading>
    </div>
    <div v-else-if="$fetchState.error" class="p-y-lg p-x-md">
      <h3 class="title has-text-centered">ไม่มีหน้าดังกล่าว</h3>
    </div>
    <div v-else class="columns is-mobile is-multiline is-relative">
      <div class="column is-10">
        <header ref="show" class="card-header bg-ghostwhite">
          <h3 class="card-header-title">
            <b-icon icon="file-document" class="has-text-info m-r-md"></b-icon>
            รายการ
          </h3>
          <nuxt-link
            :to="{
              name: 'video-show',
            }"
            title="ดูทั้งหมด"
            class="card-header-icon is-size-6 has-text-weight-semibold"
            >ดูทั้งหมด</nuxt-link
          >
        </header>
        <div class="columns is-multiline is-mobile p-x-md p-t-md">
          <div
            v-for="(item, key) in computedshowObj"
            :key="key"
            class="column is-half-mobile is-one-fifth-desktop shine"
          >
            <nuxt-link :to="{name: 'video-show-slug',params: { slug: item.slug }}" :title="item.name">
              <figure class="image is-4by5 is-relative has-background-grey-light">
                <template v-if="item.poster_images.enimages">
                  <img
                    :src="$blobimg(item.poster_images.enimages)"
                    :alt="item.name"
                    @load="onLoaded"
                  />
                </template>
                <template v-else>
                  <div class="noimage">
                    <small>ไม่มีรูปภาพ ณ ตอนนี้</small>
                  </div>
                </template>
              </figure>
              <h3 class="title is-size-6-touch is-size-5-desktop has-text-centered m-t-md">
                {{ item.name }}
              </h3>
            </nuxt-link>
          </div>
        </div>
        <header ref="video" class="card-header bg-ghostwhite">
          <h3 class="card-header-title">
            <b-icon icon="video" class="text-green m-r-md"></b-icon>
            วิดีโอ
          </h3>
          <nuxt-link
            :to="{ name: 'video-all'}"
            title="ดูทั้งหมด"
            class="card-header-icon is-size-6 has-text-weight-semibold"
            >ดูทั้งหมด</nuxt-link
          >
        </header>
        <div class="columns is-multiline is-mobile p-x-md p-t-md">
          <div
            v-for="(item, key) in computedvideoObj"
            :key="key"
            class="column is-full-mobile is-4-tablet is-3-desktop is-3-fullhd shine"
            @mouseover="showByIndex = key"
            @mouseout="showByIndex = null"
          >
            <nuxt-link :to="{name: 'video-slug',params: { slug: item.slug }}" :title="item.title">
              <figure class="image is-5by3 is-relative has-background-grey-light">
                <template v-if="item.enimages">
                  <img
                    :src="$blobimg(item.enimages)"
                    :alt="item.title"
                    @load="onLoaded"
                  />
                </template>
                <template v-else>
                  <div class="noimage">
                    <small>ไม่มีรูปภาพ ณ ตอนนี้</small>
                  </div>
                </template>
                <div v-if="item.viewp === 2" class="smember">
                  <small>สำหรับสมาชิกผู้สนับสนุนเท่านั้น</small>
                </div>
                <div v-if="item.viewp === 1" class="nmember">
                  <small>สำหรับสมาชิกเท่านั้น</small>
                </div>
                <div v-show="showByIndex === key" class="hover has-text-white">
                  <span class="icon is-large">
                    <b-icon icon="play" size="is-large"></b-icon>
                  </span>
                </div>
              </figure>
              <h3
                class="
                  title
                  is-size-6-touch is-size-5-desktop
                  p-y-md
                  has-text-centered
                "
              >
                {{ item.title }}
              </h3>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="column is-2 p-l-none-mobile">
        <aside class="is-paddingless sticky">
          <p class="menu-label is-hidden-touch">หมวดหมู่</p>
          <ul class="menu-list">
            <li>
              <a @click="goto('show')">
                <b-icon icon="file-document" class="has-text-info" />
                <span class="is-hidden-mobile">รายการ</span>
              </a>
            </li>
            <li>
              <a @click="goto('video')">
                <b-icon icon="video" class="text-green" />
                <span class="is-hidden-mobile">วิดีโอ</span>
              </a>
            </li>
            <li>
              <a @click="goto('video')">
                <b-icon icon="arrow-up-bold-box" class="has-text-grey-dark" />
                <span class="is-hidden-mobile">เลื่อนขึ้นบน</span>
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: [],
      video: [],
      showByIndex: null,
      isLoading: true,
    }
  },
  async fetch() {
    this.show = await fetch(
      `${this.$axios.defaults.baseURL}api/video/shows/all/`
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
  },
  computed: {
    computedshowObj() {
      const showlimit = 10
      return showlimit ? this.show.slice(0, showlimit) : this.show
    },
    computedvideoObj() {
      const videolimit = 10
      return videolimit ? this.video.slice(0, videolimit) : this.video
    },
  },
  methods: {
    goto(refName) {
      const element = this.$refs[refName]
      const top = element.offsetTop

      window.scrollTo(0, top)
    },
    dateFormatter(dt) {
      const split = dt.split('-')
      return split[2] + '/' + split[1] + '/' + split[0]
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

.shine::after {
  content: '';
  clear: both;
  display: block;
}

.shine {
  position: relative;
}

.shine figure {
  position: relative;
  margin: 0;
  background: #fff;
  overflow: hidden;
}

.shine figure::before {
  position: absolute;
  top: 0;
  left: -80%;
  z-index: 2;
  display: block;
  content: '';
  width: 50%;
  height: 100%;

  /*
  background: -webkit-linear-gradient(
    left,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.3) 100%
  );
  -webkit-transform: skewX(-25deg); */
  background: linear-gradient( to right, rgb(255 255 255 / 0%) 0%, rgb(255 255 255 / 30%) 100%);
  transform: skewX(-25deg);
}

.shine figure:hover::before {
  /* -webkit-animation: shine 0.75s; */
  animation: shine 0.75s;
}

/*
@-webkit-keyframes shine {
  100% {
    left: 125%;
  }
}
*/
@keyframes shine {
  100% {
    left: 125%;
  }
}

.smember {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 2;
  text-align: center;
  color: #fff;
  padding: 0.25rem 0;
  background-color: hsl(0deg 0% 29% / 50%);
}

.nmember {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 2;
  text-align: center;
  color: #fff;
  padding: 0.25rem 0;
  background-color: hsl(0deg 0% 29% / 50%);
}

.hover {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  text-shadow: 0 0 4px #000;
}

.noimage {
  position: absolute;
  width: 100%;
  top: 40%;
  left: 0;
  z-index: 2;
  text-align: center;
  color: #fff;
  padding: 0.25rem 0;
}
@media screen and (max-width: 768px) {
  .sticky {
    top: calc(100vh - 14rem);
  }
}
</style>
<style>
@media screen and (max-width: 768px) {
  .menu-list a:hover {
    background-color: transparent;
  }
}
</style>
