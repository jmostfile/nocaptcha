<template>
  <section class="m-b-lg">
    <div class="columns is-mobile is-multiline is-relative is-centered">
      <div class="column is-full-mobile is-3-tablet has-text-centered-mobile p-lg-mobile">
        <div class="is-poster-img has-background-white">
          <figure class="image is-4by5 has-text-centered-mobile is-relative">
              <img
              :src="$blobimg(content.poster_images.enimages)"
              :alt="content.title || content.name"
              class="has-background-white"
              @load="onLoaded"
              />
          </figure>
        </div>
      </div>
      <div class="column is-full-mobile is-9-tablet is-paddingless">
        <div class="has-text-centered-mobile content-info">
          <h1 class="m-b-md">
            <strong class="has-text-shadow">
              {{ content.title || content.name }}
            </strong>
          </h1>
          <small>
            <div class="columns is-mobile is-multiline is-vcentered">
              <div class="column is-full-mobile has-text-centered-mobile">
                <b-tooltip v-if="type===1" label="หมวดหมู่" position="is-bottom" type="is-light" animated>
                  <b-icon icon="view-list" class="has-text-shadow cat-icon text-blue"></b-icon>
                  <span v-if="content.category.name" class="m-x-sm has-text-shadow">
                    {{ content.category.name }}
                  </span>
                  <span v-else class="m-x-sm has-text-shadow">
                    {{ content.category }}
                  </span>
                </b-tooltip>
                <b-tooltip v-if="type===2" label="วันที่รายการเริ่มฉาย" position="is-bottom" type="is-light" animated>
                  <b-icon icon="film" class="has-text-shadow" type="is-primary"></b-icon>
                  <span class="m-x-sm has-text-shadow">
                    {{ dateFormatter(content.created_on) }}
                  </span>
                </b-tooltip>
              </div>
              <div class="column is-full-mobile has-text-right has-text-centered-mobile">
                  <b-tooltip label="แชร์ไปยัง facebook" position="is-bottom" type="is-light" animated>
                    <a :href="'https://www.facebook.com/sharer/sharer.php?u=https://www.edenra.com'+this.$router.currentRoute.path" target="_blank">
                      <b-button icon-right="facebook" class="fab-facebook m-x-sm has-text-white" rounded></b-button>
                    </a>
                  </b-tooltip>
                  <b-tooltip label="แชร์ไปยัง twitter" position="is-bottom" type="is-light" animated>
                    <a :href="'https://twitter.com/intent/tweet?text='+content.title+'!&url=https://www.edenra.com'+this.$route.fullPath" target="_blank">
                      <b-button icon-right="twitter" class="fab-twitter m-x-sm has-text-white" rounded></b-button>
                    </a>
                  </b-tooltip>
                  <b-tooltip label="Copy URL" position="is-bottom" type="is-light" animated>
                    <b-button @click.stop.prevent="copyURL" icon-right="link" class="m-x-sm" rounded></b-button>
                  </b-tooltip>
              </div>
            </div>
          </small>
        </div>
        <div class="p-x-md p-y-sm m-b-md">
          <b-collapse class="card" animation="slide" aria-id="contentdetails">
            <template #trigger="props">
            <div class="card-header" role="button" aria-controls="contentdetails">
              <p class="card-header-title text-dblue">รายละเอียด</p>
              <a class="card-header-icon">
                <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
              </a>
            </div>
            </template>
            <div class="card-content">
              <div class="content">
                <div v-html="content.content"></div>
              </div>
            </div>
          </b-collapse>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ContentInfo',
  props: {
    content: Object,
    type: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {}
  },
  methods: {
    dateFormatter(dt) {
      const split = dt.split('T')
      const date = new Date(split[0])
      return (
        date.getDate() +
        ' ' +
        date.toLocaleString('th', { month: 'long' }) +
        ' ' +
        date.getFullYear()
      )
    },
    copyURL() {
      const aux = document.createElement('input')
      aux.setAttribute('value', window.location.href)
      document.body.appendChild(aux)
      aux.select()
      document.execCommand('copy')
      document.body.removeChild(aux)
      this.$buefy.toast.open({message: 'Copy URL เรียบร้อยแล้ว',type: 'is-success'})
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

figure {
  margin: auto 0;
}

.is-poster-img {
  padding: 4px;
  border: 1px #dbdbdb solid;
  z-index: 1;
}

.is-poster-img figure {
  background: #fff;
}

.is-poster-img figure img {
  width: 100%;
  height: 100%;
}

.has-text-shadow {
  color: #4a4a4a;
  text-shadow: 0 0 4px #f8f8ff;
}

.content-info {
  padding: 1rem;
}

.content-info .cat-icon {
  position: relative;
  top: 4px;
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
</style>
