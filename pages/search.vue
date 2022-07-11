<template>
  <div class="container">
    <div v-if="$fetchState.pending" class="p-y-lg p-x-md">
      <b-loading v-model="isLoading" :is-full-page="true"></b-loading>
    </div>
    <div v-else-if="$fetchState.error" class="p-y-lg p-x-md">
      <h3 class="title has-text-centered">เกิดข้อผิดพลาดในการเรียกข้อมูล</h3>
    </div>
    <div v-else>
      <div
        v-if="Array.isArray(sdata) && sdata.length"
        class="columns is-mobile is-multiline p-md m-y-md searchresult"
      >
        <div
          v-for="(item, i) in sdata"
          :key="i"
          class="column is-12-mobile is-12-tablet m-b-md"
        >
          <div class="box bg-ghostwhite is-paddingless">
            <article class="columns is-mobile is-multiline is-vcentered">
              <div v-if="item.ssimg" class="column is-5-mobile is-narrow">
                <nuxt-link :to="{ path: item.url }" :title="item.ntitle">
                  <figure class="image is-3by2">
                    <img
                      :src="$blobimg(item.ssimg)"
                      :alt="item.ntitle"
                      @load="onLoaded"
                    />
                  </figure>
                </nuxt-link>
              </div>
              <div
                v-if="item.ssimg"
                class="column is-7-mobile is-paddingless"
              >
                <div class="content">
                  <p class="m-b-none">
                    <nuxt-link
                      :to="{ path: item.url }"
                      :title="item.ntitle"
                      class="is-size-6-tablet is-size-4-fullhd"
                    >
                      <h5 class="m-b-none">
                        <strong>{{ item.ntitle }}</strong>
                      </h5>
                    </nuxt-link>
                  </p>
                </div>
              </div>
              <div v-else class="column is-full-mobile">
                <div class="content">
                  <p class="p-md is-marginless">
                    <nuxt-link
                      :to="{ path: item.url }"
                      :title="item.ntitle"
                      class="is-size-6-tablet is-size-4-fullhd"
                    >
                      <h5 class="m-b-none">
                        <strong>{{ item.ntitle }}</strong>
                      </h5>
                    </nuxt-link>
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
      <div v-else v-show="!emsgs" class="columns is-mobile is-centered">
        <p class="column is-12-mobile is-12-tablet p-x-lg m-y-lg has-text-centered msg_form">
          <b-message type="is-danger">
            <p>ไม่พบข้อมูลในการค้นหา กรุณาใส่ข้อมูลที่จะค้นหาใหม่อีกครั้ง</p>
          </b-message>
        </p>
      </div>
    </div>
    <div v-show="emsgs" class="columns is-mobile is-centered">
      <p class="column is-12-mobile is-12-tablet p-x-lg m-y-lg has-text-centered msg_form">
        <b-message type="is-danger">
          <p>{{ emsg }}</p>
        </b-message>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchPage',
  async fetch() {
    if (this.$store.getters.search.q) {
      let category = ''
      if(this.$store.getters.search.c){
        category = this.$store.getters.search.c
      }
      await this.$axios
        .$get(`/api/search/?q=${decodeURI(this.$store.getters.search.q)}&c=${decodeURI(category)}`)
        .then((response) => {
          this.emsgs = false
          this.title = this.$store.getters.search.q
          this.sdata = response
          if (!response) {
            this.emsgs = true
            this.emsg =
              'ไม่พบข้อมูลในการค้นหา กรุณาใส่ข้อมูลที่จะค้นหาใหม่อีกครั้ง'
          }
        })
        .catch((e) => {
          this.errors.push(e)
        })
    } else {
      this.emsgs = true
      this.emsg = 'ไม่พบข้อมูลในการค้นหา กรุณาใส่ข้อมูลที่จะค้นหาใหม่อีกครั้ง'
    }
  },
  data() {
    return {
      sdata: [],
      emsgs: false,
      emsg: '',
      title: '',
      isLoading: true,
    }
  },
  computed: {},
  watch: {
    '$store.state.search': {
      deep: true,
      handler() {
        this.emsgs = false
        this.$fetch()
      }
    }
  },
  created() {},
  methods: {
    onLoaded() {
      URL.revokeObjectURL(this.src)
    },
  },
  head() {
    return {
      title: 'ค้นหา ' + this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Edenra.com แหล่งรวมสาระความบันเทิงรูปแบบใหม่ พบกับ Exclusive Content ที่เราได้สร้างสรรขึ้นมาเพื่อพวกคุณโดยเฉพาะ เรามี Content อันหลากหลายที่คุณสามารถเลือก อ่าน ฟัง ดู เล่น ได้ตามความชอบของคุณ หวังว่าคุณจะได้รับความสุข ความสนุกสนาน และสิ่งดีๆจากที่แห่งนี้',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'ค้นหา ' + this.title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'Edenra.com แหล่งรวมสาระความบันเทิงรูปแบบใหม่ พบกับ Exclusive Content ที่เราได้สร้างสรรขึ้นมาเพื่อพวกคุณโดยเฉพาะ เรามี Content อันหลากหลายที่คุณสามารถเลือก อ่าน ฟัง ดู เล่น ได้ตามความชอบของคุณ หวังว่าคุณจะได้รับความสุข ความสนุกสนาน และสิ่งดีๆจากที่แห่งนี้',
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: 'ค้นหา ' + this.title,
        },
        {
          hid: 'apple-mobile-web-app-title',
          property: 'apple-mobile-web-app-title',
          content: 'ค้นหา ' + this.title,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'ค้นหา ' + this.title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Edenra.com แหล่งรวมสาระความบันเทิงรูปแบบใหม่ พบกับ Exclusive Content ที่เราได้สร้างสรรขึ้นมาเพื่อพวกคุณโดยเฉพาะ เรามี Content อันหลากหลายที่คุณสามารถเลือก อ่าน ฟัง ดู เล่น ได้ตามความชอบของคุณ หวังว่าคุณจะได้รับความสุข ความสนุกสนาน และสิ่งดีๆจากที่แห่งนี้',
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: 'ค้นหา ' + this.title,
        },
      ],
    }
  },
}
</script>
<style scoped>
.searchresult article .column {
  padding: 0 0.75rem;
}

.searchresult article .column .content {
  padding: 0;
}

.searchresult article .column .content p {
  margin-bottom: 0.5rem;
}

.searchresult .is-narrow figure {
  width: 20vw;
}
@media screen and (max-width: 768px) {
  .searchresult .is-narrow {
    width: 30% !important;
  }

  .searchresult .is-narrow figure {
    width: 100% !important;
  }

  .searchresult .is-full-mobile .button {
    width: 95% !important;
    margin-bottom: 0.75rem;
    padding: 1.25rem;
  }
}
@media screen and (max-width: 1215px) and (min-width: 1024px) {
  .searchresult .is-narrow figure {
    width: 16vw !important;
  }
}
@media screen and (max-width: 1407px) and (min-width: 1216px) {
  .searchresult .is-narrow figure {
    width: 16vw !important;
  }
}
@media screen and (min-width: 1408px) {
  .searchresult .is-narrow figure {
    width: 16vw !important;
  }
}
@media screen and (min-width: 1600px) {
  .searchresult .is-narrow figure {
    width: 14vw !important;
  }
}
</style>
