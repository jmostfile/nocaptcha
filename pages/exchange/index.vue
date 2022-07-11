<template>
  <div class="container con95">
    <section class="p-y-lg p-x-md">
      <div class="columns is-mobile p-x-md is-paddingless">
        <div class="column">
          <h2 class="title is-size-5-mobile">ของทั้งหมด</h2>
        </div>
        <div class="column sort has-text-right is-8-mobile">
          <b-tooltip
            id="sortdate"
            label="เรียงตามวันที่ (ใหม่ - เก่า)"
            position="is-bottom"
            type="is-light"
            animated
          >
            <b-button class="button m-r-sm" @click="SortDate()">
              <b-icon v-show="sort_date" icon="sort-calendar-descending"></b-icon>
              <b-icon v-show="!sort_date" icon="sort-calendar-ascending"></b-icon>
            </b-button>
          </b-tooltip>
          <b-tooltip
            id="sortname"
            label="เรียงตามชื่อ (A - Z)"
            position="is-bottom"
            type="is-light"
            animated
          >
            <b-button class="button m-r-sm" @click="SortName()">
              <b-icon v-show="sort_name" icon="sort-alphabetical-descending"></b-icon>
              <b-icon v-show="!sort_name" icon="sort-alphabetical-ascending"></b-icon>
            </b-button>
          </b-tooltip>
          <b-tooltip
            id="sortprice"
            label="เรียงตามราคา (น้อย - มาก)"
            position="is-bottom"
            type="is-light"
            animated
          >
            <b-button class="button" @click="SortPrice()">
              <b-icon v-show="sort_price" icon="sort-descending"></b-icon>
              <b-icon v-show="!sort_price" icon="sort-ascending"></b-icon>
            </b-button>
          </b-tooltip>
        </div>
      </div>
      <div v-if="$fetchState.pending" class="p-y-lg p-x-md">
        <b-loading v-model="isLoading" :is-full-page="true"></b-loading>
      </div>
      <div v-else-if="$fetchState.error" class="p-y-lg p-x-md">
        <h3 class="title has-text-centered">ไม่มีของให้แลกเปลี่ยน</h3>
      </div>
      <div v-else>
        <div
          v-if="Array.isArray(exchange) && exchange.length"
          class="columns is-multiline is-mobile"
        >
          <div
            v-for="(item, i) in exchange"
            :key="i"
            class="column itemlink is-half-mobile is-4-tablet is-3-desktop is-2-fullhd initem"
          >
            <nuxt-link
              :to="{ name: 'exchange-slug', params: { slug: item.slug } }"
              :title="item.title"
            >
              <div class="itemimg">
                <figure class="image is-square">
                  <img
                    :src="$blobimg(item.enimages)"
                    :alt="item.title"
                    @load="onLoaded"
                  />
                </figure>
              </div>
              <div class="columns is-multiline is-mobile is-marginless">
                <div
                  class="column is-half p-l-none p-r-none is-size-7-mobile"
                >
                  <b-tooltip
                    label="จำนวนแอปเปิ้ลที่ใช้แลกเปลี่ยน"
                    position="is-bottom"
                    type="is-light"
                    animated
                  >
                    <b-icon class="text-gold" icon="food-apple"></b-icon>
                    <span id="gapple" class="m-l-sm">{{
                      formatCash(item.price)
                    }}</span>
                  </b-tooltip>
                </div>
                <div
                  class="column is-half has-text-right p-l-none p-r-none is-size-7-mobile"
                >
                  <b-tooltip
                    label="จำนวนของที่เหลือ"
                    position="is-bottom"
                    type="is-light"
                    animated
                  >
                    <b-icon class="text-green" icon="package-variant-closed"></b-icon>
                    <span class="m-l-sm">{{
                      stock(item.stock, item.limited)
                    }}</span>
                  </b-tooltip>
                </div>
              </div>
              <h3
                class="is-size-6-touch is-size-5-desktop is-size-5-fullhd has-text-centered m-t-xs"
              >
                {{ item.title }}
              </h3>
            </nuxt-link>
          </div>
        </div>
        <div v-else class="p-y-lg p-x-md">
          <h3 class="title has-text-centered">ไม่มีของให้แลกเปลี่ยน</h3>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  name: 'ExchangeIndexPage',
  data() {
    return {
      exchange: [],
      errors: [],
      sort_date: false,
      sort_name: false,
      sort_price: false,
      sorting_date: 1,
      sorting_name: -1,
      sorting_price: -1,
      isLoading: true,
    }
  },
  async fetch() {
    this.exchange = await fetch(
      `${this.$axios.defaults.baseURL}api/exchange/all/`
    ).then((res) => res.json())
  },
  head() {
    return {
      title: 'Edenra - แลกเปลี่ยน',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'ศูนย์แลกเปลี่ยนแอปเปิ้ลสีทองเป็นสิ่งที่คุณต้องการ ไม่ว่าจะเป็นของที่ใช้ภายใน Website ของภายนอก Website และอื่นๆ',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Edenra - แลกเปลี่ยน',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'ศูนย์แลกเปลี่ยนแอปเปิ้ลสีทองเป็นสิ่งที่คุณต้องการ ไม่ว่าจะเป็นของที่ใช้ภายใน Website ของภายนอก Website และอื่นๆ',
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: 'Edenra - แลกเปลี่ยน',
        },
        {
          hid: 'apple-mobile-web-app-title',
          property: 'apple-mobile-web-app-title',
          content: 'Edenra - แลกเปลี่ยน',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Edenra - แลกเปลี่ยน',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'ศูนย์แลกเปลี่ยนแอปเปิ้ลสีทองเป็นสิ่งที่คุณต้องการ ไม่ว่าจะเป็นของที่ใช้ภายใน Website ของภายนอก Website และอื่นๆ',
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: 'Edenra - แลกเปลี่ยน',
        },
      ],
    }
  },
  created() {
    if (!this.$auth.loggedIn) {
      this.$router.push({ name: 'index' })
    }
  },
  methods: {
    SortDate() {
      this.sort_date = !this.sort_date
      this.sorting_date *= -1
      if (this.sort_date) {
        document.querySelector('#sortdate').dataset.label =
          'เรียงตามวันที่ (เก่า - ใหม่)'
      } else {
        document.querySelector('#sortdate').dataset.label =
          'เรียงตามวันที่ (ใหม่ - เก่า)'
      }
      this.exchange.sort((a, b) =>
        a.created_on < b.created_on ? this.sorting_date : -this.sorting_date
      )
    },
    SortName() {
      this.sort_name = !this.sort_name
      this.sorting_name *= -1
      if (this.sort_name) {
        document.querySelector('#sortname').dataset.label =
          'เรียงตามชื่อ (Z - A)'
      } else {
        document.querySelector('#sortname').dataset.label =
          'เรียงตามชื่อ (A - Z)'
      }
      this.exchange.sort((a, b) =>
        a.title < b.title ? this.sorting_name : -this.sorting_name
      )
    },
    SortPrice() {
      this.sort_price = !this.sort_price
      this.sorting_price *= -1
      if (this.sort_price) {
        document.querySelector('#sortprice').dataset.label =
          'เรียงตามราคา (มาก - น้อย)'
      } else {
        document.querySelector('#sortprice').dataset.label =
          'เรียงตามราคา (น้อย - มาก)'
      }
      this.exchange.sort((a, b) =>
        a.price < b.price ? this.sorting_price : -this.sorting_price
      )
    },
    formatCash(n) {
      if (n < 1e3) return n
      if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K'
      if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M'
      if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B'
      if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T'
    },
    stock(stock, limited) {
      if (stock === 0 && !limited) {
        return '∞'
      } else {
        return stock
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
  margin: 0 0 0.5rem;
}

.sort .button .icon:first-child:not(:last-child) {
  margin-right: calc(-0.375em - 1px);
}

.sort .button .icon:last-child:not(:first-child) {
  margin-left: calc(-0.375em - 1px);
}

.sort .sorticon {
  margin-left: calc(-0.375em - 1px);
  margin-right: calc(-0.375em - 1px);
}

.sort .sorticon:last-child:not(:first-child) {
  margin-left: 0 !important;
}

.initem .itemimg {
  padding: 0.5rem;
  border-radius: 6px;
  box-shadow: 0 2px 3px rgb(10 10 10 / 10%), 0 0 0 6px rgb(112 200 192 / 50%);
  background-color: #f8f8ff;
}

.itemlink::after {
  content: '';
  clear: both;
  display: block;
}

.itemlink {
  position: relative;
  margin: 0;
}

.itemlink figure {
  position: relative;
  margin: 0;
  background: #fff;
  overflow: hidden;
}

.itemlink figure::before {
  position: absolute;
  top: 0;
  left: -80%;
  z-index: 2;
  display: block;
  content: '';
  width: 50%;
  height: 100%;

  /* background: -webkit-linear-gradient( left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 100%); */
  background: linear-gradient( to right, rgb(255 255 255 / 0%) 0%, rgb(255 255 255 / 30%) 100%);

  /* -webkit-transform: skewX(-25deg); */
  transform: skewX(-25deg);
}

.itemlink figure:hover::before {
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
@media screen and (max-width: 768px) {
  .title {
    line-height: 1.5;
  }

  .is-size-5-mobile {
    line-height: 1.75 !important;
  }
}
</style>
