<template>
  <div class="container acc p-md">
    <div class="columns is-mobile hacc">
      <div class="column">
        <h2 class="has-text-left text-pink is-size-5-mobile">คลังส่วนตัว</h2>
      </div>
      <div class="column sort has-text-right is-8-mobile">
        <b-tooltip
          id="sortdate"
          label="เรียงตามวันที่ได้รับของ (ใหม่ - เก่า)"
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
          label="เรียงตามจำนวนที่มี (น้อย - มาก)"
          position="is-bottom"
          type="is-light"
          animated
        >
          <b-button class="button m-r-sm" @click="SortPrice()">
            <b-icon v-show="sort_price" icon="sort-descending"></b-icon>
            <b-icon v-show="!sort_price" icon="sort-ascending"></b-icon>
          </b-button>
        </b-tooltip>
        <b-tooltip
          label="ตัวอักษรสีแดงที่อยู่ในรูป คือ วันที่ของหมดอายุ ส่วนตัวอักษรสีดำที่อยู่ในรูป คือ จำนวนของที่คุณมี"
          type="is-light"
          position="is-left"
          multilined
          animated
        >
          <b-button class="button">
            <b-icon icon="help-circle"></b-icon>
          </b-button>
        </b-tooltip>
      </div>
    </div>
    <div v-if="$fetchState.pending" class="p-y-lg p-x-md">
      <b-loading v-model="isLoading" :is-full-page="true"></b-loading>
    </div>
    <div v-else-if="$fetchState.error" class="p-y-lg p-x-md">
      <h3 class="title has-text-centered">ไม่มีของในคลัง</h3>
    </div>
    <div v-else>
      <div
        v-if="Array.isArray(user_inventory) && user_inventory.length"
        class="p-y-lg p-x-md columns is-multiline is-mobile"
      >
        <div
          v-for="(item, i) in user_inventory"
          :key="i"
          class="column is-half-mobile is-4-tablet is-3-desktop is-2-fullhd initem"
        >
          <router-link
            :to="{ path: 'exchange/' + item.item.slug }"
            :title="item.title"
          >
            <div class="itemimg">
              <figure class="image is-square is-relative">
                <img
                  :src="$blobimg(item.item.enimages)"
                  :alt="item.item.title"
                  @load="onLoaded"
                />
                <span v-if="item.exp_at" class="exp">{{
                  dateFormatter(item.exp_at)
                }}</span>
                <span class="amount">{{ formatCash(item.amount) }}</span>
              </figure>
            </div>
            <h3
              class="is-size-6-touch is-size-5-desktop is-size-5-fullhd has-text-centered m-t-xs"
            >
              {{ item.item.title }}
            </h3>
          </router-link>
          <div class="buttons m-t-xs">
            <b-button
              v-if="item.item.can_use"
              type="bg-pink has-text-white"
              rounded
              expanded
              @click="confirm(item.eid)"
              >ใช้</b-button
            >
            <b-button
              v-else
              type="bg-pink has-text-white"
              rounded
              expanded
              disabled
              >ไม่สามารถใช้ได้</b-button
            >
          </div>
        </div>
      </div>
      <div v-else class="p-y-lg p-x-md">
        <h3 class="title has-text-centered">ไม่มีของในคลัง</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ToastProgrammatic as Toast } from 'buefy'

