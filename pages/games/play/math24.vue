<template>
  <div class="is-full-width">
    <main class="container p-y-lg">
      <div id="gamecon" class="is-relative">
        <canvas id="maingame" />
        <div id="gamemenu">
          <div>
            <img src="~/assets/game/24game/math24_logo.png" class="menulogo" />
          </div>
          <ul>
            <li>
              <div class="menuli">
                <img
                  src="~/assets/game/24game/button-start-over.png"
                  class="is-clickable"
                  @click="startlv()"
                /><img
                  src="~/assets/game/24game/button-start.png"
                  class="img-top is-clickable"
                  @click="startlv()"
                />
              </div>
            </li>
          </ul>
        </div>
        <div id="gamestage">
          <div class="columns is-vcentered is-mobile is-multiline">
            <div class="column is-2-desktop is-hidden-touch"></div>
            <div class="column is-8-desktop is-full-touch">
              <h1 class="has-text-centered has-text-white is-size-1">
                <span v-show="display24 === ''" class="is-size-3-touch"
                  >ทำให้ตัวเลข 4 ตัวด้านล่างได้เท่ากับ 24</span
                >
                {{ display24 }}
              </h1>
            </div>
            <div class="column is-2-desktop is-hidden-touch"></div>
            <div class="column is-2-desktop is-hidden-touch"></div>
            <div class="column is-half-touch is-2-desktop">
              <b-button
                id="pos1"
                class="is-size-1 gbutton text-green has-text-weight-bold"
                :disabled="!numstage || pos1"
                expanded
                @click="bclicknum('pos1')"
              ></b-button>
            </div>
            <div class="column is-half-touch is-2-desktop">
              <b-button
                id="pos2"
                class="is-size-1 gbutton text-orange has-text-weight-bold"
                :disabled="!numstage || pos2"
                expanded
                @click="bclicknum('pos2')"
              ></b-button>
            </div>
            <div class="column is-half-touch is-2-desktop">
              <b-button
                id="pos3"
                class="is-size-1 gbutton text-blue has-text-weight-bold"
                :disabled="!numstage || pos3"
                expanded
                @click="bclicknum('pos3')"
              ></b-button>
            </div>
            <div class="column is-half-touch is-2-desktop">
              <b-button
                id="pos4"
                class="is-size-1 gbutton text-pink has-text-weight-bold"
                :disabled="!numstage || pos4"
                expanded
                @click="bclicknum('pos4')"
              ></b-button>
            </div>
            <div class="column is-2-desktop is-hidden-touch"></div>
            <div class="column is-2-desktop is-hidden-touch"></div>
            <div class="column is-3-touch is-2-desktop">
              <b-button
                :disabled="numstage"
                class="is-size-3 gbutton has-text-weight-bold"
                rounded
                @click="bclickop('+')"
                >+</b-button
              >
            </div>
            <div class="column is-3-touch is-2-desktop">
              <b-button
                :disabled="numstage"
                class="is-size-3 gbutton has-text-weight-bold"
                rounded
                @click="bclickop('-')"
                >-</b-button
              >
            </div>
            <div class="column is-3-touch is-2-desktop">
              <b-button
                :disabled="numstage"
                class="is-size-3 gbutton has-text-weight-bold"
                rounded
                @click="bclickop('*')"
                >x</b-button
              >
            </div>
            <div class="column is-3-touch is-2-desktop">
              <b-button
                :disabled="numstage"
                class="is-size-3 gbutton has-text-weight-bold"
                rounded
                @click="bclickop('/')"
                >/</b-button
              >
            </div>
            <div class="column is-2-desktop is-hidden-touch"></div>
            <div class="column is-2-desktop is-hidden-touch"></div>
            <div class="column is-6-touch is-4-desktop has-text-white">
              <b-icon
                icon="rotate-left"
                size="is-large"
                class="icon is-clickable iconshadow"
                @click.native="reset"
              />
            </div>
            <div class="column is-6-touch is-4-desktop has-text-white">
              <b-icon
                icon="sync"
                size="is-large"
                class="icon is-clickable iconshadow"
                @click.native="startlv"
              />
            </div>
            <div class="column is-2-desktop is-hidden-touch"></div>
          </div>
        </div>
        <div id="option" class="columns is-vcentered is-mobile">
          <div class="column is-paddingless">
            <img
              src="~/assets/game/24game/edenralogo.png"
              class="edenralogo is-hidden-mobile is-clickable"
              @click="home"
            />
            <img
              src="~/assets/game/24game/edenralogo-e.png"
              class="edenralogo is-hidden-tablet is-clickable"
              @click="home"
            />
          </div>
          <div class="column is-paddingless has-text-right">
            <img
              id="volicon"
              src="~/assets/game/24game/volumeclose-button.png"
              class="is-clickable"
              @click="sound"
            />
            <img
              id="fullicon"
              src="~/assets/game/24game/full-button.png"
              class="is-clickable"
              @click="fullscreen"
            />
          </div>
        </div>
      </div>
      <div class="content">
        <div class="columns is-mobile is-multiline is-vcentered m-b-none">
          <div class="column is-full-mobile has-text-centered-mobile">
            <h1 class="has-text-centered-mobile">
              <strong>เกม Math 24</strong>
            </h1>
          </div>
          <div class="column is-full-mobile has-text-right has-text-centered-mobile">
            <b-tooltip
              label="แชร์ไปยัง facebook"
              position="is-bottom"
              type="is-light"
              animated
            >
              <a :href="'https://www.facebook.com/sharer/sharer.php?u=https://www.edenra.com'+this.$router.currentRoute.path" target="_blank">
                <b-button icon-right="facebook" class="fab-facebook m-x-sm has-text-white" rounded></b-button>
              </a>
            </b-tooltip>
            <b-tooltip
              label="แชร์ไปยัง twitter"
              position="is-bottom"
              type="is-light"
              animated
            >
              <a :href="'https://twitter.com/intent/tweet?text='+this.title+'!&url=https://www.edenra.com'+this.$route.fullPath" target="_blank">
                <b-button icon-right="twitter" class="fab-twitter m-x-sm has-text-white" rounded></b-button>
              </a>
            </b-tooltip>
            <b-tooltip
              label="Copy URL"
              position="is-bottom"
              type="is-light"
              animated
            >
              <b-button @click.stop.prevent="copyURL" icon-right="link" class="m-x-sm" rounded></b-button>
            </b-tooltip>
          </div>
        </div>
        <div class="bg-ghostwhite content p-lg">
          <h3 class="has-text-info">คำอธิบาย</h3>
          <p>{{ description }}</p>
          <h3 class="has-text-info">วิธีการเล่น</h3>
          <ul>
            <li>1. คุณสามารถกดปุ่ม Start เพื่อเริ่มเกมได้</li>
            <li>2. เลือกตัวเลขตัวแรกที่คุณต้องการใช้คำนวน</li>
            <li>
              3. เลือกเครื่องหมาย บวก(+) ลบ(-) คูณ(x) หาร(/) ที่คุณต้องการ
            </li>
            <li>4. เลือกตัวเลขถัดไปเพื่อแสดงผลลัพธ์จาากการคำนวน</li>
            <li>
              5. ให้เลือกจนตัวเลขครบ 4 ตัว แล้วคำนวนผลลัพธ์ได้ 24 คุณก็จะชนะ
              หากไม่ได้ 24 ก็จะแพ้
            </li>
          </ul>
          <p>
            <b-icon icon="rotate-left" class="icon is-clickable iconshadow" />
            คือปุ่มสำหรับเริ่มโจทย์ข้อเดิมอีกครั้ง
          </p>
          <p>
            <b-icon icon="sync" class="icon is-clickable iconshadow" />
            คือปุ่มสำหรับเริ่มโจทย์ข้อใหม่
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { solve, evil } from '~/assets/game/24game/24.js'
import bgimage from '~/assets/game/24game/bg.png'
import fulliconimage from '~/assets/game/24game/full-button.png'
import fulliconimage2 from '~/assets/game/24game/full-over-button.png'
import voliconimage from '~/assets/game/24game/volume-button.png'
import voliconimage2 from '~/assets/game/24game/volumeclose-button.png'
import bgm from '~/assets/game/24game/track_stepbystep_loop.mp3'
import optionclick from '~/assets/game/24game/sfx_button1_click2.wav'
import menuclick from '~/assets/game/24game/sfx_button_return1.wav'
import winsound from '~/assets/game/24game/stinger_win1.wav'
import losesound from '~/assets/game/24game/stinger_lose1.wav'

