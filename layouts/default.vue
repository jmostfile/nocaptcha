<template>
  <div id="app">
    <Header />
    <section class="hero is-fullheight-with-navbar has-background-grey-lighter">
      <div class="hero-body is-paddingless">
        <nuxt keep-alive />
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'

export default {
  name: 'default_layout',
  components: {
    Header,
    Footer,
  },
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=K2D&display=swap');

html,
body {
  font-family: 'K2D', sans-serif;
  height: 100%;
}
</style>