export default {
  name: 'InventoryPage',
  data() {
    return {
      user_inventory: [],
      errors: [],
      active: false,
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
    const token = this.$auth.getToken('local')
    this.$axios.setToken(token)
    await this.$axios
      .$get(`/api/account/inventory/`)
      .then((response) => {
        this.user_inventory = response
      })
      .catch((e) => {
        this.errors.push(e)
      })
    this.$axios.setToken(false)
  },
  head() {
    return {
      title: 'Edenra - คลังส่วนตัว',
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
          content: 'Edenra - คลังส่วนตัว',
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
          content: 'Edenra - คลังส่วนตัว',
        },
        {
          hid: 'apple-mobile-web-app-title',
          property: 'apple-mobile-web-app-title',
          content: 'Edenra - คลังส่วนตัว',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Edenra - คลังส่วนตัว',
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
          content: 'Edenra - คลังส่วนตัว',
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['loggedInUser']),
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
          'เรียงตามวันที่ได้รับของ (เก่า - ใหม่)'
      } else {
        document.querySelector('#sortdate').dataset.label =
          'เรียงตามวันที่ได้รับของ (ใหม่ - เก่า)'
      }
      this.user_inventory.sort((a, b) =>
        a.get_at < b.get_at ? this.sorting_date : -this.sorting_date
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
      this.user_inventory.sort((a, b) =>
        a.title < b.title ? this.sorting_name : -this.sorting_name
      )
    },
    SortPrice() {
      this.sort_price = !this.sort_price
      this.sorting_price *= -1
      if (this.sort_price) {
        document.querySelector('#sortprice').dataset.label =
          'เรียงตามจำนวนที่มี (มาก - น้อย)'
      } else {
        document.querySelector('#sortprice').dataset.label =
          'เรียงตามจำนวนที่มี (น้อย - มาก)'
      }
      this.user_inventory.sort((a, b) =>
        a.amount < b.amount ? this.sorting_price : -this.sorting_price
      )
    },
    confirm(id) {
      this.$buefy.dialog.confirm({
        message: 'ต้องการใช้ของชิ้นนี้หรือไม่?',
        confirmText: 'ใช้',
        cancelText: 'ไม่ใช้',
        onConfirm: () => this.useitem(id),
      })
    },
    useitem(id) {
      const token = this.$auth.getToken('local')
      const itemid = id
      this.$axios.setToken(token)
      this.$axios
        .post('/api/account/useitem/', {
          item: itemid,
        })
        .then((response) => {
          if (response.data.status === 'success') {
            if (response.data.subscription) {
              document.getElementById('pfbg').classList.add('support')
            }
            this.$axios.setToken(false)
            Toast.open({ message: response.data.message, type: 'is-success' })
            this.$fetch()
          } else {
            this.$axios.setToken(false)
            Toast.open({ message: response.data.message, type: 'is-danger' })
          }
        })
        .catch((e) => {
          this.$axios.setToken(false)
          Toast.open({ message: e.response.data.message, type: 'is-danger' })
          this.errors.push(e)
        })
    },
    formatCash(n) {
      if (n < 1e3) return n
      if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K'
      if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M'
      if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B'
      if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T'
    },
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
    onLoaded() {
      URL.revokeObjectURL(this.src)
    },
  },
}
</script>
<style scoped>
.acc .hacc {
  text-align: center;
  margin: 2rem 0 0;
}

.acc .hacc h2 {
  font-size: 2.5rem;
}

.acc .hacc .sort {
  font-size: 2rem;
}

.acc .initem .itemimg {
  padding: 0.5rem;
  border-radius: 6px;
  box-shadow: 0 2px 3px rgb(10 10 10 / 10%), 0 0 0 6px rgb(112 200 192 / 50%);
  background-color: #f8f8ff;
}

.ltooltip .icon {
  cursor: pointer;
}

.ltooltip .icon:hover,
.active {
  color: hsl(0deg 0% 48%) !important;
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

.ltooltip {
  position: relative;
  font-size: 1.7rem;
}

.acc .itemimg figure .exp {
  position: absolute;
  width: 100%;
  text-align: right;
  padding-right: 0.5rem;
  top: 0;
  color: red;
  font-size: 1rem;
  -webkit-text-fill-color: red;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: white;
  z-index: 2;
}

.acc .itemimg figure .amount {
  position: absolute;
  width: 100%;
  text-align: right;
  padding-right: 0.5rem;
  padding-bottom: 0.25rem;
  bottom: 0;
  color: black;
  font-size: 1.2rem;
  -webkit-text-fill-color: black;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: white;
  z-index: 2;
}

.button.bg-pink:hover:not([disabled]),
.button.bg-pink.is-hovered:not([disabled]) {
  border-color: #f26f2c;
  background-color: #f26f2c !important;
}

@media screen and (max-width: 768px) {
  .is-size-4-mobile {
    line-height: 2 !important;
  }

  .acc .hacc .sort {
    font-size: 1rem;
  }
}
</style>
