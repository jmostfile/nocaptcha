<template>
  <div class="container acc p-y-lg">
    <h2 class="hacc text-pink p-y-lg">แอปเปิ้ลสีทอง</h2>
    <b-tabs type="is-toggle" expanded :multiline="true">
      <b-tab-item
        label="แลกเปลี่ยนแอปเปิ้ลสีทอง"
        header-class="has-background-white"
      >
        <b-collapse
          class="card"
          animation="slide"
          :open="isOpen == 0"
          @open="isOpen = 0"
        >
          <div
            slot="trigger"
            slot-scope="props"
            class="card-header"
            role="button"
          >
            <p class="card-header-title">บัตรเงินสดทรูมันนี่</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
            </a>
          </div>
          <div class="card-content has-background-white-ter">
            <div class="content">
              <form @submit.prevent="handleSubmit">
                <div class="fieldwrapper">
                  <b-field>
                    <b-input
                      id="id_username_form"
                      v-model="truemoney"
                      type="number"
                      name="truemoney"
                      placeholder="รหัสบัตรเงินสดทรูมันนี่ 14 หลัก"
                      required
                      autocomplete="off"
                      size="is-large"
                      maxlength="14"
                      validation-message="กรุณากรอกข้อมูล"
                      step="1"
                      min="0"
                      max="99999999999999"
                      @keydown="filterKey"
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
                    >แลกเปลี่ยนแอปเปิ้ลสีทอง</b-button
                  >
                </div>
                <p class="m-y-lg has-text-centered msgform">
                  <b-message type="is-info">
                    <p>
                      คุณจะได้รับแอปเปิ้ลสีทองจำนวนเท่ากับมูลค่าของบัตรเงินสดทรูมันนี่
                    </p>
                  </b-message>
                </p>
              </form>
            </div>
          </div>
        </b-collapse>
        <b-collapse
          class="card"
          animation="slide"
          :open="isOpen == 1"
          @open="isOpen = 1"
        >
          <div
            slot="trigger"
            slot-scope="props"
            class="card-header"
            role="button"
          >
            <p class="card-header-title">Paypal</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
            </a>
          </div>
          <div class="card-content has-background-white-ter">
            <div class="content msgform">
              <p class="m-y-lg has-text-centered msgform">
                <b-message type="is-info">
                  <p>
                    คุณจะได้รับแอปเปิ้ลสีทองจำนวนเท่ากับมูลค่าของเงิน Paypal
                  </p>
                  <p>
                    หากคุณเลือกน้อยกว่า 50 บาท จะถูกตั้งเป็น 50 โดยอัตโนมัติ
                  </p>
                </b-message>
              </p>
              <div class="fieldwrapper">
                <b-field>
                  <b-input
                    id="ipaypal"
                    v-model="ipaypal"
                    type="number"
                    name="ipaypal"
                    placeholder="จำนวนที่ต้องการเติม ขั้นต่ำ 50 THB"
                    required
                    autocomplete="off"
                    size="is-large"
                    validation-message="กรุณากรอกข้อมูล"
                    step="1"
                    min="50"
                    max="99999999999999"
                    @keydown="filterKey"
                  >
                  </b-input>
                </b-field>
              </div>
              <div ref="paypal" class="has-text-centered"></div>
            </div>
          </div>
        </b-collapse>
        <b-collapse
          class="card"
          animation="slide"
          :open="isOpen == 2"
          @open="isOpen = 2"
        >
          <div
            slot="trigger"
            slot-scope="props"
            class="card-header"
            role="button"
          >
            <p class="card-header-title">Code</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
            </a>
          </div>
          <div class="card-content has-background-white-ter">
            <div class="content">
              <form @submit.prevent="handleSubmit2">
                <div class="fieldwrapper">
                  <b-field>
                    <b-input
                      v-model="code"
                      type="text"
                      name="code"
                      placeholder="รหัส"
                      required
                      autocomplete="off"
                      size="is-large"
                      maxlength="14"
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
                    >แลกเปลี่ยนแอปเปิ้ลสีทอง</b-button
                  >
                </div>
                <p class="m-y-lg has-text-centered msgform">
                  <b-message type="is-info">
                    <p>
                      คุณจะได้รับแอปเปิ้ลสีทองจำนวนเท่ากับรายละเอียดของ Code
                      ที่ได้รับ
                    </p></b-message
                  >
                </p>
              </form>
            </div>
          </div>
        </b-collapse>
      </b-tab-item>
      <b-tab-item
        label="ประวัติแลกเปลี่ยนแอปเปิ้ลสีทอง"
        header-class="has-background-white"
      >
        <div v-if="$fetchState.pending" class="p-y-lg p-x-md">
          <b-loading v-model="isLoading2" :is-full-page="true"></b-loading>
        </div>
        <div v-else-if="$fetchState.error" class="p-y-lg p-x-md">
          <h3 class="title has-text-centered">
            ไม่มีประวัติแลกเปลี่ยนแอปเปิ้ลสีทอง
          </h3>
        </div>
        <div v-else>
          <template v-if="Array.isArray(historydata) && historydata.length">
            <b-table :data="historydata" :striped="true">
              <b-table-column v-slot="props" field="type" label="ประเภท">
                <span
                  v-if="props.row.type === 'True Money'"
                  class="has-text-danger"
                  >{{ props.row.type }}</span
                >
                <span
                  v-else-if="props.row.type === 'Paypal'"
                  class="has-text-info"
                  >{{ props.row.type }}</span
                >
                <span
                  v-else-if="props.row.type === 'Code'"
                  class="has-text-primary"
                  >{{ props.row.type }}</span
                >
                <span v-else>{{ props.row.type }}</span>
              </b-table-column>

              <b-table-column
                v-slot="props"
                field="password"
                label="รหัสทรูมันนี่ / Paypal / Code"
              >
                {{ props.row.password }}
              </b-table-column>

              <b-table-column v-slot="props" field="amount" label="จำนวน">
                {{ props.row.amount }}
              </b-table-column>

              <b-table-column v-slot="props" field="status" label="สถานะ">
                <template v-if="props.row.status === 0"
                  ><span class="tag is-warning">รอยืนยัน</span></template
                >
                <template
                  v-else-if="
                    props.row.status === 1 || props.row.status === 'COMPLETED'
                  "
                  ><span class="tag is-success">สำเร็จ</span></template
                >
                <template v-else-if="props.row.status === 2"
                  ><span class="tag is-warning">ไม่รู้สถานะ</span></template
                >
                <template v-else-if="props.row.status === 3"
                  ><span class="tag is-danger">ใช้งานแล้ว</span></template
                >
                <template v-else-if="props.row.status === 4"
                  ><span class="tag is-danger"
                    >ทำรายการไม่ถูกต้อง</span
                  ></template
                >
                <template v-else-if="props.row.status === 5"
                  ><span class="tag is-warning">บัตร Truemove</span></template
                >
                <template v-else
                  ><span class="tag is-warning">ไม่ทราบสถานะ</span></template
                >
              </b-table-column>

              <b-table-column
                v-slot="props"
                field="created_on"
                label="วันที่และเวลา"
              >
                {{ new Date(props.row.created_on).toLocaleDateString() }}
              </b-table-column>
            </b-table>
          </template>
          <template v-else>
            <section class="section">
              <div class="content has-text-grey has-text-centered">
                <p>ไม่มีประวัติแลกเปลี่ยนแอปเปิ้ลสีทอง</p>
              </div>
            </section>
          </template>
        </div>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import { ToastProgrammatic as Toast } from 'buefy'

