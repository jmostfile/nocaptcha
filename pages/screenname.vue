<template>
  <div class="container bg-ghostwhite">
    <div v-if="$fetchState.pending" class="p-y-lg p-x-md">
      <b-loading v-model="isLoading" :is-full-page="true"></b-loading>
    </div>
    <div v-else-if="$fetchState.error" class="p-y-lg p-x-md">
      <h3 class="title has-text-centered">ไม่มีหน้าดังกล่าว</h3>
    </div>
    <div v-else>
      <div
        v-if="user_details"
        class="columns is-mobile is-multiline is-relative is-centered"
      >
        <div
          class="column is-full has-background-grey-light user-cover is-relative"
        >
          <figure class="image is-relative">
            <img
              v-if="user_details.encover_images"
              v-show="!showCoverPreview"
              id="CoverImg"
              :src="$blobimg(user_details.encover_images)"
              :alt="user_details.displayname || '@' + user_details.screenname"
              class="has-background-white"
              @load="onLoaded"
            />
            <img v-else v-show="!showCoverPreview" id="CoverImg" />
            <img
              v-show="showCoverPreview"
              :src="CoverimagePreview"
              class="PreviewCover"
            />
          </figure>
          <template v-if="loggedInUser && user_details">
            <template v-if="loggedInUser && user_details.screenname">
              <input
                id="CoverUpload"
                ref="CoverFile"
                type="file"
                style="display: none"
                accept="image/*"
                @change="PreviewCoverImg()"
              />
              <b-button
                v-if="
                  loggedInUser.profile.screenname === user_details.screenname
                "
                v-show="!showCoverPreview"
                class="edtcover"
                @click="CoverFiles()"
                >แก้ไขภาพหน้าปก</b-button
              >
              <div
                v-show="showCoverPreview"
                class="edtcoverimgbutton has-text-white has-text-centered buttons has-addons is-right"
              >
                <button
                  class="button is-success is-inverted"
                  @click="CoverImgsubmitFile()"
                >
                  <i class="fas fa-check"></i> ยืนยัน
                </button>
                <button
                  class="button is-danger is-inverted"
                  @click="CancelPreviewCoverImg()"
                >
                  <i class="fas fa-times"></i> ยกเลิก
                </button>
              </div>
            </template>
          </template>
        </div>
        <div
          class="column is-full-mobile is-narrow has-text-centered-mobile is-profile-img has-background-white"
        >
          <figure
            v-if="user_details"
            class="image is-256x256 has-text-centered-mobile is-relative"
          >
            <img
              v-if="user_details.enprofile_images"
              v-show="!showPreview"
              id="ProfileImg"
              :src="$blobimg(user_details.enprofile_images)"
              :alt="user_details.displayname || '@' + user_details.screenname"
              class="has-background-white"
              @load="onLoaded"
            />
            <img
              v-else
              v-show="!showPreview"
              id="ProfileImg"
              :src="defaultprofileimg"
              :alt="user_details.displayname || '@' + user_details.screenname"
              @load="onLoaded"
            />
            <img
              v-show="showPreview"
              :src="imagePreview"
              class="previewprofile"
            />
          </figure>
          <template v-if="loggedInUser && user_details">
            <template v-if="loggedInUser && user_details.screenname">
              <template
                v-if="
                  loggedInUser.profile.screenname === user_details.screenname
                "
              >
                <input
                  id="ProfileUpload"
                  ref="ProfileFile"
                  type="file"
                  name="ProfileImg"
                  style="display: none"
                  accept="image/*"
                  @change="previewprofileImg()"
                />
                <div
                  v-show="!showPreview"
                  class="edtprofileimg has-text-white has-text-centered buttons is-centered"
                >
                  <button class="button" @click="ProfileFiles()">
                    แก้ไขรูปโปรไฟล์
                  </button>
                </div>
                <div
                  v-show="showPreview"
                  class="edtprofileimgbutton has-text-white has-text-centered buttons has-addons is-centered"
                >
                  <button
                    class="button is-success is-inverted"
                    @click="ProfileImgsubmitFile()"
                  >
                    <i class="fas fa-check"></i> ยืนยัน
                  </button>
                  <button
                    class="button is-danger is-inverted"
                    @click="CancelpreviewprofileImg()"
                  >
                    <i class="fas fa-times"></i> ยกเลิก
                  </button>
                </div>
              </template>
            </template>
          </template>
        </div>
        <div class="column is-full-mobile user-details">
          <div class="columns is-mobile is-multiline">
            <div class="column is-full-mobile is-two-thirds-desktop">
              <div class="has-text-centered-mobile">
                <h1 v-if="user_details" class="is-marginless">
                  <router-link
                    v-if="user_details"
                    :to="{ path: '@' + user_details.screenname }"
                    :title="
                      user_details.displayname ||
                      '@' + user_details.screenname
                    "
                  >
                    <strong id="DPname">{{
                      user_details.displayname ||
                      '@' + user_details.screenname
                    }}</strong>
                  </router-link>
                </h1>
                <router-link
                  v-if="user_details"
                  :to="{ path: '@' + user_details.screenname }"
                  :title="
                    user_details.displayname || '@' + user_details.screenname
                  "
                >
                  <small v-if="user_details" id="SCname" class="has-text-grey"
                    >@{{ user_details.screenname }}</small
                  >
                </router-link>
              </div>
            </div>
            <div
              class="column is-full-mobile is-one-thirds-desktop has-text-centered has-text-right-desktop"
            >
              <template v-if="loggedInUser && user_details">
                <small v-if="loggedInUser && user_details.screenname">
                  <b-button
                    v-if="
                      loggedInUser.profile.screenname ===
                      user_details.screenname
                    "
                    @click="EditProfile()"
                    ><i class="fas fa-edit"></i> แก้ไขข้อมูลสาธารณะ</b-button
                  >
                </small>
              </template>
              <template v-if="loggedInUser && user_details">
                <template v-if="loggedInUser && user_details.screenname">
                  <template
                    v-if="
                      loggedInUser.profile.screenname ===
                      user_details.screenname
                    "
                  >
                    <b-modal :active.sync="isEditPublicActive">
                      <div
                        class="modal-card has-text-left"
                        style="width: auto; margin: 0 1rem"
                      >
                        <header class="modal-card-head">
                          <p class="modal-card-title">แก้ไขข้อมูลสาธารณะ</p>
                        </header>
                        <form @submit.prevent="EditProfileSubmit">
                          <section class="modal-card-body">
                            <b-field
                              label="ชื่อที่ใช้สาธารณะ (ตัวอักษร A-Z_0-9 เท่านั้น)"
                            >
                              <b-input
                                v-model="DisplayName"
                                type="text"
                                placeholder="ชื่อที่ใช้สาธารณะ"
                                name="DisplayName"
                                maxlength="30"
                                autocomplete="off"
                                required
                              >
                              </b-input>
                            </b-field>
                            <b-field
                              label="ชื่อสำหรับระบุตัวตน (ตัวอักษร A-Z_0-9 เท่านั้น)"
                            >
                              <b-input
                                v-model="ScreenName"
                                type="text"
                                placeholder="ชื่อสำหรับระบุตัวตน"
                                name="ScreenName"
                                icon="at"
                                maxlength="30"
                                autocomplete="off"
                                required
                              >
                              </b-input>
                            </b-field>
                          </section>
                          <footer class="modal-card-foot buttons is-right">
                            <button class="button is-primary">
                              แก้ไขข้อมูล
                            </button>
                            <button
                              class="button"
                              type="button"
                              @click="isEditPublicActive = false"
                            >
                              ปิด
                            </button>
                          </footer>
                        </form>
                      </div>
                    </b-modal>
                  </template>
                </template>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="p-y-lg p-x-md">
        <h3 class="title has-text-centered">ไม่มีหน้าดังกล่าว</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ToastProgrammatic as Toast } from 'buefy'
