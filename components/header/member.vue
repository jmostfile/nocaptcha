<template>
    <b-dropdown position="is-bottom-left" aria-role="menu">
      <a slot="trigger" role="button" class="navbar-item">
        <div
          id="pfbg"
          :class="{
            support:
              loggedInUser.profile.is_subscribed ||
              loggedInUser.profile.is_subscribed_lifetime,
          }"
          class="profile-bg is32"
        >
          <img
            v-if="loggedInUser.profile.enprofile_images"
            id="HProfileImg"
            :src="$blobimg(loggedInUser.profile.enprofile_images)"
            :alt="
              loggedInUser.profile.displayname ||
              '@' + loggedInUser.profile.screenname
            "
            class="has-background-white"
            @load="onLoaded"
          />
          <img
            v-else
            id="HProfileImg"
            :src="defaultprofileimg"
            :alt="
              loggedInUser.profile.displayname ||
              '@' + loggedInUser.profile.screenname
            "
            @load="onLoaded"
          />
        </div>
        <b class="is-hidden-touch">{{
          loggedInUser.profile.displayname ||
          '@' + loggedInUser.profile.screenname
        }}</b>
      </a>
      <b-dropdown-item
        value="profile"
        aria-role="menuitem"
        has-link
        :title="parseFloat(loggedInUser.profile.gapple) + ' แอปเปิ้ล'"
        class="is-hidden-tablet"
      >
        <nuxt-link
          :to="{ name: 'golden_apple' }"
          :title="parseFloat(loggedInUser.profile.gapple) + ' แอปเปิ้ล'"
        >
          <b-icon class="text-gold" icon="food-apple"></b-icon>
          <span id="HGApple">{{
            formatCash(parseFloat(loggedInUser.profile.gapple))
          }}</span>
        </nuxt-link>
      </b-dropdown-item>
      <b-dropdown-item
        value="profile"
        aria-role="menuitem"
        has-link
        title="แลกเปลี่ยน"
        class="is-hidden-tablet"
      >
        <nuxt-link :to="{ name: 'exchange' }" title="แลกเปลี่ยน">
          <b-icon class="text-green" icon="swap-horizontal"></b-icon>
          <span>แลกเปลี่ยน</span>
        </nuxt-link>
      </b-dropdown-item>
      <hr
        class="dropdown-divider is-hidden-tablet"
        aria-role="menuitem"
      />
      <b-dropdown-item
        value="profile"
        aria-role="menuitem"
        has-link
        title="หน้าโปรไฟล์ของฉัน"
      >
        <nuxt-link
          :to="{
            name: '@screenname',
            params: { screenname: loggedInUser.profile.screenname },
          }"
        >
          <b-icon class="micon" icon="account"></b-icon>
          หน้าโปรไฟล์ของฉัน
        </nuxt-link>
      </b-dropdown-item>
      <b-dropdown-item
        value="inventory"
        aria-role="menuitem"
        has-link
        title="คลังส่วนตัว"
      >
        <nuxt-link :to="{ name: 'inventory' }">
          <b-icon class="micon" icon="package-variant-closed"></b-icon>
          คลังส่วนตัว
        </nuxt-link>
      </b-dropdown-item>
      <hr class="dropdown-divider" aria-role="menuitem" />
      <b-dropdown-item
        value="settings"
        aria-role="menuitem"
        has-link
        title="ตั้งค่าข้อมูลส่วนตัว"
      >
        <nuxt-link :to="{ name: 'settings' }">
          <b-icon class="micon" icon="account-cog"></b-icon>
          <span>ตั้งค่าข้อมูลส่วนตัว</span>
        </nuxt-link>
      </b-dropdown-item>
      <b-dropdown-item
        value="set_password"
        aria-role="menuitem"
        has-link
        title="เปลี่ยนอีเมล/รหัสผ่าน"
      >
        <nuxt-link :to="{ name: 'change_password' }">
          <b-icon class="micon" icon="account-key"></b-icon>
          <span>เปลี่ยนอีเมล/รหัสผ่าน</span>
        </nuxt-link>
      </b-dropdown-item>
      <hr class="dropdown-divider" aria-role="menuitem" />
      <b-dropdown-item
        value="logout"
        aria-role="menuitem"
        has-link
        title="ออกจากระบบ"
      >
        <nuxt-link
          v-if="this.$route.query.next"
          :to="{
            name: 'login',
            query: { next: this.$route.query.next },
          }"
        >
          <b-icon class="micon" icon="logout"></b-icon>
          ออกจากระบบ
        </nuxt-link>
        <nuxt-link
          v-else
          :to="{
            name: 'login',
            query: { next: decodeURI(this.$router.currentRoute.path) },
          }"
        >
          <b-icon class="micon" icon="logout"></b-icon>
          ออกจากระบบ
        </nuxt-link>
      </b-dropdown-item>
    </b-dropdown>
</template>

<script>
import { mapGetters } from 'vuex'
import defaultprofileimg from '~/assets/default_profile.png'
export default {
  name: 'header_member_components',
  data() {
    return {
      defaultprofileimg,
    }
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
    onLoaded() {
      URL.revokeObjectURL(this.src)
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

.profile-bg {
  /* background: linear-gradient(100deg,#fff280,#ffcb4d 6%,#fa85c8 24%,#86e4f3 80%,#93efab); */
  border-radius: 50%;
  position: relative;
  margin-right: 0.25rem;
  background: radial-gradient(circle, rgb(2 0 36 / 100%) 0%, rgb(176 179 180 / 100%) 100%);

  /* background: radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(176,179,180,1) 100%); */
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
  max-width: 28px;
  max-height: 28px;
  border-radius: 50%;
  object-fit: cover;
  object-position: 50% 0;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  /* -o-object-fit: cover;
  -o-object-position: 50% 0;
  -webkit-transform: translate(-50%, -50%); */
}

.is32 {
  width: 32px !important;
  height: 32px !important;
}
@media screen and (max-width: 1023px) {
  .navbar-item .micon {
    margin-left: 0 !important;
  }
}
</style>
