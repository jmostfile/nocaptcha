<template>
  <div class="is-full-width">
    <GifBanner />
    <div class="container">
      <section class="p-md">
        <IndexLive />
      </section>
      <section class="p-md">
        <IndexList />
      </section>
    </div>
  </div>
</template>

<script>
import GifBanner from '~/components/GifBanner'
import IndexList from '~/components/index_List'
import IndexLive from '~/components/index_Live'

export default {
  name: 'IndexPage',
  components: {
    GifBanner,
    IndexList,
    IndexLive,
  },
}
</script>