import defaultprofileimg from '~/assets/default_profile.png'

export default {
  name: 'ScreennamePage',
  data() {
    return {
      defaultprofileimg,
      user_details: [],
      errors: [],
      file: '',
      showPreview: false,
      imagePreview: '',
      coverfile: '',
      showCoverPreview: false,
      CoverimagePreview: '',
      isEditPublicActive: false,
      DisplayName: '',
      ScreenName: '',
      title: 'ไม่มีหน้าดังกล่าว',
      description: 'ไม่มีหน้าดังกล่าว',
      isLoading: true,
    }
  },
  async fetch() {
    this.user_details = await fetch(
      `${this.$axios.defaults.baseURL}api/account/profile/${this.$route.params.screenname}/`
    ).then((res) => res.json())
    if (this.user_details.displayname) {
      this.title = this.user_details.displayname
      this.description = this.user_details.displayname
    } else if (this.user_details) {
      this.title = '@' + this.user_details.screenname
      this.description = '@' + this.user_details.screenname
    } else {
      this.title = 'ไม่มีหน้าดังกล่าว'
      this.description = 'ไม่มีหน้าดังกล่าว'
    }
  },
  head() {
    return {
      title: 'Edenra - ' + this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Edenra - ' + this.title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.description,
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: 'Edenra - ' + this.title,
        },
        {
          hid: 'apple-mobile-web-app-title',
          property: 'apple-mobile-web-app-title',
          content: 'Edenra - ' + this.title,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Edenra - ' + this.title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.description,
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: 'Edenra - ' + this.title,
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['loggedInUser']),
  },
  created() {},
  methods: {
    ProfileFiles() {
      document.getElementById('ProfileUpload').click()
    },
    CoverFiles() {
      document.getElementById('CoverUpload').click()
    },
    previewprofileImg() {
      this.file = this.$refs.ProfileFile.files[0]
      const reader = new FileReader()
      reader.addEventListener(
        'load',
        function () {
          this.showPreview = true
          this.imagePreview = reader.result
        }.bind(this),
        false
      )
      if (this.file) {
        if (/\.(jpe?g|png|gif)$/i.test(this.file.name)) {
          reader.readAsDataURL(this.file)
        }
      }
    },
    PreviewCoverImg() {
      this.coverfile = this.$refs.CoverFile.files[0]
      const reader = new FileReader()
      reader.addEventListener(
        'load',
        function () {
          this.showCoverPreview = true
          this.CoverimagePreview = reader.result
        }.bind(this),
        false
      )
      if (this.coverfile) {
        if (/\.(jpe?g|png|gif)$/i.test(this.coverfile.name)) {
          reader.readAsDataURL(this.coverfile)
        }
      }
    },
    ProfileImgsubmitFile() {
      const token = this.$auth.getToken('local')

      if (this.file !== '') {
        const file = this.file
        const formData = new FormData()
        formData.append('file', file)
        this.$axios.setToken(token)
        this.$axios
          .post('/api/account/profile/img/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          .then((response) => {
            if (response.data.status === 'success') {
              this.user_details.enprofile_images = response.data.img
              this.$auth.fetchUser()
              this.file = ''
              this.showPreview = false
              this.imagePreview = ''
              this.$axios.setToken(false)
              Toast.open({
                message: response.data.message,
                type: 'is-success',
              })
            } else {
              this.file = ''
              this.showPreview = false
              this.imagePreview = ''
              this.$axios.setToken(false)
              Toast.open({
                message: response.data.message,
                type: 'is-danger',
              })
            }
          })
          .catch((e) => {
            this.file = ''
            this.showPreview = false
            this.imagePreview = ''
            this.$axios.setToken(false)
            this.errors.push(e)
            Toast.open({
              message: 'ข้อมูลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง',
              type: 'is-danger',
            })
          })
      } else {
        Toast.open({
          message: 'ข้อมูลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง',
          type: 'is-danger',
        })
      }
    },
    CoverImgsubmitFile() {
      const token = this.$auth.getToken('local')

      if (this.coverfile !== '') {
        const coverfile = this.coverfile

        const formData = new FormData()
        formData.append('coverfile', coverfile)

        this.$axios.setToken(token)
        this.$axios
          .post('/api/account/profile/cover/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          .then((response) => {
            if (response.data.status === 'success') {
              this.user_details.encover_images = response.data.img
              this.$auth.fetchUser()
              this.coverfile = ''
              this.showCoverPreview = false
              this.CoverimagePreview = ''
              this.$axios.setToken(false)
              Toast.open({
                message: response.data.message,
                type: 'is-success',
              })
            } else {
              this.coverfile = ''
              this.showCoverPreview = false
              this.CoverimagePreview = ''
              this.$axios.setToken(false)
              Toast.open({
                message: response.data.message,
                type: 'is-danger',
              })
            }
          })
          .catch((e) => {
            this.coverfile = ''
            this.showCoverPreview = false
            this.CoverimagePreview = ''
            this.errors.push(e)
            this.$axios.setToken(false)
            Toast.open({
              message: 'ข้อมูลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง',
              type: 'is-danger',
            })
          })
      } else {
        Toast.open({
          message: 'ข้อมูลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง',
          type: 'is-danger',
        })
      }
    },
    CancelpreviewprofileImg() {
      this.file = ''
      this.showPreview = false
      this.imagePreview = ''
    },
    CancelPreviewCoverImg() {
      this.coverfile = ''
      this.showCoverPreview = false
      this.CoverimagePreview = ''
    },
    EditProfile() {
      this.isEditPublicActive = true
      this.DisplayName =
        this.user_details.displayname || '@' + this.user_details.screenname
      this.ScreenName = this.user_details.screenname
    },
    EditProfileSubmit() {
      const token = this.$auth.getToken('local')

      // const pattern = new RegExp(/[~`!@#$%^&*+=_\-[\]\\';,/{}|\\":<>?]/)
      const pattern = /^[a-zA-Z0-9_]+$/
      if (
        this.DisplayName !== '' &&
        this.ScreenName !== '' &&
        pattern.test(this.DisplayName) &&
        pattern.test(this.ScreenName)
      ) {
        if (
          this.DisplayName.length > 5 &&
          this.ScreenName.length > 7 &&
          this.DisplayName.length < 31 &&
          this.ScreenName.length < 31
        ) {
          const displayname = this.DisplayName
          const screenname = this.ScreenName
          const formData = new FormData()
          formData.append('DisplayName', displayname)
          formData.append('ScreenName', screenname)

          this.$axios.setToken(token)
          this.$axios
            .post('/api/account/profile/public/', formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then((response) => {
              if (response.data.status === 'success') {
                document.getElementById('DPname').src =
                  response.data.displayname
                document.getElementById('SCname').src = response.data.screenname
                this.$auth.fetchUser()
                this.user_details.displayname = response.data.displayname
                this.user_details.screenname = response.data.screenname
                this.DisplayName = response.data.displayname
                this.ScreenName = response.data.screenname
                this.isEditPublicActive = false
                this.$axios.setToken(false)
                Toast.open({
                  message: response.data.message,
                  type: 'is-success',
                })
                if (
                  response.data.screenname !== this.$route.params.screenname
                ) {
                  this.$router.push('/@' + response.data.screenname)
                }
                document.title = response.data.displayname + ' - Edenra'
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
              this.errors.push(e)
            })
        } else {
          this.$axios.setToken(false)
          Toast.open({
            message:
              'ชื่อที่ใช้สาธารณะต้องมากกว่า 6 ตัวอักษรและชื่อสำหรับระบุตัวตนต้องมากกว่า 8 ตัวอักษรแต่ไม่เกิน 30 ตัวอักษร',
            type: 'is-danger',
          })
        }
      } else {
        this.$axios.setToken(false)
        Toast.open({
          message: 'กรอกข้อมูลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง',
          type: 'is-danger',
        })
      }
    },
    onLoaded() {
      URL.revokeObjectURL(this.src)
    },
  },
}
</script>
<style scoped>
.columns {
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
}

