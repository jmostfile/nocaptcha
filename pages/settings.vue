<template>
  <div class="container acc p-md">
    <h2 class="hacc text-pink is-size-4-mobile">ตั้งค่าข้อมูลส่วนตัว</h2>
    <div v-if="$fetchState.pending" class="p-y-lg p-x-md">
      <b-loading v-model="isLoading" :is-full-page="true"></b-loading>
    </div>
    <div v-else-if="$fetchState.error" class="p-y-lg p-x-md">
      <h3 class="title has-text-centered">เกิดข้อผิดพลาดในการเรียกข้อมูล</h3>
    </div>
    <div v-else>
      <form @submit.prevent="EditProfileSubmit">
        <div class="fieldwrapper">
          <b-field
            label="สถานะผู้สนับสนุน (วันที่หมดอายุ)"
            :label-position="labelPosition"
          >
            <b-input
              v-model="sexp"
              type="text"
              placeholder="สถานะผู้สนับสนุน"
              name="sexp"
              size="is-large"
              disabled
            >
            </b-input>
          </b-field>
        </div>
        <div class="fieldwrapper">
          <b-field
            label="จำนวนครั้งที่เป็นสถานะผู้สนับสนุน"
            :label-position="labelPosition"
          >
            <b-input
              v-model="scount"
              type="text"
              placeholder="จำนวนครั้งที่เป็นสถานะผู้สนับสนุน"
              name="scount"
              size="is-large"
              disabled
            >
            </b-input>
          </b-field>
        </div>
        <div class="fieldwrapper is-hidden">
          <b-field label="กุญแจสาธารณะ" :label-position="labelPosition">
            <b-input
              v-model="pkey"
              type="text"
              placeholder="กุญแจสาธารณะ"
              name="pkey"
              maxlength="30"
              size="is-large"
              required
              validation-message="กรุณากรอกข้อมูล"
              autocomplete="off"
              icon="key"
              icon-clickable
              disabled
              @icon-click="genpkey"
            >
            </b-input>
          </b-field>
        </div>
        <div class="fieldwrapper is-hidden">
          <b-field label="กุญแจส่วนตัว" :label-position="labelPosition">
            <b-input
              v-model="skey"
              type="text"
              placeholder="กุญแจส่วนตัว"
              name="skey"
              maxlength="30"
              size="is-large"
              required
              validation-message="กรุณากรอกข้อมูล"
              autocomplete="off"
              icon="key"
              icon-clickable
              disabled
              @icon-click="genskey"
            >
            </b-input>
          </b-field>
        </div>
        <div class="fieldwrapper">
          <b-field label="ชื่อ" :label-position="labelPosition">
            <b-input
              v-model="FirstName"
              type="text"
              placeholder="ชื่อ"
              name="FirstName"
              maxlength="30"
              size="is-large"
              required
              validation-message="กรุณากรอกข้อมูล"
              autocomplete="off"
            >
            </b-input>
          </b-field>
        </div>
        <div class="fieldwrapper">
          <b-field label="นามสกุล" :label-position="labelPosition">
            <b-input
              v-model="LastName"
              type="text"
              placeholder="นามสกุล"
              name="LastName"
              maxlength="150"
              size="is-large"
              required
              validation-message="กรุณากรอกข้อมูล"
              autocomplete="off"
            >
            </b-input>
          </b-field>
        </div>
        <div class="fieldwrapper">
          <b-field
            label="เบอร์โทรศัพท์มือถือ"
            :label-position="labelPosition"
          >
            <b-input
              v-model="Phone"
              type="tel"
              placeholder="เบอร์โทรศัพท์มือถือ"
              name="Phone"
              maxlength="10"
              size="is-large"
              pattern="[0]{1}[0-9]{9}"
              validation-message="ตัวอย่าง 0123456789"
              autocomplete="off"
              required
            >
            </b-input>
          </b-field>
        </div>
        <div class="fieldwrapper">
          <b-field label="เพศ" :label-position="labelPosition">
            <b-select
              id="Gender"
              v-model="Gender"
              placeholder="เลือกเพศของคุณ"
              name="Gender"
              size="is-large"
              expanded
              required
            >
              <option value="M">ชาย</option>
              <option value="F">หญิง</option>
              <option value="L">LGBTQ+</option>
              <option value="U">ไม่ระบุ</option>
            </b-select>
          </b-field>
        </div>
        <div class="fieldwrapper">
          <b-field label="เลือกวันเกิดของคุณ">
            <b-datepicker
              v-model="Birthdate"
              placeholder="กดเพื่อเลือกวันเกิด..."
              icon="calendar-today"
              size="is-large"
              expanded
              :month-names="[
                'มกราคม',
                'กุมภาพันธ์',
                'มีนาคม',
                'เมษายน',
                'พฤษภาคม',
                'มิถุนายน',
                'กรกฎาคม',
                'สิงหาคม',
                'กันยายน',
                'ตุลาคม',
                'พฤศจิกายน',
                'ธันวาคม',
              ]"
              :min-date="minDate"
              :max-date="maxDate"
              :date-formatter="dateFormatter"
              required
            >
            </b-datepicker>
          </b-field>
        </div>
        <div class="fieldwrapper">
          <b-button native-type="submit" class="submit" :loading="isLoadingb">
            บันทึกข้อมูล
          </b-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { customAlphabet } from 'nanoid'