export default {
  name: 'PlayMath24Page',
  data() {
    return {
      fulliconimage,
      audio: null,
      bgmisPlaying: false,
      clicknum: [],
      fournum: [],
      pos1: false,
      pos2: false,
      pos3: false,
      pos4: false,
      sumnum: [],
      exp24: '',
      sum24: '',
      display24: '',
      numstage: true,
      errors: [],
      isLoading: true,
      title: 'Edenra - เล่นเกม Math 24',
      description:
        'เกม Math 24 เป็นเกมทีคุณต้องแก้ปริศนาจากตัวเลข 4 ตัว ให้ได้เท่ากับ 24 โดยคุณจะสามารถใช้เครื่องหมาย บวก ลบ คูณ หาร เพื่อทำให้ตัวเลขทั้ง 4 ตัวมีผลลัพธ์เท่ากับ 24 ให้ได้',
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.description,
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: this.title,
        },
        {
          hid: 'apple-mobile-web-app-title',
          property: 'apple-mobile-web-app-title',
          content: this.title,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.description,
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: this.title,
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser', 'ipv4user']),
  },
  mounted() {
    const canvas = document.getElementById('maingame')
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const bgImage = new Image()
    bgImage.onload = function () {
      ctx.drawImage(bgImage, 0, 0)
    }
    bgImage.src = bgimage

    this.audio = document.createElement('audio')
    this.audio.loop = true
    this.audio.src = bgm
    this.audio.volume = 0.4
  },
  methods: {
    copyURL() {
      const aux = document.createElement('input')
      aux.setAttribute('value', window.location.href)
      document.body.appendChild(aux)
      aux.select()
      document.execCommand('copy')
      document.body.removeChild(aux)
      this.$buefy.toast.open({message: 'Copy URL เรียบร้อยแล้ว',type: 'is-success'})
    },
    home() {
      document.getElementById('gamemenu').style.display = 'block'
      document.getElementById('gamestage').style.display = 'none'
    },
    fullscreen() {
      this.optionsound()
      if (!document.fullscreenElement) {
        if (document.getElementById('gamecon').requestFullScreen)
          document.getElementById('gamecon').requestFullScreen()
        else if (document.getElementById('gamecon').webkitRequestFullScreen)
          document.getElementById('gamecon').webkitRequestFullScreen()
        else if (document.getElementById('gamecon').mozRequestFullScreen)
          document.getElementById('gamecon').mozRequestFullScreen()

        document.getElementById('gamemenu').style.top = '50%'
        document.getElementById('fullicon').src = fulliconimage2
      } else if (document.exitFullscreen) {
        document.exitFullscreen()
        document.getElementById('gamemenu').style.top = null
        document.getElementById('fullicon').src = fulliconimage
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen()
        document.getElementById('gamemenu').style.top = null
        document.getElementById('fullicon').src = fulliconimage
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen()
        document.getElementById('gamemenu').style.top = null
        document.getElementById('fullicon').src = fulliconimage
      }
    },
    sound() {
      this.optionsound()
      if (!this.bgmisPlaying || this.audio.paused) {
        this.audio.play()
        this.bgmisPlaying = true
        document.getElementById('volicon').src = voliconimage
      } else {
        this.audio.pause()
        this.bgmisPlaying = false
        document.getElementById('volicon').src = voliconimage2
      }
    },
    optionsound() {
      const os = document.createElement('audio')
      os.src = optionclick
      os.volume = 0.4
      os.play()
    },
    menusound() {
      const os = document.createElement('audio')
      os.src = menuclick
      os.volume = 0.4
      os.play()
    },
    startlv() {
      this.menusound()
      document.getElementById('gamemenu').style.display = 'none'
      document.getElementById('gamestage').style.display = 'block'
      this.numstage = true
      this.exp24 = ''
      this.sum24 = ''
      this.display24 = ''
      this.sumnum = []
      this.clicknum = []
      this.pos1 = false
      this.pos2 = false
      this.pos3 = false
      this.pos4 = false
      const ns = this.generate_new()
      if (ns) {
        // const solutions = solve(ns)
        // const solutionsarray = []
        // let s = solutions.length + ' solution(s)<br>'
        // for (let i = 0; i < solutions.length; i++) {
        // s += render(solutions[i]) + ' = 24<br>'
        //  solutionsarray.push(render(solutions[i]) + ' = 24')
        // }
        // const si = Math.floor(Math.random() * (solutions.length - 0)) + 0
        /// const ss = solutionsarray[si]
        this.fournum = ns
        document.getElementById('pos1').innerHTML = ns[0]
        document.getElementById('pos1').setAttribute('data-n', ns[0])
        document.getElementById('pos2').innerHTML = ns[1]
        document.getElementById('pos2').setAttribute('data-n', ns[1])
        document.getElementById('pos3').innerHTML = ns[2]
        document.getElementById('pos3').setAttribute('data-n', ns[2])
        document.getElementById('pos4').innerHTML = ns[3]
        document.getElementById('pos4').setAttribute('data-n', ns[3])
      }
    },
    generate_new() {
      let solved = false
      while (solved === false) {
        const numbers = []
        for (let i = 0; i < 4; i++) {
          numbers.push(this.random_int(0, 9))
        }
        const solutions = solve(numbers)
        if (solutions.length > 0) {
          solved = true
          return numbers
        }
      }
      return false
    },
    random_int(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    },
    bclicknum(id) {
      this.menusound()
      const button = document.getElementById(id)
      const n = button.getAttribute('data-n')
      this.numstage = false
      if (id === 'pos1') {
        this.pos1 = true
        document.getElementById('pos1').innerHTML = 'X'
        if (this.pos1 && this.pos2 && this.pos3 && this.pos4)
          this.numstage = true
      } else if (id === 'pos2') {
        this.pos2 = true
        document.getElementById('pos2').innerHTML = 'X'
        if (this.pos1 && this.pos2 && this.pos3 && this.pos4)
          this.numstage = true
      } else if (id === 'pos3') {
        this.pos3 = true
        document.getElementById('pos3').innerHTML = 'X'
        if (this.pos1 && this.pos2 && this.pos3 && this.pos4)
          this.numstage = true
      } else if (id === 'pos4') {
        this.pos4 = true
        document.getElementById('pos4').innerHTML = 'X'
        if (this.pos1 && this.pos2 && this.pos3 && this.pos4)
          this.numstage = true
      }
      this.clicknum.push(id)
      this.sumnum.push(n)
      this.exp24 = this.sum24 + n
      this.sum24 = this.sum24 + n
      this.sum24 = Math.round((evil(this.sum24) + Number.EPSILON) * 100) / 100
      this.display24 = this.exp24 + ' = ' + this.sum24

      if (this.pos1 && this.pos2 && this.pos3 && this.pos4) {
        if (this.sum24 === 24) {
          this.display24 = 'เก่งมาก ยินดีด้วย'
          const os = document.createElement('audio')
          os.src = winsound
          os.volume = 0.4
          os.play()
        } else {
          this.display24 = 'ไม่เป็นไร ลองใหม่อีกครั้งนะ'
          const os = document.createElement('audio')
          os.src = losesound
          os.volume = 0.4
          os.play()
        }
      }
    },
    bclickop(op) {
      this.menusound()
      this.numstage = true
      this.sumnum.push(op)
      this.sum24 = this.sum24 + op
    },
    reset() {
      this.menusound()
      this.numstage = true
      this.exp24 = ''
      this.sum24 = ''
      this.display24 = ''
      this.sumnum = []
      this.clicknum = []
      this.pos1 = false
      this.pos2 = false
      this.pos3 = false
      this.pos4 = false
      document.getElementById('pos1').innerHTML = this.fournum[0]
      document.getElementById('pos2').innerHTML = this.fournum[1]
      document.getElementById('pos3').innerHTML = this.fournum[2]
      document.getElementById('pos4').innerHTML = this.fournum[3]
    },
  },
}
</script>
<style scoped>
html,
body {
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden;
}

#game {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

#gamecon canvas {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
  min-width: 100%;
  min-height: 720px;
}

