<template>
  <div class="is-full-width">
    <main class="container acc p-md">
      <h2 class="hacc text-pink">สมัครสมาชิก</h2>
      <form @submit.prevent="signupsubmit">
        <div class="fieldwrapper">
          <b-field label="ชื่อผู้ใช้ (username)">
            <b-input
              id="id_username_form"
              v-model="Username"
              type="text"
              name="username"
              minlength="4"
              maxlength="30"
              placeholder="ชื่อผู้ใช้ (username)"
              required
              autocomplete="off"
              size=" is-large"
              pattern="[a-z]*"
              validation-message="ตัวอักษร a-z 4 ตัวขึ้นไป"
            >
            </b-input>
          </b-field>
        </div>
        <div class="fieldwrapper">
          <b-field label="อีเมล">
            <b-input
              id="id_email_form"
              v-model="Email"
              type="email"
              name="email"
              maxlength="75"
              placeholder="อีเมล"
              required
              autocomplete="off"
              size="is-large"
              validation-message="ใช้ @gmail.com เท่านั้น"
            >
            </b-input>
          </b-field>
        </div>
        <div class="fieldwrapper">
          <b-field label="รหัสผ่าน">
            <b-input
              id="id_password_form"
              v-model="Password1"
              type="password"
              name="password1"
              minlength="6"
              maxlength="30"
              password-reveal
              placeholder="รหัสผ่าน"
              required
              size="is-large"
              validation-message="รหัสผ่าน 6 ตัวขึ้นไป"
            >
            </b-input>
          </b-field>
        </div>
        <div class="fieldwrapper">
          <b-field label="รหัสผ่านอีกครั้ง">
            <b-input
              id="id_password2_form"
              v-model="Password2"
              type="password"
              name="password2"
              minlength="6"
              maxlength="30"
              password-reveal
              placeholder="รหัสผ่านอีกครั้ง"
              required
              size="is-large"
              validation-message="รหัสผ่าน 6 ตัวขึ้นไป"
            >
            </b-input>
          </b-field>
        </div>
        <div class="fieldwrapper">
          <b-field label="รหัสสมัครสมาชิก">
            <b-input
              id="id_code_form"
              v-model="Code"
              type="text"
              name="code"
              maxlength="30"
              placeholder="รหัสสมัครสมาชิก"
              required
              autocomplete="off"
              size=" is-large"
              validation-message="กรุณากรอกข้อมูล"
            >
            </b-input>
          </b-field>
        </div>
        <div class="fieldwrapper has-text-centered">
          <p class="m-b-md">
            <nuxt-link
              :to="{ name: 'signupcode' }"
              title="แลกเปลี่ยนรหัสสมัครสมาชิก"
            >
              <span>แลกเปลี่ยนรหัสสมัครสมาชิก</span>
            </nuxt-link>
          </p>
        </div>
        <div class="fieldcheck">
          <b-checkbox
            v-model="acceptcheck"
            size="is-medium"
            required
            class="is-size-6-mobile"
          >
            ข้าพเจ้ายอมรับ
            <nuxt-link :to="{ name: 'tos' }" title="ข้อตกลง" class="text-red">
              ข้อตกลง
            </nuxt-link>
            ,
            <nuxt-link
              :to="{ name: 'privacy' }"
              title="นโยบายความเป็นส่วนตัว"
              class="text-red"
            >
              นโยบายความเป็นส่วนตัว
            </nuxt-link>
            และ
            <nuxt-link
              :to="{ name: 'cookies' }"
              title="คุกกี้"
              class="text-red"
            >
              คุกกี้
            </nuxt-link>
            ในการใช้งาน Edenra.com
          </b-checkbox>
        </div>
        <div class="checkcaptcha"></div>
        <div class="fieldcheck">
          <b-button
            native-type="submit"
            class="submit"
            size="is-medium"
            :loading="isLoading"
          >
            สมัครสมาชิก
          </b-button>
        </div>
      </form>
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
    </main>
  </div>
</template>

