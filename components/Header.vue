<template>
  <header>
    <b-navbar fixed-top shadow centered :mobile-burger="false" wrapper-class="container" class="bottom-gradient-border bg-ghostwhite">
      <template #brand>
        <b-navbar-item class="menuicon">
          <b-icon
            icon="menu"
            custom-size="mdi-36px"
            class="is-hidden-touch"
            @click.native="open = !open"
          ></b-icon>
          <b-dropdown aria-role="menu" class="is-hidden-desktop" ref="menudropdown">
            <a slot="trigger" role="button" title="menu" class="navbar-item">
              <b-icon icon="menu" custom-size="mdi-36px" ></b-icon>
            </a>
            <b-collapse class="card" animation="slide" aria-id="searchcollapse" :open="false">
              <template #trigger="props">
                <div class="card-header" role="button" aria-controls="searchcollapse" :aria-expanded="props.open">
                  <p class="card-header-title">ค้นหา</p>
                  <a class="card-header-icon">
                    <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
                  </a>
                </div>
              </template>
              <div class="card-content">
                <div class="content">
                  <b-select v-model="c" class="m-r-none m-b-md" placeholder="หมวดหมู่" expanded>
                    <option
                      v-for="option in root_item"
                      :key="option.id"
                      :value="option.slug"
                    >
                      {{ option.name }}
                    </option>
                  </b-select>
                  <b-input
                    v-model="q"
                    placeholder="ค้นหา..."
                    type="search"
                    class="m-b-md"
                    expanded
                  >
                  </b-input>
                  <b-button native-type="submit" @click.stop.prevent="Search()" type="is-primary" icon-left="magnify" expanded>ค้นหา</b-button>
                </div>
              </div>
            </b-collapse>
            <b-dropdown-item aria-role="menuitem" has-link title="หน้าแรก" >
              <nuxt-link :to="{ name: 'index' }">
                <b-icon class="has-text-primary micon" icon="home"></b-icon>
                หน้าแรก
              </nuxt-link>
            </b-dropdown-item>
            <b-dropdown-item aria-role="menuitem" has-link title="อ่าน" >
              <nuxt-link :to="{ name: 'read' }">
                <b-icon class="has-text-info micon" icon="book-open"></b-icon>
                อ่าน
              </nuxt-link>
            </b-dropdown-item>
            <b-dropdown-item aria-role="menuitem" has-link title="วิดีโอ" >
              <nuxt-link :to="{ name: 'video' }">
                <b-icon class="text-green micon" icon="video"></b-icon>
                วิดีโอ
              </nuxt-link>
            </b-dropdown-item>
            <b-dropdown-item aria-role="menuitem" has-link title="เกมส์" >
              <nuxt-link :to="{ name: 'games' }">
                <b-icon class="text-red micon" icon="google-controller"></b-icon>
                เกมส์
              </nuxt-link>
            </b-dropdown-item>
            <b-dropdown-item aria-role="menuitem" has-link title="อาหารและเครื่องดื่ม" >
              <nuxt-link :to="{ name: 'food_drinks' }">
                <b-icon class="text-yellow micon" icon="food-fork-drink"></b-icon>
                อาหารและเครื่องดื่ม
              </nuxt-link>
            </b-dropdown-item>
          </b-dropdown>
        </b-navbar-item>
        <b-navbar-item tag="nuxt-link" :to="{ name: 'index' }" class="m-l-auto-mobile">
          <img src="@/assets/edenra.png" alt="Edenra" />
        </b-navbar-item>
        <template v-if="isAuthenticated">
          <div class="is-hidden-desktop m-l-auto-mobile">
            <Member />
          </div>
        </template>
        <template v-else>
          <b-navbar-item
            slot="trigger"
            role="button"
            tag="nuxt-link"
            :to="{
              name: 'login',
              query: {
                next: $route.query.next
                  ? $route.query.next
                  : decodeURI($router.currentRoute.path),
              },
            }"
            title="เข้าสู่ระบบ"
            class="endmenuicon m-sd is-hidden-desktop m-l-auto-mobile"
          >
            <b-icon
              icon="account"
              class="text-green h100"
              custom-size="mdi-36px"
            />
          </b-navbar-item>
          <b-navbar-item
            slot="trigger"
            role="button"
            tag="nuxt-link"
            :to="{
              name: 'signup',
            }"
            title="สมัครสมาชิก"
            class="endmenuicon m-y-sd m-r-md is-hidden-desktop"
          >
            <b-icon
              icon="account-plus"
              class="text-orange h100"
              custom-size="mdi-36px"
            />
          </b-navbar-item>
        </template>
      </template>
      <template #start>
        <form>
          <b-field>
            <p class="control">
              <b-select v-model="c" placeholder="หมวดหมู่">
                <option
                  v-for="option in root_item"
                  :key="option.id"
                  :value="option.slug"
                >
                  {{ option.name }}
                </option>
              </b-select>
            </p>
            <b-input
              v-model="q"
              placeholder="ค้นหา..."
              class="min600"
              type="search"
            >
            </b-input>
            <div class="control">
              <button
                type="submit"
                class="button"
                @click.stop.prevent="Search()"
              >
                <b-icon icon="magnify"></b-icon>
              </button>
            </div>
          </b-field>
        </form>
      </template>
      <template #end>
        <template v-if="isAuthenticated">
          <Gapple />
          <Member />
        </template>
        <template v-else>
          <b-navbar-item
            slot="trigger"
            role="button"
            tag="nuxt-link"
            :to="{
              name: 'login',
              query: {
                next: $route.query.next
                  ? $route.query.next
                  : decodeURI($router.currentRoute.path),
              },
            }"
            title="เข้าสู่ระบบ"
          >
            <b-icon icon="account" class="text-green m-r-sd h100" />
            <span class="is-hidden-touch">เข้าสู่ระบบ</span>
          </b-navbar-item>
          <b-navbar-item
            slot="trigger"
            role="button"
            tag="nuxt-link"
            :to="{
              name: 'signup',
            }"
            title="สมัครสมาชิก"
          >
            <b-icon icon="account-plus" class="text-orange m-r-sd h100" />
            <span class="is-hidden-touch">สมัครสมาชิก</span>
          </b-navbar-item>
        </template>
      </template>
    </b-navbar>
    <b-sidebar
      :open="open"
      type="is-light"
      fullheight
      :on-cancel="closesidebar"
    >
      <Sidebar />
    </b-sidebar>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import Sidebar from '~/components/Aside'
