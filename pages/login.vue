<template>
  <div class="is-full-width">
    <main class="container acc p-md">
      <h2 class="hacc text-pink">เข้าสู่ระบบ</h2>
      <p v-if="errorMsg" class="m-y-lg has-text-centered msgform">
        <b-message type="is-danger">
          <p>{{ eMsg }}</p>
        </b-message>
      </p>
      <p v-if="successMsg" class="m-y-lg has-text-centered msgform">
        <b-message type="is-success">
          <p>{{ sMsg }}</p>
        </b-message>
      </p>
      <form @submit.prevent="logInUser">
        <div class="fieldwrapper">
          <b-field label="ชื่อผู้ใช้ (username)">
            <b-input
              id="id_username_form"
              v-model="userData.username"
              type="text"
              name="username"
              placeholder="ชื่อผู้ใช้ (username)"
              required
              autocomplete="off"
              size="is-large"
              validation-message="กรุณากรอกข้อมูล"
            >
            </b-input>
          </b-field>
        </div>
        <div class="fieldwrapper">
          <b-field label="รหัสผ่าน">
            <b-input
              id="id_password_form"
              v-model="userData.password"
              type="password"
              name="password"
              password-reveal
              placeholder="รหัสผ่าน"
              required
              size="is-large"
              validation-message="กรุณากรอกข้อมูล"
            >
            </b-input>
          </b-field>
        </div>
        <div class="fieldwrappercaptcha"></div>
        <div class="fieldwrapper has-text-right">
          <label class="forgot">
            <nuxt-link :to="{ name: 'forgot' }" title="ลืมรหัสผ่าน?">
              <span>ลืมรหัสผ่าน?</span>
            </nuxt-link>
          </label>
        </div>
        <div class="fieldwrapper">
          <b-button
            native-type="submit"
            class="submit"
            size="is-medium"
            :loading="isLoading"
          >
            เข้าสู่ระบบ
          </b-button>
        </div>
        <div class="fieldwrapper has-text-centered">
          <nuxt-link :to="{ name: 'signup' }" title="สมัครสมาชิก">
            <span>สมัครสมาชิก</span>
          </nuxt-link>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import { ToastProgrammatic as Toast } from 'buefy'
export default {
  name: 'LoginPage',
  data() {
    return {
      next: '',
      isLoading: false,
      verified: false,
      errorMsg: false,
      eMsg: '',
      successMsg: false,
      sMsg: '',
      userData: { username: '', password: '' },
    }
  },
  head() {
    return {
      title: 'Edenra - เข้าสู่ระบบ',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'เข้าสู่ระบบการใช้งานด้วยบัญชีที่สมัครสมาชิกกับ Edenra.com เพื่อรับชมข้อมูลและใช้งานบัญชีของคุณได้ทันที',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Edenra - เข้าสู่ระบบ',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'เข้าสู่ระบบการใช้งานด้วยบัญชีที่สมัครสมาชิกกับ Edenra.com เพื่อรับชมข้อมูลและใช้งานบัญชีของคุณได้ทันที',
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: 'Edenra - เข้าสู่ระบบ',
        },
        {
          hid: 'apple-mobile-web-app-title',
          property: 'apple-mobile-web-app-title',
          content: 'Edenra - เข้าสู่ระบบ',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Edenra - เข้าสู่ระบบ',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'เข้าสู่ระบบการใช้งานด้วยบัญชีที่สมัครสมาชิกกับ Edenra.com เพื่อรับชมข้อมูลและใช้งานบัญชีของคุณได้ทันที',
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: 'Edenra - เข้าสู่ระบบ',
        },
      ],
    }
  },
  watch: {
    $route(to, from) {
      this.$router.go(to.path)
    },
  },
  created() {
    if (this.$auth.loggedIn) {
      const refreshToken = this.$auth.getRefreshToken('local')
      this.$axios
        .post('/auth/jwt/logout/', {
          refresh: refreshToken,
        })
        .then((resp) => {
          this.$auth.logout()
          location.reload(true)
        })
        .catch(() => {
          this.$auth.logout()
          location.reload(true)
        })
    }
    if (this.$route.query.u && this.$route.query.t) {
      this.$axios
        .post('/auth/users/activation/', {
          uid: this.$route.query.u,
          token: this.$route.query.t,
        })
        .then((resp) => {
          this.$axios.post('/api/active_signupcode/', {
            uid: this.$route.query.u,
          })
        })
      this.errorMsg = false
      this.successMsg = true
      this.sMsg = 'ยืนยันอีเมลเรียบร้อยแล้ว คุณสามารถเข้าสู่ระบบได้ทันที'
    }
  },
  methods: {
    onCallback(response) {
      this.verified = true
    },
    onExpire() {
      this.verified = false
      this.successMsg = false
      this.errorMsg = true
      this.eMsg = 'การยืนยันตัวตนหมดอายุ กรุณาลองใหม่อีกครั้ง'
    },
    onError() {
      this.verified = false
      this.successMsg = false
      this.errorMsg = true
      this.eMsg = 'การยืนยันตัวตนไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง'
    },
    async logInUser() {
      this.isLoading = true
      if (this.verified) {
        await this.$axios
          .post('/auth/jwt/create/', {
            username: this.userData.username,
            password: this.userData.password,
          })
          .then((resp) => {
            this.$auth.setToken('local', 'Bearer ' + resp.data.access_token)
            this.$auth.setRefreshToken('local', resp.data.refresh_token)
            this.$axios.setHeader(
              'Authorization',
              'Bearer ' + resp.data.access_token
            )
            this.$auth.ctx.app.$axios.setHeader(
              'Authorization',
              'Bearer ' + resp.data.access_token
            )
            this.isLoading = false
            if (this.$route.query.next) {
              if (
                this.$route.query.next.includes('signup') ||
                this.$route.query.next.includes('login') ||
                this.$route.query.next.includes('forgot')
              ) {
                this.$router.push({ name: 'index' })
              } else {
                this.$router.push({ path: decodeURI(this.$route.query.next) })
              }
            } else {
              this.$router.push({ name: 'index' })
            }
          })
          .catch(() => {
            this.isLoading = false
            this.successMsg = false
            this.errorMsg = true
            this.eMsg = 'ชื่อผู้ใช้ (username) หรือ รหัสผ่าน ไม่ถูกต้อง'
          })
      } else {
        this.isLoading = false
        Toast.open({ message: 'กรุณายืนตัวตัวตนให้ถูกต้อง', type: 'is-danger' })
      }
    },
  },
}
</script>
<style scoped>
.acc .hacc {
  text-align: center;
  font-size: 2.5rem;
  margin: 2rem 0 0;
}

.acc .msgform {
  text-align: center;
  margin: 2rem auto;
  width: 100%;
  max-width: 500px;
}

.acc form {
  text-align: center;
  margin: 1rem auto 3rem;
  width: 100%;
  max-width: 500px;
}

.acc .fieldwrapper {
  margin-bottom: 2rem;
  text-align: left;
}

.acc .fieldwrappercaptcha {
  margin-bottom: 2rem;
  text-align: center;
}

.acc button.submit {
  width: 100%;

  /* background: -webkit-gradient( linear, 0% 50%, 100% 50%, color-stop(0%, #f38ec3), color-stop(100%, #f26687));
  background: -moz-linear-gradient(left, #f38ec3, #f26687);
  background: -webkit-linear-gradient(left, #f38ec3, #f26687); */
  background: linear-gradient(to right, #f38ec3, #f26687);
  border: none;
  border-radius: 25px;
  padding: 15px 25px;
  color: #fff;
  cursor: pointer;
  line-height: 1 !important;
}

</style>
