<template>
  <section class="m-b-lg">
    <div class="columns is-mobile is-multiline is-relative bg-ghostwhite p-b-lg">
      <div class="column is-half">
        <h3 v-if="type===1" class="title p-x-md p-y-sm text-red">สารบัญ</h3>
        <h3 v-if="type===2" class="title p-x-md p-y-sm text-red">วิดีโอ</h3>
      </div>
      <div class="column is-half has-text-right">
        <b-tooltip position="is-bottom" type="is-light" animated>
          <b-button type="is-ghost" class="button" @click="SortDate()">
            <b-icon v-show="sort_date" icon="sort-reverse-variant"></b-icon>
            <b-icon v-show="!sort_date" icon="sort-variant"></b-icon>
          </b-button>
          <template v-slot:content>
            <span v-show="sort_date">เรียงตามตอน (เก่า - ใหม่)</span>
            <span v-show="!sort_date">เรียงตามตอน (ใหม่ - เก่า)</span>
          </template>
        </b-tooltip>
      </div>
      <template v-if="Array.isArray(contentcatlist) && contentcatlist.length">
        <template v-if="type===1">
          <template v-if="Array.isArray(support_item) && support_item.length">
            <div v-for="(mcontent,i) in support_item" :key="i" class="column is-full-mobile is-half-tablet p-x-md p-y-sm">
              <li class="menu-list has-text-link box">
                <nuxt-link v-if="catparams" :to="{ name: nuxtlinkname,params: { category: mcontent.category.slug,slug: mcontent.slug }}" :title="mcontent.title">
                  {{ mcontent.title }}
                  <span class="is-pulled-right">
                    <b-tooltip label="เฉพาะสมาชิกผู้สนับสนุน">
                      <b-icon icon="account-star" class="text-gold"></b-icon>
                    </b-tooltip>
                  </span>
                </nuxt-link>
                <nuxt-link v-else :to="{ name: nuxtlinkname,params: { slug: mcontent.slug }}" :title="mcontent.title">
                  {{ mcontent.title }}
                  <span class="is-pulled-right">
                    <b-tooltip label="เฉพาะสมาชิกผู้สนับสนุน">
                      <b-icon icon="account-star" class="text-gold"></b-icon>
                    </b-tooltip>
                  </span>
                </nuxt-link>
              </li>
            </div>
          </template>
          <template v-if="Array.isArray(member_item) && member_item.length">
            <div v-for="(mcontent,j) in member_item" :key="j" class="column is-full-mobile is-half-tablet p-x-md p-y-sm">
              <li class="menu-list has-text-link box">
                <nuxt-link v-if="catparams" :to="{ name: nuxtlinkname,params: { category: mcontent.category.slug,slug: mcontent.slug }}" :title="mcontent.title">
                  {{ mcontent.title }}
                  <span class="is-pulled-right">
                    <b-tooltip label="เฉพาะสมาชิก">
                      <b-icon icon="account" class="text-green"></b-icon>
                    </b-tooltip>
                  </span>
                </nuxt-link>
                <nuxt-link v-else :to="{ name: nuxtlinkname,params: { slug: mcontent.slug }}" :title="mcontent.title">
                  {{ mcontent.title }}
                  <span class="is-pulled-right">
                    <b-tooltip label="เฉพาะสมาชิก">
                      <b-icon icon="account" class="text-green"></b-icon>
                    </b-tooltip>
                  </span>
                </nuxt-link>
              </li>
            </div>
          </template>
          <template v-if="Array.isArray(free_item) && free_item.length">
            <div v-for="(mcontent,k) in free_item" :key="k" class="column is-full-mobile is-half-tablet p-x-md p-y-sm">
              <li class="menu-list has-text-link box">
                <nuxt-link v-if="catparams" :to="{ name: nuxtlinkname,params: { category: mcontent.category.slug,slug: mcontent.slug }}" :title="mcontent.title">
                  {{ mcontent.title }}
                </nuxt-link>
                <nuxt-link v-else :to="{ name: nuxtlinkname,params: { slug: mcontent.slug }}" :title="mcontent.title">
                  {{ mcontent.title }}
                </nuxt-link>
              </li>
            </div>
          </template>
          <div v-show="contentcatlist.length % 2 > 0" class="column is-full-mobile is-half-tablet p-x-md p-y-sm"></div>
        </template>
        <template v-if="type===2">
          <div v-for="(item, i) in contentcatlist" :key="i" class="column is-full-mobile is-3-tablet shine" @mouseover="showByIndex = i" @mouseout="showByIndex = null">
            <div class="p-md">
              <nuxt-link
                :to="{
                  name: 'video-slug',
                  params: { slug: item.slug },
                }"
                :title="item.title"
              >
                <figure class="image is-5by3 is-relative">
                  <img :src="$blobimg(item.enimages)" :alt="item.title" @load="onLoaded" />
                  <div v-if="item.viewp === 2" class="smember">
                    <small>สำหรับสมาชิกผู้สนับสนุนเท่านั้น</small>
                  </div>
                  <div v-if="item.viewp === 1" class="nmember">
                    <small>สำหรับสมาชิกเท่านั้น</small>
                  </div>
                  <div v-show="showByIndex === i" class="hover has-text-white">
                    <span class="icon is-large">
                      <b-icon icon="play" size="is-large"></b-icon>
                    </span>
                  </div>
                </figure>
                <h3 class="title p-y-md is-size-6-touch is-size-5-desktop is-size-4-fullhd has-text-centered-mobile">
                  {{ item.title }}
                </h3>
              </nuxt-link>
            </div>
          </div>
        </template>
      </template>
      <template v-else>
        <div class="column is-full p-y-lg p-x-md">
          <h3 v-if="type===1" class="title has-text-centered">ยังไม่มีข้อมูล</h3>
          <h3 v-if="type===2" class="title has-text-centered">ไม่มีวิดีโอ</h3>
        </div>
      </template>
    </div>
  </section>
</template>
<script>
export default {
  name: 'ContentList',
  props: {
    contentcatlist: Array,
    type: {
      type: Number,
      default: 1,
    },
    nuxtlinkname: {
      type: String,
      default: '',
    },
    catparams: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      sort_date: false,
      sorting_date: -1,
      showByIndex: null,
    }
  },
  computed: {
    support_item() {
      return this.contentcatlist.filter((contentcatlist) => contentcatlist.viewp === 2)
    },
    member_item() {
      return this.contentcatlist.filter((contentcatlist) => contentcatlist.viewp === 1)
    },
    free_item() {
      return this.contentcatlist.filter((contentcatlist) => contentcatlist.viewp === 0)
    },
  },
  methods: {
    SortDate() {
      this.sort_date = !this.sort_date
      this.sorting_date *= -1
      this.free_item.sort((a, b) =>
        a.created_on < b.created_on ? this.sorting_date : -this.sorting_date
      )
    },
    onLoaded() {
      URL.revokeObjectURL(this.src)
    },
  },
}
</script>
<style scoped>
.title {
  font-size: 1.25em;
  font-weight: 600;
  line-height: 1.125;
  margin-bottom: 0.75rem !important;
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

  /* background: -webkit-linear-gradient(
    left,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.3) 100%
  );
  -webkit-transform: skewX(-25deg); */
  background: linear-gradient( to right,rgb(255 255 255 / 0%) 0%,rgb(255 255 255 / 30%) 100%);
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

.hover {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  text-shadow: 0 0 4px #000;
}
</style>
