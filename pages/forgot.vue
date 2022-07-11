<template>
  <div class="is-full-width">
    <main v-if="$route.query.u && $route.query.t" class="container acc p-md">
      <h2 class="hacc text-pink">ตั้งรหัสผ่านใหม่</h2>
      <form @submit.prevent="newpassword">
        <p v-show="message" class="m-y-lg has-text-centered msg_form">
          <b-message v-show="msg_status" type="is-success">
            <p>{{ message }}</p>
          </b-message>
          <b-message v-show="!msg_status" type="is-danger">
            <p>{{ message }}</p>
          </b-message>
        </p>
        <div class="fieldwrapper">
          <b-field label="รหัสผ่านใหม่">
            <b-input
              id="id_password_form"
              v-model="new_password1"
              type="password"
              name="new_password1"
              password-reveal
              placeholder="รหัสผ่านใหม่"
              required
              size="is-large"
              validation-message="กรุณากรอกข้อมูล"
            >
            </b-input>
          </b-field>
        </div>
        <div class="fieldwrapper">
          <b-field label="รหัสผ่านใหม่อีกครั้ง">
            <b-input
              id="id_password2_form"
              v-model="new_password2"
              type="password"
              name="new_password2"
              password-reveal
              placeholder="รหัสผ่านใหม่อีกครั้ง"
              required
              size="is-large"
              validation-message="กรุณากรอกข้อมูล"
            >
            </b-input>
          </b-field>
        </div>
        <div class="fieldwrappercaptcha"></div>
        <div class="fieldwrapper">
          <b-button
            native-type="submit"
            class="submit"
            size="is-medium"
            :loading="isLoading"
          >
            ตั้งรหัสผ่านใหม่
          </b-button>
        </div>
        <p class="m-y-lg has-text-centered msg_form">
          <b-message>
            <p>1.รหัสผ่านต้องคาดเดายากและไม่ตรงกับข้อมูลส่วนตัวของคุณ</p>
            <p>2.รหัสผ่านต้องไม่มีแต่ตัวเลขและต้องมีมากกว่า 8 ตัวอักษร</p>
          </b-message>
        </p>
        <div class="fieldwrapper has-text-centered">
          <nuxt-link
            :to="{ name: 'signup', query: { next: $route.query.next } }"
            title="สมัครสมาชิก"
          >
            <span>สมัครสมาชิก</span>
          </nuxt-link>
        </div>
        <div class="fieldwrapper has-text-centered">
          <nuxt-link
            :to="{ name: 'login', query: { next: $route.query.next } }"
            title="เข้าสู่ระบบ"
          >
            <span>เข้าสู่ระบบ</span>
          </nuxt-link>
        </div>
      </form>
    </main>
    <main v-else class="container acc p-md">
      <h2 class="hacc text-pink">ลืมรหัสผ่าน</h2>
      <form @submit.prevent="forgot">
        <p v-show="message" class="m-y-lg has-text-centered msg_form">
          <b-message v-show="msg_status" type="is-success">
            <p>{{ message }}</p>
          </b-message>
          <b-message v-show="!msg_status" type="is-danger">
            <p>{{ message }}</p>
          </b-message>
        </p>
        <div class="fieldwrapper">
          <b-field label="อีเมล">
            <b-input
              id="id_email_form"
              v-model="email"
              type="email"
              name="email"
              placeholder="อีเมล"
              required
              autocomplete="off"
              size="is-large"
              validation-message="กรุณากรอกข้อมูล"
            >
            </b-input>
          </b-field>
        </div>
        <div class="fieldwrappercaptcha">
          <vue-hcaptcha
            sitekey="0b3d057d-0b79-4298-9199-ac715b3ddf6c"
            language="th"
            @verify="onCallback"
            @expired="onExpire"
            @error="onError"
          ></vue-hcaptcha>
        </div>
        <div class="fieldwrapper">
          <b-button
            native-type="submit"
            class="submit"
            size="is-medium"
            :loading="isLoading"
          >
            ลืมรหัสผ่าน
          </b-button>
        </div>
        <div class="fieldwrapper has-text-centered">
          <nuxt-link
            :to="{ name: 'signup', query: { next: $route.query.next } }"
            title="สมัครสมาชิก"
          >
            <span>สมัครสมาชิก</span>
          </nuxt-link>
        </div>
        <div class="fieldwrapper has-text-centered">
          <nuxt-link
            :to="{ name: 'login', query: { next: $route.query.next } }"
            title="เข้าสู่ระบบ"
          >
            <span>เข้าสู่ระบบ</span>
          </nuxt-link>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import { ToastProgrammatic as Toast } from 'buefy'

