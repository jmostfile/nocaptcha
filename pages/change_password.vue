<template>
  <div class="container acc p-md">
    <h2 class="hacc text-pink is-size-4-mobile">เปลี่ยนอีเมล/รหัสผ่าน</h2>
    <b-tabs type="is-toggle" class="m-y-md" expanded :multiline="true">
      <b-tab-item label="ตั้งอีเมลใหม่">
        <form @submit.prevent="NewEmailSubmit">
          <div class="fieldwrapper">
            <b-field label="อีเมลใหม่" :label-position="labelPosition">
              <b-input
                id="id_email_form"
                v-model="email"
                type="email"
                name="email"
                placeholder="อีเมลใหม่"
                required
                autocomplete="off"
                size="is-large"
                validation-message="กรุณากรอกข้อมูล"
              >
              </b-input>
            </b-field>
          </div>
          <div class="fieldwrapper">
            <b-field
              label="อีเมลใหม่อีกครั้ง"
              :label-position="labelPosition"
            >
              <b-input
                id="id_reemail_form"
                v-model="re_email"
                type="email"
                name="re_email"
                placeholder="อีเมลใหม่อีกครั้ง"
                required
                autocomplete="off"
                size="is-large"
                validation-message="กรุณากรอกข้อมูล"
              >
              </b-input>
            </b-field>
          </div>
          <div class="fieldwrapper">
            <b-field label="อีเมลปัจจุบัน" :label-position="labelPosition">
              <b-input
                id="id_cemail_form"
                v-model="c_email"
                type="email"
                name="c_email"
                placeholder="อีเมลปัจจุบัน"
                required
                autocomplete="off"
                size="is-large"
                validation-message="กรุณากรอกข้อมูล"
              >
              </b-input>
            </b-field>
          </div>
          <div class="fieldwrapper">
            <b-field label="รหัสผ่านเดิม" :label-position="labelPosition">
              <b-input
                id="id_cepassword_form"
                v-model="ce_password"
                type="password"
                name="ce_password"
                password-reveal
                placeholder="รหัสผ่านเดิม"
                required
                size="is-large"
                validation-message="กรุณากรอกข้อมูล"
                icon-pack="fas"
              >
              </b-input>
            </b-field>
          </div>
          <div class="fieldwrapper">
            <b-button
              native-type="submit"
              class="submit"
              size="is-medium"
              :loading="isLoading"
              >เปลี่ยนอีเมล</b-button
            >
          </div>
          <p class="m-y-lg has-text-centered msg_form">
            <b-message>
              <p>
                เมื่อคุณเปลี่ยนอีเมลแล้วคุณจำเป็นจะต้องยืนยันอีเมลของคุณใหม่อีกครั้งจากอีเมลที่ระบบส่งให้
              </p>
              <p>
                คุณจะต้องยืนยันอีเมลใหม่ก่อนที่จะเข้าสู่ระบบได้ใหม่อีกครั้ง
              </p>
            </b-message>
          </p>
        </form>
      </b-tab-item>
      <b-tab-item label="ตั้งรหัสผ่านใหม่">
        <form @submit.prevent="NewPasswordSubmit">
          <div class="fieldwrapper">
            <b-field label="รหัสผ่านใหม่" :label-position="labelPosition">
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
            <b-field
              label="รหัสผ่านใหม่อีกครั้ง"
              :label-position="labelPosition"
            >
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
          <div class="fieldwrapper">
            <b-field label="รหัสผ่านเดิม" :label-position="labelPosition">
              <b-input
                id="id_cpassword_form"
                v-model="c_password"
                type="password"
                name="c_password"
                password-reveal
                placeholder="รหัสผ่านเดิม"
                required
                size="is-large"
                validation-message="กรุณากรอกข้อมูล"
              >
              </b-input>
            </b-field>
          </div>
          <div class="fieldwrapper">
            <b-button
              native-type="submit"
              class="submit"
              size="is-medium"
              :loading="isLoading"
              >ตั้งรหัสผ่านใหม่</b-button
            >
          </div>
          <p class="m-y-lg has-text-centered msg_form">
            <b-message>
              <p>1.รหัสผ่านต้องคาดเดายากและไม่ตรงกับข้อมูลส่วนตัวของคุณ</p>
              <p>2.รหัสผ่านต้องไม่มีแต่ตัวเลขและต้องมีมากกว่า 8 ตัวอักษร</p>
            </b-message>
          </p>
        </form>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { ToastProgrammatic as Toast } from 'buefy'