.image.is-256x256 {
  height: 256px;
  width: 256px;
}

.user-cover {
  min-height: 350px;
  padding: 0;
}

figure {
  margin: auto 0;
}

.user-cover figure {
  max-width: 1344px;
  max-height: 350px;
}

.user-cover figure img {
  width: 100%;
  height: 100%;
  min-width: 100%;
  min-height: 350px;
  max-width: 1344px;
  max-height: 350px;
}

.edtcover {
  position: absolute;
  bottom: 1.25em;
  right: 1.25em;
}

.edtcoverimgbutton {
  position: absolute;
  bottom: 1.25em;
  right: 1.25em;
}

.edtprofileimg {
  position: absolute;
  width: 100%;
  bottom: -20px;
  padding: 4px;
  display: flex;
  align-items: center;
  z-index: 2;
  margin-bottom: -0.5rem !important;
}

.previewprofile {
  z-index: 1;
}

.edtprofileimg span {
  width: 100%;
}

.edtprofileimgbutton {
  position: absolute;
  width: 100%;
  bottom: -20px;
  padding: 4px;
  display: flex;
  align-items: center;
  z-index: 2;
}

.edtprofileimgbutton button {
  border-color: #dbdbdb;
  border-width: 1px;
}

.edtprofileimgbutton i {
  margin-right: 5px;
}

.is-profile-img {
  position: relative;
  margin-top: -133px;
  padding: 4px;
  max-width: 266px;
  max-height: 266px;
  border: 1px #dbdbdb solid;
  margin-left: 1.25em;
  z-index: 1;
}

.is-profile-img figure img {
  width: 100%;
  height: 100%;
  min-width: 256px;
  min-height: 256px;
  max-width: 256px;
  max-height: 256px;
}

.user-details {
  min-height: 200px;
}

h1 {
  font-size: 2em;
  color: #363636;
  font-weight: 600;
  line-height: 1.125;
}

small {
  font-size: 1em;
}
@media screen and (max-width: 768px) {
  .is-profile-img {
    margin-left: 0 !important;
  }

  .edtcover {
    position: absolute;
    top: 1.25em;
    right: 1.25em;
    bottom: auto;
  }

  .edtcoverimgbutton {
    position: absolute;
    top: 1.25em;
    right: 1.25em;
    bottom: auto;
  }

  .user-cover figure img {
    width: 100%;
    height: 100%;
    min-width: 100%;
    min-height: 350px;
    max-width: 1344px;
    max-height: 350px;
  }
}
</style>