import Gapple from '~/components/header/gapple'
import Member from '~/components/header/member'

export default {
  name: 'default_header',
  components: {
    Sidebar,
    Gapple,
    Member,
  },
  data() {
    return {
      q: null,
      c: null,
      root_item: [
        {
          id: 0,
          name: 'ทุกหมวดหมู่',
          slug: '',
        },
        {
          id: 1,
          name: 'อ่าน',
          slug: 'read',
        },
        {
          id: 2,
          name: 'วิดีโอ',
          slug: 'video',
        },
        {
          id: 3,
          name: 'เกมส์',
          slug: 'games',
        },
        {
          id: 4,
          name: 'อาหารและเครื่องดื่ม',
          slug: 'food_drinks',
        },
      ],
      open: false,
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  methods: {
    closesidebar() {
      this.open = !this.open
    },
    Search() {
      this.$refs.menudropdown.isActive = false
      this.$store.dispatch("SEARCH", {
        q: this.q,
        c: this.c
      });
      if (this.$route.name !== 'search') {
        this.$router.push({
          name: 'search',
        })
      }
    },
  },
}
</script>
<style scoped>
@media (min-width: 1281px) {
  .field .min600 {
    min-width: 500px;
  }
}
@media screen and (max-width: 1023px) {
  .navbar-brand {
    margin-left: auto;
  }

  .m-l-auto-mobile {
    margin-left: auto;
  }

  .navbar-menu {
    justify-content: flex-end;
    margin-left: auto;
  }

  .navbar-item {
    padding: 0.625rem 0.75rem;
  }

  .navbar-item .micon {
    margin-left: 0 !important;
  }

  .m-md {
    max-width: 300px !important;
    margin: 0 auto !important;
  }
}

.navbar.is-fixed-top .navbar-brand {
  justify-content: space-between;
}

.navbar-brand .menuicon {
  padding: 0 1rem;
}

.navbar-center {
  flex-grow: 1;
  justify-content: center;
}

.navbar-menu {
  background-color: transparent;
  box-shadow: none;
  padding: 0;
}

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

form {
  padding: 0.5rem 0.75rem;
}

.h100 {
  height: 100%;
}

.endmenuicon {
  padding: 0 1rem;
}
</style>
