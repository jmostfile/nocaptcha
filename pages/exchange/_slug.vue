<template>
  <div class="container p-y-lg">
    <div v-if="$fetchState.pending" class="p-y-lg p-x-md">
      <b-loading v-model="isLoading" :is-full-page="true"></b-loading>
    </div>
    <div v-else-if="$fetchState.error" class="p-y-lg p-x-md">
      <h3 class="title has-text-centered">ไม่มีของชิ้นดังกล่าว</h3>
    </div>
    <div v-else>
      <article v-if="item" class="content m-x-sm">
        <div class="columns is-mobile is-multiline">
          <div
            class="column itemlink is-full-mobile is-narrow has-text-centered-mobile initem"
          >
            <div class="itemimg">
              <figure class="image has-text-centered-mobile">
                <img
                  :src="$blobimg(item.enimages)"
                  :alt="item.title"
                  @load="onLoaded"
                />
              </figure>
            </div>
          </div>
          <div class="column is-full-mobile">
            <div class="has-text-centered-mobile">
              <h1>
                <strong>{{ item.title }}</strong>
              </h1>
              <h4 v-if="item.limited" class="has-text-grey">
                <b-icon class="text-green m-r-sm" icon="package-variant-closed"></b-icon>
                <small>คงเหลือ {{ item.stock }}</small>
              </h4>
              <h4 v-else class="has-text-grey">
                <b-icon class="text-green m-r-sm" icon="package-variant-closed"></b-icon>
                <small>ไม่จำกัดจำนวน</small>
              </h4>
              <h2>
                <span class="has-text-grey-dark m-r-sm">ใช้</span>
                <span class="text-red m-r-sm">{{ parseFloat(item.price) }}</span>
                <b-icon class="text-gold" icon="food-apple"></b-icon>
                <span class="has-text-grey-dark m-l-sm">แลกต่อ 1 ชิ้น</span>
              </h2>
              <form
                v-if="isAuthenticated && item.available"
                class="columns is-mobile is-multiline"
                @submit.prevent="Exchangesubmit"
              >
                <b-field
                  class="column is-half-desktop is-full-mobile is-marginless"
                >
                  <b-numberinput
                    v-if="item.limited_buy && item.limited"
                    v-model="amount"
                    expanded
                    controls-position="compact"
                    min="1"
                    :max="1"
                  ></b-numberinput>
                  <b-numberinput
                    v-else-if="!item.limited_buy && item.limited"
                    v-model="amount"
                    expanded
                    controls-position="compact"
                    min="1"
                    :max="item.stock"
                  ></b-numberinput>
                  <b-numberinput
                    v-else
                    v-model="amount"
                    expanded
                    controls-position="compact"
                    min="1"
                  ></b-numberinput>
                </b-field>
                <b-field class="column is-full">
                  <b-button
                    type="is-success"
                    size="is-large"
                    native-type="submit"
                    :loading="isLoadingb"
                    class="is-fullwidth-mobile"
                    ><b-icon icon="swap-horizontal"></b-icon> <span class="m-l-xxs">แลกเปลี่ยน</span></b-button
                  >
                </b-field>
              </form>
              <b-button
                v-else-if="!item.available"
                type="is-danger"
                size="is-large"
                disabled
                class="is-fullwidth-mobile"
                ><b-icon icon="package-variant"></b-icon> ของหมดแล้ว</b-button
              >
              <template v-else>
                <nuxt-link
                  :to="{
                    name: 'login',
                    query: { next: 'exchange/' + $route.params.slug },
                  }"
                  title="เข้าสู่ระบบ"
                >
                  <b-button type="is-success" size="is-large" class="is-fullwidth-mobile">
                    <b-icon icon="account"></b-icon> กรุณาเข้าสู่ระบบ</b-button>
                </nuxt-link>
              </template>
              <div
                v-if="item.description"
                class="p-y-md"
                v-html="item.description"
              ></div>
              <div v-else class="p-y-md">~ ไม่มีคำอธิบายใดๆ ~</div>
            </div>
          </div>
        </div>
        <div class="bg-ghostwhite content p-md" v-html="item.productdetail"></div>
      </article>
      <div v-else class="p-y-lg p-x-md">
        <h3 class="title has-text-centered">ไม่มีของชิ้นดังกล่าว</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ToastProgrammatic as Toast } from 'buefy'

export default {
  name: 'ExchangeSlugPage',
  data() {
    return {
      item: [],
      errors: [],
      amount: 1,
      title: '',
      description: '',
      isLoading: true,
      isLoadingb: false,
    }
  },
  async fetch() {
    this.item = await fetch(
      `${this.$axios.defaults.baseURL}api/exchange/${this.$route.params.slug}/`
    ).then((res) => res.json())
    if (this.item.title) {
      this.title = this.item.title
      this.description = this.item.description
    } else {
      this.title = 'ไม่มีของชิ้นดังกล่าว'
      this.description = 'ไม่มีของชิ้นดังกล่าว'
    }
  },
  head() {
    return {
      title: 'Edenra - แลกเปลี่ยน ' + this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Edenra - แลกเปลี่ยน ' + this.title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.description,
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: 'Edenra - แลกเปลี่ยน ' + this.title,
        },
        {
          hid: 'apple-mobile-web-app-title',
          property: 'apple-mobile-web-app-title',
          content: 'Edenra - แลกเปลี่ยน ' + this.title,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Edenra - แลกเปลี่ยน ' + this.title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.description,
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: 'Edenra - แลกเปลี่ยน ' + this.title,
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  created() {
    if (!this.$auth.loggedIn) {
      this.$router.push({ name: 'index' })
    }
  },
  methods: {
    Exchangesubmit() {
      this.isLoadingb = true
      const token = this.$auth.getToken('local')
      const itemid = this.item.slug
      const amount = this.amount
      if (itemid !== '') {
        this.$axios.setToken(token)
        this.$axios
          .post('/api/exchange/exchangeitem/', {
            slug: itemid,
            amount,
          })
          .then((response) => {
            if (response.data.status === 'success') {
              document.getElementById('HGApple').innerHTML =
                response.data.gapple
              this.$auth.fetchUser()
              this.item.stock = response.data.stock
              this.item.available = response.data.available
              this.item.limited = response.data.limited
              this.isLoadingb = false
              this.$axios.setToken(false)
              Toast.open({ message: response.data.message, type: 'is-success' })
            } else {
              this.isLoadingb = false
              Toast.open({ message: response.data.message, type: 'is-danger' })
            }
          })
          .catch((e) => {
            this.errors.push(e)
            this.isLoadingb = false
            this.$axios.setToken(false)
            Toast.open({
              message: 'ข้อมูลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง',
              type: 'is-danger',
            })
          })
      } else {
        this.isLoadingb = false
        Toast.open({
          message: 'ข้อมูลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง',
          type: 'is-danger',
        })
      }
    },
    onLoaded() {
      URL.revokeObjectURL(this.src)
    },
  },
}
</script>
<style scoped>
.image {
  max-width: 384px;
  max-height: 384px;
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
  margin: 0 auto;
}

.itemlink figure {
  position: relative;
  margin: 0 auto;
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
  .image {
    max-width: 310px;
    max-height: 310px;
  }

  .is-fullwidth-mobile {
    width: 100%;
  }
}
</style>
