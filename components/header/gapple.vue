<template>
    <b-dropdown
      position="is-bottom-left"
      aria-role="menu"
      class="is-hidden-touch"
    >
      <a
        slot="trigger"
        role="button"
        class="navbar-item"
        :title="parseFloat(loggedInUser.profile.gapple)"
      >
        <b-icon class="text-gold" icon="food-apple"></b-icon>
        <span id="HGApple">{{
          formatCash(parseFloat(loggedInUser.profile.gapple))
        }}</span>
      </a>
      <b-dropdown-item
        value="profile"
        aria-role="menuitem"
        has-link
        title="เติมแอปเปิ้ลสีทอง"
      >
        <nuxt-link
          :to="{ name: 'golden_apple' }"
          class="navbar-item"
          title="เติมแอปเปิ้ลสีทอง"
        >
          <b-icon class="text-gold" icon="food-apple"></b-icon>
          <span>เติมแอปเปิ้ลสีทอง</span>
        </nuxt-link>
      </b-dropdown-item>
      <b-dropdown-item
        value="profile"
        aria-role="menuitem"
        has-link
        title="แลกเปลี่ยน"
      >
        <nuxt-link
          :to="{ name: 'exchange' }"
          class="navbar-item"
          title="แลกเปลี่ยน"
        >
          <b-icon class="text-green" icon="swap-horizontal"></b-icon>
          <span>แลกเปลี่ยน</span>
        </nuxt-link>
      </b-dropdown-item>
    </b-dropdown>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'gapple_components',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  methods: {
    formatCash(n) {
      if (n < 1e3) return n
      if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K'
      if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M'
      if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B'
      if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T'
    },
  },
}
</script>
<style scoped>
.navbar-item {
  background-color: transparent !important;
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
}

.navbar-link.is-active,
.navbar-link:focus,
.navbar-link:focus-within,
.navbar-link:hover,
a.navbar-item.is-active,
a.navbar-item:focus,
a.navbar-item:focus-within,
a.navbar-item:hover {
  background-color: #fff !important;
  border-left: 1px solid #e4e4ea;
  border-right: 1px solid #e4e4ea;
}

.icon {
  margin-right: 0.25rem;
}
</style>
