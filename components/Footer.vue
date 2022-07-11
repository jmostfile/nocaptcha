<template>
  <footer class="hero-foot">
    <div class="is-mobile container con95 footer">
      <div class="level is-hidden-touch m-b-none">
        <div class="level-left">
          <p class="level-item">&copy; {{ Year() }} Edenra.com</p>
          <p class="level-item" v-for="(item, key) in data" :key="key">
            <a v-if="key==='tiktok'"  :href="item.url" :title="item.title" target="_blank">
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>TikTok</title><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
            </a>
            <a v-else :href="item.url" :title="item.title" target="_blank">
              <b-icon :icon="item.icon" :class="item.class" />
            </a>
          </p>
        </div>
        <div class="level-right">
          <p class="level-item">
            <nuxt-link :to="{ name: 'aboutus' }" title="เกี่ยวกับเรา">
              เกี่ยวกับเรา
            </nuxt-link>
          </p>
          <p class="level-item">
            <nuxt-link :to="{ name: 'tos' }" title="ข้อตกลง">
              ข้อตกลง
            </nuxt-link>
          </p>
          <p class="level-item">
            <nuxt-link :to="{ name: 'privacy' }" title="นโยบายความเป็นส่วนตัว">
              นโยบายความเป็นส่วนตัว
            </nuxt-link>
          </p>
          <p class="level-item">
            <nuxt-link :to="{ name: 'cookies' }" title="คุกกี้">
              คุกกี้
            </nuxt-link>
          </p>
        </div>
      </div>
      <div class="is-clearfix is-mobile is-hidden-desktop is-vertical-center">
        <div class="fleft m-l-sm is-size-6-touch is-size-7-mobile">
          <span>&copy; {{ Year() }} Edenra.com</span>
        </div>
        <div class="m-r-sm">
          <b-dropdown aria-role="menu">
            <a slot="trigger" role="button" title="social media">
              <b-icon icon="account-group" class="text-green p-x-md" />
            </a>
            <b-dropdown-item v-for="(item, key) in data" :key="key" has-link aria-role="menuitem">
              <a v-if="key==='tiktok'" :href="item.url" :title="item.title" target="_blank">
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>TikTok</title><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg> {{ item.title }}
              </a>
              <a v-else :href="item.url" :title="item.title" target="_blank">
                <b-icon :icon="item.icon" :class="item.class" /> {{ item.title }}
              </a>
            </b-dropdown-item>
          </b-dropdown>
          <b-dropdown aria-role="menu">
            <a slot="trigger" role="button" title="info">
              <b-icon icon="information-outline" class="p-x-md" />
            </a>
            <b-dropdown-item has-link aria-role="menuitem">
              <nuxt-link :to="{ name: 'aboutus' }" title="เกี่ยวกับเรา">
                เกี่ยวกับเรา
              </nuxt-link>
            </b-dropdown-item>
            <b-dropdown-item has-link aria-role="menuitem">
              <nuxt-link :to="{ name: 'tos' }" title="ข้อตกลง">
                ข้อตกลง
              </nuxt-link>
            </b-dropdown-item>
            <b-dropdown-item has-link aria-role="menuitem">
              <nuxt-link
                :to="{ name: 'privacy' }"
                title="นโยบายความเป็นส่วนตัว"
              >
                นโยบายความเป็นส่วนตัว
              </nuxt-link>
            </b-dropdown-item>
            <b-dropdown-item has-link aria-role="menuitem">
              <nuxt-link :to="{ name: 'cookies' }" title="คุกกี้">
                คุกกี้
              </nuxt-link>
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import snsdata from '~/assets/sns.json'
export default {
  name: 'default_footer',
  data() {
    return {
      data: snsdata,
      visible: false,
    }
  },
  methods: {
    Year() {
      const date = new Date()
      return date.getFullYear()
    },
  },
}
</script>
<style scoped>
@media screen and (max-width: 1023px) {
  footer .level-left {
    margin-left: 0.75rem;
  }
}

.footer {
  background-color: transparent;
  padding: 0.75rem 0 !important;
}

.is-vertical-center {
  align-items: center;
  display: flex;
  list-style-type: none;
  padding: 0;
  justify-content: flex-end;
}

.fleft {
  margin-right: auto;
}

svg {
  width: 32px;
  height: 21px;
  padding-top: 3px;
}
</style>