import { ToastProgrammatic as Toast } from 'buefy'

export default {
  name: 'SettingPage',
  data() {
    return {
      sexp: '',
      scount: 0,
      pkey: '',
      skey: '',
      FirstName: '',
      LastName: '',
      Phone: '',
      Gender: '',
      errors: [],
      isLoading: true,
      isLoadingb: false,
      Birthdate: undefined,
      labelPosition: 'on-border',
      maxDate: undefined,
      minDate: undefined,
    }
  },
  async fetch() {
    const token = this.$auth.getToken('local')
    this.$axios.setToken(token)
    await this.$axios
      .$get(`/api/account/settings/`)
      .then((response) => {
        this.FirstName = response.user.first_name
        this.LastName = response.user.last_name
        this.Phone = response.phone
        this.Gender = response.gender
        this.scount = response.subscribed_count
        this.pkey = response.pkey
        this.skey = response.skey
        if (response.birthdate) {
          this.Birthdate = new Date(response.birthdate)
        } else {
          const today = new Date()
          this.Birthdate = new Date(
            today.getFullYear() - 10,
            today.getMonth(),
            today.getDate()
          )
        }
        if (response.subscribe_exp && !response.is_subscribed_lifetime) {
          const subexp = new Date(response.subscribe_exp)
          this.sexp = this.dateFormatter(subexp)
        } else if (response.is_subscribed_lifetime) {
          this.sexp = 'คุณเป็นผู้สนับสนุนตลอดชีวิต'
          if (response.subscribed_count === 0) {
            this.scount = 1
          }
        } else {
          this.sexp = 'ยังไม่เคยเป็นผู้สนับสนุน'
        }
        document.getElementById('Gender').value = this.Gender
        this.$axios.setToken(false)
      })
      .catch((e) => {
        this.$axios.setToken(false)
        this.errors.push(e)
      })
  },
  head() {
    return {
      title: 'Edenra - ตั้งค่าข้อมูลส่วนตัว',
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
          content: 'Edenra - ตั้งค่าข้อมูลส่วนตัว',
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
          content: 'Edenra - ตั้งค่าข้อมูลส่วนตัว',
        },
        {
          hid: 'apple-mobile-web-app-title',
          property: 'apple-mobile-web-app-title',
          content: 'Edenra - ตั้งค่าข้อมูลส่วนตัว',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Edenra - ตั้งค่าข้อมูลส่วนตัว',
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
          content: 'Edenra - ตั้งค่าข้อมูลส่วนตัว',
        },
      ],
    }
  },
  mounted() {
    const today = new Date()
    this.maxDate = new Date(
      today.getFullYear() - 10,
      today.getMonth(),
      today.getDate()
    )
    this.minDate = new Date(
      today.getFullYear() - 150,
      today.getMonth(),
      today.getDate()
    )
  },
  created() {
    if (!this.$auth.loggedIn) {
      this.$router.push({ name: 'index' })
    }
  },
  methods: {
    genpkey() {
      const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const nanoid = customAlphabet(alphabet, 30)
      this.pkey = nanoid()
    },
    genskey() {
      const alphabet =
        '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-!@#$%^&*'
      const nanoid = customAlphabet(alphabet, 30)
      this.skey = nanoid()
    },
    dateFormatter(dt) {
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
      return dt.toLocaleDateString('th-TH', options)
    },
    EditProfileSubmit() {
      this.isLoadingb = true
      const token = this.$auth.getToken('local')
      const d = new Date(this.Birthdate)
      let month = '' + (d.getMonth() + 1)
      let day = '' + d.getDate()
      const year = d.getFullYear()

      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day
      const newd = [year, month, day].join('-')
      const phoneno = /^([0-9]{10})$/
      // const pattern = new RegExp(/[~`!@#$%^&*+=_\-[\]\\';,/{}|\\":<>?]/)
      const pattern = /[~`!@#$%^&*+=_\-[\]\\';,/{}|\\":<>?0123456789]/
      if (
        this.Phone.match(phoneno) &&
        this.FirstName !== '' &&
        this.LastName !== '' &&
        this.Gender !== '' &&
        this.pkey !== '' &&
        this.skey !== '' &&
        newd !== '' &&
        !pattern.test(this.FirstName) &&
        !pattern.test(this.LastName)
      ) {
        if (
          this.FirstName.length > 1 &&
          this.LastName.length > 1 &&
          this.FirstName.length < 31 &&
          this.LastName.length < 151
        ) {
          const firstName = this.FirstName
          const lastName = this.LastName
          const phone = this.Phone
          const gender = this.Gender
          const birthdate = newd
          const pkey = this.pkey
          const skey = this.skey
          this.$axios.setToken(token)
          this.$axios
            .post('/api/account/profile/pivate/', {
              FirstName: firstName,
              LastName: lastName,
              Phone: phone,
              Gender: gender,
              Birthdate: birthdate,
              pkey,
              skey,
            })
            .then((response) => {
              if (response.data.status === 'success') {
                this.FirstName = response.data.first_name
                this.LastName = response.data.last_name
                this.Phone = response.data.phone
                this.Gender = response.data.gender
                this.Birthdate = new Date(response.data.birthdate)
                this.pkey = response.data.pkey
                this.skey = response.data.skey
                this.$axios.setToken(false)
                this.isLoadingb = false
                Toast.open({
                  message: response.data.message,
                  type: 'is-success',
                })
              } else {
                this.$axios.setToken(false)
                this.isLoadingb = false
                Toast.open({
                  message: response.data.message,
                  type: 'is-danger',
                })
              }
            })
            .catch((e) => {
              this.$axios.setToken(false)
              this.isLoadingb = false
              Toast.open({
                message: 'ข้อมูลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง',
                type: 'is-danger',
              })
            })
        } else {
          this.isLoadingb = false
          Toast.open({
            message:
              'ชื่อต้องมากกว่า 2 ตัวอักษรแต่ไม่เกิน 30 ตัวอักษรและนามสกุลมากกว่า 2 ตัวอักษรแต่ไม่เกิน 150 ตัวอักษร',
            type: 'is-danger',
          })
        }
      } else {
        this.isLoadingb = false
        Toast.open({
          message: 'กรอกข้อมูลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง',
          type: 'is-danger',
        })
      }
    },
  },
}
</script>
<style scoped>
.acc .hacc {
  text-align: center;
  font-size: 2.5rem;
  margin: 2rem 0;
}

.acc .fieldwrapper {
  margin-bottom: 2rem;
  text-align: left;
}

.acc button.submit {
  width: 100%;

  /*
  background: -webkit-gradient( linear, 0% 50%, 100% 50%, color-stop(0%, #f38ec3), color-stop(100%, #f26687) );
  background: -moz-linear-gradient(left, #f38ec3, #f26687);
  background: -webkit-linear-gradient(left, #f38ec3, #f26687); */
  background: linear-gradient(to right, #f38ec3, #f26687);
  border: none;
  border-radius: 25px;
  padding: 15px 25px;
  font-size: 15px;
  color: #fff;
  cursor: pointer;
}
</style>
