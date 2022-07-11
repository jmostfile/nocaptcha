import Vue from 'vue'
import VuePlyr from 'vue-plyr/dist/vue-plyr.ssr.js'
import 'vue-plyr/dist/vue-plyr.css'

// The second argument is the default config values which can be omitted.
Vue.use(VuePlyr, {
  plyr: {
    invertTime: false,
    speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] },
    quality: {
      default: 576,
      options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240],
    },
  },
  emit: ['timeupdate', 'statechange', 'playing', 'play', 'ended'],
})