<script>
import { customAlphabet } from 'nanoid'
export default {
  name: 'SignupPage',
  data() {
    return {
      acceptcheck: false,
      isLoading: false,
      Username: '',
      Email: '',
      Password1: '',
      Password2: '',
      Code: '',
      GApple: 0,
      verified: false,
      errorMsg: false,
      eMsg: '',
      successMsg: false,
      sMsg: '',
    }
  },
  head() {
    return {
      title: 'Edenra - สมัครสมาชิก',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'สมัครสมาชิกเพื่อการใช้งานที่ Edenra.com ได้อย่างมีประสิทธิภาพพร้อมรับสิทธิพิเศษเพิ่มเติมภายใน website อีกมากมาย',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Edenra - สมัครสมาชิก',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'สมัครสมาชิกเพื่อการใช้งานที่ Edenra.com ได้อย่างมีประสิทธิภาพพร้อมรับสิทธิพิเศษเพิ่มเติมภายใน website อีกมากมาย',
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: 'Edenra - สมัครสมาชิก',
        },
        {
          hid: 'apple-mobile-web-app-title',
          property: 'apple-mobile-web-app-title',
          content: 'Edenra - สมัครสมาชิก',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Edenra - สมัครสมาชิก',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'สมัครสมาชิกเพื่อการใช้งานที่ Edenra.com ได้อย่างมีประสิทธิภาพพร้อมรับสิทธิพิเศษเพิ่มเติมภายใน website อีกมากมาย',
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: 'Edenra - สมัครสมาชิก',
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
      this.errorMsg = true
      this.eMsg = 'การยืนยันตัวตนหมดอายุ กรุณาลองใหม่อีกครั้ง'
    },
    onError() {
      this.verified = false
      this.errorMsg = true
      this.eMsg = 'การยืนยันตัวตนไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง'
    },
    signupsubmit() {
      this.isLoading = true
      if (this.acceptcheck && this.verified) {
        if (
          this.Username !== '' &&
          this.Email !== '' &&
          this.Password1 !== '' &&
          this.Password2 !== '' &&
          this.Code !== ''
        ) {
          if (this.Password1 === this.Password2) {
            if (
              this.Username.length > 4 &&
              this.Email.length > 1 &&
              this.Username.length < 31 &&
              this.Email.length < 76 &&
              this.Password1.length > 6 &&
              this.Password2.length > 6 &&
              this.Password1.length < 31 &&
              this.Password2.length < 31 &&
              this.Code.length > 1 &&
              this.Code.length < 31
            ) {
              const gmail = this.Email.substring(
                this.Email.lastIndexOf('@') + 1
              ).toLowerCase()
              if (gmail === 'gmail.com') {
                const username = this.Username.toLowerCase()
                const email = this.Email.toLowerCase()
                const code = this.Code.toLowerCase()
                this.$axios
                  .post('/api/check_signupcode/', { username, email, code })
                  .then((response) => {
                    if (response.data.status === 'success') {
                      const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz'
                      let nanoid = customAlphabet(alphabet, 24)
                      this.GApple = response.data.gapple
                      const signupcode = this.Code.toLowerCase()
                      const displayname = nanoid()
                      const screenname = nanoid()
                      nanoid = customAlphabet(
                        '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                        30
                      )
                      const publickey = nanoid()
                      nanoid = customAlphabet(
                        '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-!@#$%^&*',
                        30
                      )
                      const pivatekey = nanoid()
                      const gapple = this.GApple
                      const profiledetail = {
                        signupcode,
                        gapple,
                        displayname,
                        screenname,
                        publickey,
                        pivatekey,
                      }
                      this.$axios
                        .post('/auth/users/', {
                          username: this.Username.toLowerCase(),
                          password: this.Password1,
                          email: this.Email.toLowerCase(),
                          isactive: false,
                          profile: profiledetail,
                        })
                        .then((resp) => {
                          this.isLoading = false
                          this.errorMsg = false
                          this.successMsg = true
                          this.sMsg =
                            'สมัครสมาชิกเรียบร้อยแล้ว กรุณายืนยันอีเมลอีกครั้ง ก่อนเข้าสู่ระบบ'
                          setTimeout(
                            () => this.$router.push({ name: 'login' }),
                            5000
                          )
                        })
                        .catch(() => {
                          this.isLoading = false
                          this.successMsg = false
                          this.errorMsg = true
                          this.eMsg =
                            'ไม่สามารถสมัครสมาชิกได้ กรุณาตรวจสอบข้อมูลให้ถูกต้องแล้วลองใหม่อีกครั้ง'
                        })
                    } else {
                      this.isLoading = false
                      this.successMsg = false
                      this.errorMsg = true
                      this.eMsg = response.data.message
                    }
                  })
                  .catch((e) => {
                    this.isLoading = false
                    this.successMsg = false
                    this.errorMsg = true
                    this.eMsg = 'ข้อมูลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง'
                  })
              } else {
                this.isLoading = false
                this.successMsg = false
                this.errorMsg = true
                this.eMsg = 'ใช้ได้แต่ Gmail เท่านั้น กรุณาลองใหม่อีกครั้ง'
              }
            } else {
              this.isLoading = false
              this.successMsg = false
              this.errorMsg = true
              this.eMsg =
                'username ต้องมากกว่า 4 ตัวอักษร และ password ต้องมากกว่า 6 ตัวอักษร'
            }
          } else {
            this.isLoading = false
            this.successMsg = false
            this.errorMsg = true
            this.eMsg = 'รหัสผ่านไม่เหมือนกัน กรุณาลองใหม่อีกครั้ง'
          }
        } else {
          this.isLoading = false
          this.successMsg = false
          this.errorMsg = true
          this.eMsg = 'กรุณากรอกข้อมูลให้ครบทุกช่อง'
        }
      } else {
        this.isLoading = false
        this.successMsg = false
        this.errorMsg = true
        this.eMsg =
          'กรุณาอ่านและยอมรับเงื่อนไขก่อนการสมัครสมาชิก หรือ ยืนยันตัวตนให้ถูกต้อง'
      }
    },
  },
}
</script>
<style scoped>
.acc .hacc {
  text-align: center;
  font-size: 2.5rem;
  margin: 2rem 0 1rem;
}

.msgform {
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

.fieldcheck {
  margin: 2rem 0;
  text-align: left;
}

.checkcaptcha {
  margin: 2rem 0;
  text-align: center;
}

.fieldwrapper {
  margin-bottom: 0.25rem;
  text-align: left;
}

.acc .mb-md {
  margin-bottom: 2rem !important;
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