#gamemenu,
#gamestage {
  height: 100%;
  overflow: auto;
  margin: auto;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  text-align: center;
}

#gamemenu {
  top: 50%;
}

#gamestage {
  top: 30%;
  display: none;
  padding: 12px;
}

#gamestage .gbutton {
  padding: 1em;
  box-shadow: 0 9px #999;
}

#gamestage .gbutton:active {
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}

#gamestage .iconshadow {
  stroke: #999;
  stroke-width: 20;
}

#gamestage .iconshadow:active {
  stroke: #666;
  stroke-width: 20;
}

#gamemenu .menulogo {
  max-width: 375px;
  margin-bottom: 2.5rem;
}

#gamemenu ul li img {
  max-width: 225px;
  margin-bottom: 1rem;
}

#gamemenu .menuli {
  position: relative;
  display: inline-block;
}

#gamemenu .menuli .img-top {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
}

#gamemenu .menuli:hover .img-top {
  display: inline;
}

#option {
  top: 0.75rem;
  left: 0.75rem;
  position: absolute;
  width: 100%;
  padding: 10px;
}

#option .edenralogo {
  max-width: 275px;
}
@media screen and (max-width: 768px) {
  #gamestage {
    padding: 0 1rem;
  }

  #gamestage .gbutton {
    padding: 0.9em;
  }

  #gamemenu .menulogo {
    max-width: 300px;
  }
}
@media screen and (min-width: 1024px) {
  #gamestage {
    top: 50% !important;
  }
}
</style>