export default {
  name: 'ForgotPage',
  data() {
    return {
      email: '',
      new_password1: '',
      new_password2: '',
      next: '',
      isLoading: false,
      verified: false,
      message: '',
      msg_status: false,
    }
  },
  head() {
    return {
      title: 'Edenra - ลืมรหัสผ่าน',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'หากคุณลืมรหัสผ่านของบัญชีที่ใช้งาน Edenra.com สามารถทำตามขั้นตอนเพื่อตั้งรหัสผ่านของคุณใหม่ได้ดังนี้',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Edenra - ลืมรหัสผ่าน',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'หากคุณลืมรหัสผ่านของบัญชีที่ใช้งาน Edenra.com สามารถทำตามขั้นตอนเพื่อตั้งรหัสผ่านของคุณใหม่ได้ดังนี้',
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: 'Edenra - ลืมรหัสผ่าน',
        },
        {
          hid: 'apple-mobile-web-app-title',
          property: 'apple-mobile-web-app-title',
          content: 'Edenra - ลืมรหัสผ่าน',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Edenra - ลืมรหัสผ่าน',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'หากคุณลืมรหัสผ่านของบัญชีที่ใช้งาน Edenra.com สามารถทำตามขั้นตอนเพื่อตั้งรหัสผ่านของคุณใหม่ได้ดังนี้',
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: 'Edenra - ลืมรหัสผ่าน',
        },
      ],
    }
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
  },
  methods: {
    onCallback(response) {
      this.verified = true
    },
    onExpire() {
      this.verified = false
      Toast.open({
        message: 'การยืนยันตัวตนหมดอายุ กรุณาลองใหม่อีกครั้ง',
        type: 'is-danger',
      })
    },
    onError() {
      Toast.open({
        message: 'การยืนยันตัวตนไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง',
        type: 'is-danger',
      })
    },
    forgot() {
      this.isLoading = true
      if (this.verified) {
        this.$axios
          .post('/auth/users/reset_password/', {
            email: this.email.toLowerCase(),
          })
          .then((response) => {
            this.isLoading = false
            this.email = ''
            this.verified = false
            this.message =
              'เราได้ส่งข้อมูลการตั้งค่ารหัสผ่านใหม่ให้ทางอีเมลของคุณแล้ว กรุณาตรวจสอบอีเมลของคุณ'
            this.msg_status = true
            setTimeout(() => this.$router.push({ name: 'login' }), 5000)
          })
          .catch((e) => {
            this.isLoading = false
            this.message = 'ข้อมูลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง'
          })
      } else {
        this.isLoading = false
        Toast.open({ message: 'กรุณายืนตัวตัวตนให้ถูกต้อง', type: 'is-danger' })
      }
    },
    newpassword() {
      this.isLoading = true
      if (this.verified) {
        if (this.new_password1 === this.new_password2) {
          this.$axios
            .post('/auth/users/reset_password_confirm/', {
              uid: this.$route.query.u,
              token: this.$route.query.t,
              new_password: this.new_password1,
              re_new_password: this.new_password2,
            })
            .then((response) => {
              this.isLoading = false
              this.new_password1 = ''
              this.new_password2 = ''
              this.verified = false
              this.message =
                'ตั้งรหัสผ่านใหม่เรียบร้อยแล้ว สามารถใช้รหัสผ่านใหม่เข้าสู่ระบบได้ทันที'
              this.msg_status = true
              setTimeout(() => this.$router.push({ name: 'login' }), 5000)
            })
            .catch((e) => {
              this.isLoading = false
              this.message = 'ไม่สามารถตั้งรหัสผ่านใหม่ได้ กรุณาลองใหม่อีกครั้ง'
            })
        } else {
          this.isLoading = false
          Toast.open({
            message: 'รหัสผ่านใหม่ไม่เหมือนกันทั้ง 2 ช่อง',
            type: 'is-danger',
          })
        }
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
}
</style>