export default {
  name: 'ChangePassPage',
  data() {
    return {
      labelPosition: 'on-border',
      email: '',
      re_email: '',
      c_email: '',
      ce_password: '',
      new_password1: '',
      new_password2: '',
      c_password: '',
      isLoading: false,
    }
  },
  computed: {},
  created() {
    if (!this.$auth.loggedIn) {
      this.$router.push({ name: 'index' })
    }
  },
  methods: {
    ...mapActions('account', ['edit_user_email', 'set_password']),
    ...mapActions('localstorage', ['TryCount']),
    NewEmailSubmit() {
      this.isLoading = true
      const token = this.$auth.getToken('local')
      const email = this.email.toLowerCase()
      const reemail = this.re_email.toLowerCase()
      const cemail = this.c_email.toLowerCase()
      const currentpassword = this.ce_password
      if (
        this.email !== '' &&
        this.re_email !== '' &&
        this.c_email !== '' &&
        this.ce_password !== '' &&
        email !== '' &&
        reemail !== '' &&
        cemail !== '' &&
        currentpassword !== ''
      ) {
        if (email === reemail) {
          const gmail = this.email
            .substring(email.lastIndexOf('@') + 1)
            .toLowerCase()
          if (gmail === 'gmail.com') {
            this.$axios.setToken(token)
            this.$axios
              .post('/api/account/profile/email/', {
                Email: email,
                ReEmail: reemail,
                CEmail: cemail,
                CPassword: currentpassword,
              })
              .then((response) => {
                this.email = ''
                this.re_email = ''
                this.c_email = ''
                this.ce_password = ''
                this.isLoading = false
                if (response.data.status === 'success') {
                  this.$axios.setToken(false)
                  Toast.open({
                    message: response.data.message,
                    type: 'is-success',
                  })
                } else {
                  this.$axios.setToken(false)
                  Toast.open({
                    message: response.data.message,
                    type: 'is-danger',
                  })
                }
              })
              .catch((e) => {
                this.$axios.setToken(false)
                this.isLoading = false
              })
          } else {
            this.isLoading = false
            Toast.open({
              message: 'ใช้ได้แต่ Gmail เท่านั้น กรุณาลองใหม่อีกครั้ง',
              type: 'is-danger',
            })
          }
        } else {
          this.isLoading = false
          Toast.open({
            message: 'อีเมลไม่เหมือนกันกรุณาลองใหม่อีกครั้ง',
            type: 'is-danger',
          })
        }
      } else {
        this.isLoading = false
        Toast.open({
          message: 'กรุณากรอกข้อมูลให้ครบทุกช่องแล้วลองใหม่อีกครั้ง',
          type: 'is-danger',
        })
      }
    },
    NewPasswordSubmit() {
      this.isLoading = true
      const token = this.$auth.getToken('local')
      const newpassword = this.new_password1
      const renewpassword = this.new_password2
      const currentpassword = this.c_password
      if (
        this.new_password1 !== '' &&
        this.new_password2 !== '' &&
        this.c_password !== '' &&
        newpassword !== '' &&
        renewpassword !== '' &&
        currentpassword !== ''
      ) {
        if (newpassword === renewpassword) {
          this.$axios.setToken(token)
          this.$axios
            .post('/auth/users/set_password/', {
              new_password: newpassword,
              re_new_password: renewpassword,
              current_password: currentpassword,
            })
            .then((response) => {
              this.new_password1 = ''
              this.new_password2 = ''
              this.c_password = ''
              this.isLoading = false
              this.$axios.setToken(false)
              Toast.open({
                message:
                  'แก้ไขรหัสผ่านใหม่แล้ว สามารถใช้รหัสผ่านใหม่เข้าสู่ระบบได้ทันที',
                type: 'is-success',
              })
              this.$router.push({ name: 'login' })
            })
            .catch((e) => {
              this.$axios.setToken(false)
              if (e.response.data.new_password) {
                Toast.open({
                  message: 'รหัสผ่านใหม่ไม่ถูกต้องกรุณาลองใหม่อีกครั้ง',
                  type: 'is-danger',
                })
              } else if (e.response.data.re_new_password) {
                Toast.open({
                  message: 'รหัสผ่านยืนยันไม่ถูกต้องกรุณาลองใหม่อีกครั้ง',
                  type: 'is-danger',
                })
              } else if (e.response.data.current_password) {
                Toast.open({
                  message: 'รหัสผ่านเดิมไม่ถูกต้องกรุณาลองใหม่อีกครั้ง',
                  type: 'is-danger',
                })
              } else if (e.response.data.non_field_errors) {
                Toast.open({
                  message: 'รหัสผ่านไม่เหมือนกันกรุณาลองใหม่อีกครั้ง',
                  type: 'is-danger',
                })
              } else {
                Toast.open({
                  message: 'ข้อมูลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง',
                  type: 'is-danger',
                })
              }
              this.isLoading = false
            })
        } else {
          this.isLoading = false
          Toast.open({
            message: 'รหัสผ่านไม่เหมือนกันกรุณาลองใหม่อีกครั้ง',
            type: 'is-danger',
          })
        }
      } else {
        this.isLoading = false
        Toast.open({
          message: 'กรุณากรอกข้อมูลให้ครบทุกช่องแล้วลองใหม่อีกครั้ง',
          type: 'is-danger',
        })
      }
    },
  },
  head() {
    return {
      title: 'Edenra - เปลี่ยนอีเมล/รหัสผ่าน',
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
          content: 'Edenra - เปลี่ยนอีเมล/รหัสผ่าน',
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
          content: 'Edenra - เปลี่ยนอีเมล/รหัสผ่าน',
        },
        {
          hid: 'apple-mobile-web-app-title',
          property: 'apple-mobile-web-app-title',
          content: 'Edenra - เปลี่ยนอีเมล/รหัสผ่าน',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Edenra - เปลี่ยนอีเมล/รหัสผ่าน',
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
          content: 'Edenra - เปลี่ยนอีเมล/รหัสผ่าน',
        },
      ],
    }
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
}

.acc .fieldwrapper {
  margin-bottom: 2rem;
  text-align: left;
}

.acc button.submit {
  width: 100%;
  
  /* background: -webkit-gradient( linear, 0% 50%, 100% 50%, color-stop(0%, #f38ec3), color-stop(100%, #f26687) );
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
<style>
.tabs.is-toggle a {
  background-color: #fff;
}

.tabs.is-toggle li.is-active a {
  background-color: #7957d5;
}
</style>