export default {
  name : 'GoldenApplePage',
  data() {
    return {
      data: '',
      errors: [],
      truemoney: '',
      code: '',
      ipaypal: '50',
      isLoading: false,
      submitted: false,
      isOpen: 0,
      historydata: [],
      acctoken: '',
      isLoading2: true,
    }
  },
  async fetch() {
    const token = this.$auth.getToken('local')
    this.$axios.setToken(token)
    await this.$axios
      .$get(`/api/historygapple/`)
      .then((response) => {
        this.historydata = response
      })
      .catch((e) => {
        this.errors.push(e)
      })
    this.$axios.setToken(false)
  },
  head() {
    return {
      title: 'Edenra - แอปเปิ้ลสีทอง',
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
          content: 'Edenra - แอปเปิ้ลสีทอง',
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
          content: 'Edenra - แอปเปิ้ลสีทอง',
        },
        {
          hid: 'apple-mobile-web-app-title',
          property: 'apple-mobile-web-app-title',
          content: 'Edenra - แอปเปิ้ลสีทอง',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Edenra - แอปเปิ้ลสีทอง',
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
          content: 'Edenra - แอปเปิ้ลสีทอง',
        },
      ],
    }
  },
  watch: {
    ipaypal(value) {
      if (value < 50) {
        this.ipaypal = 50
      }
    },
  },
  mounted() {
    const script = document.createElement('script')
    script.src =
      'https://www.paypal.com/sdk/js?client-id=AfdJZjGb9YCa1zxqOSNj89DeXuesd9iHIABYEaxzgyfp5gN9wwnjcRYE6B_kHXp68y0o31QM_3_xZVdh&currency=THB'
    script.addEventListener('load', this.setLoaded)
    document.body.appendChild(script)
  },
  created() {
    if (!this.$auth.loggedIn) {
      this.$router.push({ name: 'index' })
    }
  },
  methods: {
    setLoaded() {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: 'Golden apple',
                  amount: {
                    currency_code: 'THB',
                    value: this.ipaypal,
                  },
                },
              ],
            })
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture()
            const transactionid = order.id
            const emailaddress = order.payer.email_address
            const givenname = order.payer.name.given_name
            const surname = order.payer.name.surname
            const payerid = order.payer.payer_id
            const fullname = order.purchase_units[0].shipping.name.full_name
            const address =
              order.purchase_units[0].shipping.address.address_line_1 +
              ' ' +
              order.purchase_units[0].shipping.address.admin_area_1 +
              ' ' +
              order.purchase_units[0].shipping.address.admin_area_2 +
              ' ' +
              order.purchase_units[0].shipping.address.country_code +
              ' ' +
              order.purchase_units[0].shipping.address.postal_code
            const amount = order.purchase_units[0].amount.value
            const status = order.status
            const createtime = order.create_time
            const updatetime = order.update_time
            const token = this.$auth.getToken('local')
            if (
              transactionid &&
              emailaddress &&
              givenname &&
              surname &&
              payerid &&
              fullname &&
              address &&
              amount &&
              status &&
              createtime &&
              updatetime
            ) {
              this.$axios.setToken(token)
              this.$axios
                .post('/api/goldenapple_paypal/', {
                  transactionid,
                  emailaddress,
                  givenname,
                  surname,
                  payerid,
                  fullname,
                  address,
                  amount,
                  status,
                  createtime,
                  updatetime,
                })
                .then((response) => {
                  if (status === 'COMPLETED') {
                    this.$axios.setToken(false)
                    this.$fetch()
                    this.$auth.fetchUser()
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
                  Toast.open({
                    message: 'ข้อมูลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง',
                    type: 'is-danger',
                  })
                })
            } else {
              Toast.open({
                message: 'กรุณากรอกข้อมูลให้ครบทุกช่อง',
                type: 'is-danger',
              })
            }
          },
          onError: (err) => {
            this.errors.push(err)
          },
        })
        .render(this.$refs.paypal)
    },
    handleSubmit(e) {
      this.submitted = true
      this.isLoading = true
      const token = this.$auth.getToken('local')
      const truemoney = this.truemoney
      if (truemoney) {
        this.$axios.setToken(token)
        this.$axios
          .post('/api/goldenapple_truemoney/', { truemoney })
          .then((response) => {
            if (response.data.status === 'success') {
              this.isLoading = false
              this.$fetch()
              this.$auth.fetchUser()
              this.$axios.setToken(false)
              Toast.open({ message: response.data.message, type: 'is-success' })
            } else {
              this.isLoading = false
              this.$axios.setToken(false)
              Toast.open({
                message: response.data.message,
                type: 'is-danger',
              })
            }
          })
          .catch((e) => {
            this.isLoading = false
            this.$axios.setToken(false)
            Toast.open({
              message: 'ข้อมูลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง',
              type: 'is-danger',
            })
          })
      } else {
        this.isLoading = false
        Toast.open({
          message: 'กรุณากรอกข้อมูลให้ครบทุกช่อง',
          type: 'is-danger',
        })
      }
    },
    handleSubmit2(e) {
      this.submitted = true
      this.isLoading = true
      const token = this.$auth.getToken('local')
      const code = this.code
      if (code) {
        this.$axios.setToken(token)
        this.$axios
          .post('/api/goldenapple_code/', { code })
          .then((response) => {
            if (response.data.status === 'success') {
              this.isLoading = false
              this.$fetch()
              this.$auth.fetchUser()
              this.$axios.setToken(false)
              Toast.open({ message: response.data.message, type: 'is-success' })
            } else {
              this.isLoading = false
              this.$axios.setToken(false)
              Toast.open({
                message: response.data.message,
                type: 'is-danger',
              })
            }
          })
          .catch((e) => {
            this.isLoading = false
            this.$axios.setToken(false)
            Toast.open({
              message: 'ข้อมูลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง',
              type: 'is-danger',
            })
          })
      } else {
        this.isLoading = false
        Toast.open({
          message: 'กรุณากรอกข้อมูลให้ครบทุกช่อง',
          type: 'is-danger',
        })
      }
    },
    filterKey(e) {
      const key = e.key
      if (key === '.') return e.preventDefault()
      if (key === 'e') return e.preventDefault()
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
  margin: 2rem 0 0;
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

.content table td,
.content table th {
  border: 0 !important;
}
@media screen and (max-width: 768px) {
  .smpla input::placeholder {
    font-size: 0.7rem;
  }
  
  .tabs {
    font-size: 0.7rem !important;
  }
}
</style>
