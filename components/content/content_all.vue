<template>
    <div class="columns is-mobile is-multiline is-relative">
        <div class="column is-full">
        <header class="card-header bg-ghostwhite">
            <h3 class="card-header-title">
            <b-icon :icon="icon" :class="iconclass"></b-icon>
            <span class="m-l-md">{{ title }}</span>
            </h3>
            <div class="card-header-icon">
            <b-tooltip position="is-bottom" type="is-light" animated>
            <b-button type="is-ghost" class="button" @click="SortDate()">
                <b-icon v-show="sort_date" icon="sort-calendar-descending"></b-icon>
                <b-icon v-show="!sort_date" icon="sort-calendar-ascending"></b-icon>
            </b-button>
            <template v-slot:content>
                <span v-show="sort_date">เรียงตามวันที่ (ใหม่ - เก่า)</span>
                <span v-show="!sort_date">เรียงตามวันที่ (เก่า - ใหม่)</span>
            </template>
            </b-tooltip>
            <b-tooltip v-if="catparams" position="is-bottom" type="is-light" animated>
            <b-button type="is-ghost" class="button" @click="SortNamecat()">
                <b-icon v-show="sort_name" icon="sort-alphabetical-descending"></b-icon>
                <b-icon v-show="!sort_name" icon="sort-alphabetical-ascending"></b-icon>
            </b-button>
            <template v-slot:content>
                <span v-show="sort_name">เรียงตามชื่อ (Z - A)</span>
                <span v-show="!sort_name">เรียงตามชื่อ (A - Z)</span>
            </template>
            </b-tooltip>
            <b-tooltip v-else position="is-bottom" type="is-light" animated>
            <b-button type="is-ghost" class="button" @click="SortName()">
                <b-icon v-show="sort_name" icon="sort-alphabetical-descending"></b-icon>
                <b-icon v-show="!sort_name" icon="sort-alphabetical-ascending"></b-icon>
            </b-button>
            <template v-slot:content>
                <span v-show="sort_name">เรียงตามชื่อ (Z - A)</span>
                <span v-show="!sort_name">เรียงตามชื่อ (A - Z)</span>
            </template>
            </b-tooltip>
            </div>
        </header>
        <div class="columns is-multiline is-mobile p-x-md p-t-md">
            <template v-if="type!==3">
              <div v-for="(item, key) in computedObj" :key="key" class="column is-half-mobile is-one-fifth-desktop shine">
              <nuxt-link v-if="catparams" :to="{ name: nuxtlinkname,params: { category: item.slug }}" :title="item.name">
                  <figure v-if="type===1" class="image is-4by5 is-relative has-background-grey-light">
                    <template v-if="item.poster_images">
                      <img :src="$blobimg(item.poster_images.enimages)" :alt="item.name" @load="onLoaded" />
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
                  </figure>
                  <figure v-if="type===2" class="image is-5by3 is-relative has-background-grey-light">
                    <template v-if="item.poster_images">
                      <img :src="$blobimg(item.poster_images.enimages)" :alt="item.name" @load="onLoaded" />
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
                  </figure>
                  <h3 class="title is-size-6-touch is-size-5-desktop has-text-centered m-t-md">
                  {{ item.name }}
                  </h3>
              </nuxt-link>
              <nuxt-link v-else :to="{ name: nuxtlinkname,params: { slug: item.slug }}" :title="item.title || item.name">
                  <figure v-if="type===1" class="image is-4by5 is-relative has-background-grey-light">
                    <template v-if="item.poster_images.enimages">
                      <img :src="$blobimg(item.poster_images.enimages)" :alt="item.title || item.name" @load="onLoaded" />
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
                  </figure>
                  <figure v-if="type===2" class="image is-5by3 is-relative has-background-grey-light">
                    <template v-if="item.poster_images">
                      <img :src="$blobimg(item.poster_images.enimages)" :alt="item.title || item.name" @load="onLoaded" />
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
                  </figure>
                  <h3 class="title is-size-6-touch is-size-5-desktop has-text-centered m-t-md">
                  {{ item.title || item.name }}
                  </h3>
              </nuxt-link>
              </div>
            </template>
            <template v-else>
              <div v-for="(item, key) in computedObj" :key="key" class="column is-full-mobile is-4-tablet is-3-desktop is-3-fullhd shine"
                @mouseover="showByIndex = key"
                @mouseout="showByIndex = null"
              >
                <nuxt-link :to="item.slug" :title="item.title">
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
                  <h3 class="title is-size-6-touch is-size-5-desktop p-y-md has-text-centered">
                    {{ item.title }}
                  </h3>
                </nuxt-link>
              </div>
            </template>
        </div>
        <div v-if="content.length > contentLimit" class="panel-block">
            <button v-if="contentLimit > content.length" class="button bg-ghostwhite is-fullwidth" disabled>
                ไม่มีข้อมูลมากกว่านี้
            </button>
            <button v-else class="button bg-ghostwhite is-fullwidth" @click="contentLimit = contentLimit + 24">
                ดูมากขึ้น
            </button>
        </div>
        <div v-if="content.length < 12" class="m-b-xxl p-b-xxl"><div class="m-b-xxl p-b-xxl"></div></div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'ContentAll',
  props: {
    content: Array,
    icon: {
      type: String,
      default: 'note-text-outline',
    },
    iconclass: {
      type: String,
      default: 'has-text-info',
    },
    title: {
      type: String,
      default: '',
    },
    nuxtlinkname: {
      type: String,
      default: '',
    },
    catparams: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: Number,
      default: 24,
    },
    type: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      sort_date: false,
      sort_name: false,
      sorting_date: 1,
      sorting_name: -1,
      showByIndex: null,
      contentObj: this.content,
      contentLimit: this.limit
    }
  },
  computed: {
    computedObj() {
      return this.limit ? this.contentObj.slice(0, this.limit) : this.contentObj
    },
  },
  methods: {
    SortDate() {
      this.sort_date = !this.sort_date
      this.sorting_date *= -1
      this.contentObj.sort((a, b) =>
        a.created_on < b.created_on ? this.sorting_date : -this.sorting_date
      )
    },
    SortName() {
      this.sort_name = !this.sort_name
      this.sorting_name *= -1
      this.contentObj.sort((a, b) =>
        a.title < b.title ? this.sorting_name : -this.sorting_name
      )
    },
    SortNamecat() {
      this.sort_name = !this.sort_name
      this.sorting_name *= -1
      this.contentObj.sort((a, b) =>
        a.name < b.name ? this.sorting_name : -this.sorting_name
      )
    },
    onLoaded() {
      URL.revokeObjectURL(this.src)
    },
  },
}
</script>
<style scoped>
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

.noimage {
  position: absolute;
  width: 100%;
  top: 45%;
  left: 0;
  z-index: 2;
  text-align: center;
  color: #fff;
  padding: 0.25rem 0;
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
</style>
