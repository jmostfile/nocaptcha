export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Edenra - หน้าหลัก',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Edenra.com แหล่งรวมสาระความบันเทิงรูปแบบใหม่ พบกับ Exclusive Content ที่เราได้สร้างสรรขึ้นมาเพื่อพวกคุณโดยเฉพาะ เรามี Content อันหลากหลายที่คุณสามารถเลือก อ่าน ฟัง ดู เล่น ได้ตามความชอบของคุณ หวังว่าคุณจะได้รับความสุข ความสนุกสนาน และสิ่งดีๆจากที่แห่งนี้' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'og:title',property: 'og:title',content: 'Edenra - หน้าหลัก', },
      { hid: 'og:description',property: 'og:description',content: 'Edenra.com แหล่งรวมสาระความบันเทิงรูปแบบใหม่ พบกับ Exclusive Content ที่เราได้สร้างสรรขึ้นมาเพื่อพวกคุณโดยเฉพาะ เรามี Content อันหลากหลายที่คุณสามารถเลือก อ่าน ฟัง ดู เล่น ได้ตามความชอบของคุณ หวังว่าคุณจะได้รับความสุข ความสนุกสนาน และสิ่งดีๆจากที่แห่งนี้', },
      { hid: 'og:image',property: 'og:image',content: '/socialimg.png', },
      { hid: 'twitter:card',property: 'twitter:card',content: '/socialimg.png', }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/color.css',
    '@/assets/css/spacing.css',
    '@/assets/css/transitions.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-plyr', mode: 'client' },
    '~/plugins/blobimg',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/auth',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    //baseURL: 'http://127.0.0.1:8000/',
    baseURL: 'https://api.edenra.com/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  auth: {
    // localStorage: false,
    cookie: false,
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'access_token',
          //maxAge: 2280,
          maxAge: 60 * 60 * 24 * 7,
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          //maxAge: 60 * 60 * 24 * 3,
          maxAge: 60 * 60 * 24 * 30,
        },
        endpoints: {
          login: {
            url: 'auth/jwt/create/',
            method: 'post',
            propertyName: false,
          },
          refresh: { url: 'auth/jwt/refresh/', method: 'post', propertyName: false },
          logout: false,
          user: {
            url: 'auth/users/me/',
            method: 'get',
            propertyName: false,
          },
        },
      },
    },
    plugins: ['~/plugins/axios.js', { src: '~/plugins/auth.js', mode: 'client' }, { src: '~/plugins/checkitem.js', mode: 'client' }],
    redirect: false,
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: '@screenname',
        path: '/@:screenname',
        component: resolve(__dirname, 'pages/screenname.vue')
      })
      routes.forEach((route) => {
        // When options.generate.subFolders is true (default)
        const alias =
          route.path.length > 1 ? `${route.path}/index.html` : '/index.html'
        // When options.generate.subFolders is false
        // const normalizedRoute = route.path.replace(/\/$/, '') // Remove trailing slashes if they exist
        // const alias =
        //   route.path.length > 1 ? `${normalizedRoute}.html` : '/index.html'
        route.alias = alias
      })
    }
  },
  
  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    }
  },
}
