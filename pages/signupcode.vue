<template>
  <div class="is-full-width">
    <main class="container acc p-y-lg">
      <h2 class="hacc text-pink is-size-4-mobile">แลกเปลี่ยนรหัสสมัครสมาชิก</h2>
      <b-tabs type="is-toggle" expanded class="p-x-md" :multiline="true">
        <b-tab-item
          label="แลกเปลี่ยนรหัสสมัครสมาชิก"
          header-class="has-background-white"
        >
          <form @submit.prevent="tradesignupcode">
            <div class="fieldwrapper">
              <b-field>
                <b-input
                  v-model="truemoney"
                  type="text"
                  name="truemoney"
                  placeholder="รหัสบัตรเงินสดทรูมันนี่"
                  required
                  autocomplete="off"
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
                แลกเปลี่ยนรหัสสมัครสมาชิก
              </b-button>
            </div>
            <p class="m-y-lg has-text-centered msgform">
              <b-message>
                <p>
                  เมื่อคุณทำรายการสำเร็จ
                  คุณจำเป็นต้องรอระบบทรูมันนี่ยืนยันข้อมูลบัตรของคุณ
                  ซึ่งอาจจะใช้เวลาพอสมควร
                </p>
                <p>
                  คุณสามารถตรวจสอบรหัสสมัครสมาชิก
                  ที่ระบบทรูมันนี่ยืนยันข้อมูลแล้วได้ที่ Tab
                  ตรวจสอบรหัสสมัครสมาชิก
                </p>
                <p>
                  คุณจะได้รับรหัสสมัครสมาชิกพร้อมแอปเปิ้ลสีทองจำนวนเท่ากับมูลค่าของบัตรเงินสดทรูมันนี่
                </p>
              </b-message>
            </p>
            <div class="fieldwrapper has-text-centered">
              <nuxt-link :to="{ name: 'signup' }" title="สมัครสมาชิก">
                <span>สมัครสมาชิก</span>
              </nuxt-link>
            </div>
          </form>
        </b-tab-item>
        <b-tab-item
          label="ตรวจสอบรหัสสมัครสมาชิก"
          header-class="has-background-white"
        >
          <form @submit.prevent="checksignupcode">
            <p v-show="message" class="m-y-lg has-text-centered msgform">
              <b-message v-show="msg_status" type="is-success">
                <p>{{ message }}</p>
              </b-message>
              <b-message v-show="!msg_status" type="is-danger">
                <p>{{ message }}</p>
              </b-message>
            </p>
            <div class="fieldwrapper">
              <b-field>
                <b-input
                  v-model="truemoneypass"
                  type="text"
                  name="truemoney"
                  placeholder="รหัสบัตรเงินสดทรูมันนี่"
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
                ตรวจสอบรหัสสมัครสมาชิก
              </b-button>
            </div>
            <div class="fieldwrapper has-text-centered">
              <nuxt-link :to="{ name: 'signup' }" title="สมัครสมาชิก">
                <span>สมัครสมาชิก</span>
              </nuxt-link>
            </div>
          </form>
        </b-tab-item>
      </b-tabs>
      <p></p>
    </main>
  </div>
</template>

<script>
import { ToastProgrammatic as Toast } from 'buefy'
export default {
  name: 'SingupCodePage',
  data() {
    return {
      data: '',
      errors: [],
      truemoney: '',
      truemoneypass: '',
      isLoading: false,
      message: '',
      msg_status: false,
      verified: false,
    }
  },
  head() {
    return {
      title: 'Edenra - แลกเปลี่ยนรหัสสมัครสมาชิก',
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
          content: 'Edenra - แลกเปลี่ยนรหัสสมัครสมาชิก',
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
          content: 'Edenra - แลกเปลี่ยนรหัสสมัครสมาชิก',
        },
        {
          hid: 'apple-mobile-web-app-title',
          property: 'apple-mobile-web-app-title',
          content: 'Edenra - แลกเปลี่ยนรหัสสมัครสมาชิก',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Edenra - แลกเปลี่ยนรหัสสมัครสมาชิก',
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
          content: 'Edenra - แลกเปลี่ยนรหัสสมัครสมาชิก',
        },
      ],
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
    tradesignupcode() {
      this.isLoading = true
      if (this.verified) {
        const truemoney = this.truemoney
        this.$axios.setToken(false)
        this.$axios
          .post('/api/signupcode_truemoney/', { truemoney })
          .then((response) => {
            if (response.data.status === 'success') {
              this.isLoading = false
              Toast.open({ message: response.data.message, type: 'is-success' })
            } else {
              this.isLoading = false
              Toast.open({
                message: response.data.message,
                type: 'is-danger',
              })
            }
          })
          .catch((e) => {
            this.isLoading = false
            Toast.open({
              message: 'ข้อมูลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง',
              type: 'is-danger',
            })
          })
      } else {
        this.isLoading = false
        Toast.open({
          message: 'กรุณายืนตัวตัวตนให้ถูกต้อง',
          type: 'is-danger',
        })
      }
    },
    checksignupcode() {
      this.isLoading = true
      this.message = ''
      const truemoneypass = this.truemoneypass
      if (this.verified) {
        this.$axios.setToken(false)
        this.$axios
          .get('/api/checksignupcode_truemoney/', {
            params: { truemoney: truemoneypass },
          })
          .then((response) => {
            if (response.data.status === 'success') {
              this.isLoading = false
              this.message = response.data.message
              this.msg_status = true
            } else {
              this.isLoading = false
              this.msg_status = false
              this.message = response.data.message
            }
          })
          .catch((e) => {
            this.isLoading = false
            this.msg_status = false
            this.message = ''
            Toast.open({
              message: 'ข้อมูลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง',
              type: 'is-danger',
            })
          })
      } else {
        this.isLoading = false
        Toast.open({
          message: 'กรุณายืนตัวตัวตนให้ถูกต้อง',
          type: 'is-danger',
        })
      }
    },
  },
}
</script>
<style scoped>
.acc {
  width: 100% !important;
}

.acc .hacc {
  text-align: center;
  font-size: 2.5rem;
  margin: 2rem 0;
}

.acc .msgform {
  text-align: center;
  margin: 1rem auto 3rem;
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
@media screen and (max-width: 768px) {
  li:not(.is-active) > a > span:not(.icon) {
    visibility: hidden;
    position: absolute;
  }

  nav.tabs li:not(.is-active) {
    -webkit-box-flex: 0;
    -ms-flex-positive: 0;
    flex-grow: 0;
    -ms-flex-negative: 1;
    flex-shrink: 1;
  }

  .tabs .icon {
    margin-left: 0.5em;
  }
}

.tabs li {
  transition: flex-grow 1s ease;
}
</style>
