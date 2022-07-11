<template>
  <div class="is-full-width">
    <GifBanner />
    <div class="container p-y-lg p-x-md">
      <h3 v-if="error.statusCode === 404" class="title has-text-centered p-y-lg p-x-md">ไม่มีหน้าดังกล่าว</h3>
      <h3 v-else class="title has-text-centered p-y-lg p-x-md">เกิดข้อพลาดในการเรียกหน้านี้กรุณาลองใหม่อีกครั้ง</h3>
    </div>
    <div class="m-b-xxl p-b-xxl"><div class="m-b-xxl p-b-xxl"></div></div>
  </div>
</template>

<script>
import GifBanner from '~/components/GifBanner'

export default {
  props: ['error'],
  components: {
    GifBanner,
  },
  layout: 'error',
}
</script>
