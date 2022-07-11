<template>
  <div class="is-full-width">
    <GifBanner />
    <div class="container">
      <section class="section">
        <div class="columns is-mobile is-multiline">
          <div class="column is-full-mobile is-half-desktop">
            <vue-plyr :emit="['play']">
              <div class="video-container plyr__video-embed">
                <iframe
                  src="https://youtu.be/vzy_16t4n-w"
                  allowfullscreen
                  allowtransparency
                  allow="autoplay"
                >
                </iframe>
              </div>
            </vue-plyr>
          </div>
          <div class="column is-full-mobile is-half-desktop">
            <article class="message is-success">
              <div class="message-body">
                <h3 class="title is-4 has-text-success">ทีมงาน Edenra</h3>
                <h4 class="subtitle is-5 has-text-success">
                  พวกเราตั้งใจสรรค์สร้างสิ่งดีๆเพื่อคุณ
                </h4>
                พวกเราต้องการทำให้ทุกคนมีพลังงานด้านบวก เพราะเราเชื่อว่า
                หากคนมีพลังงานด้านบวกมากๆ
                คนๆนั้นจะสามารถแบ่งปันพลังงานด้านบวกไปให้กับผู้อื่นได้อีก
                เพราะฉนั้นถ้าพวกเรามอบพลังงานด้านบวกให้กับคนหลายๆคน
                ก็จะมีคนที่มีพลังงานด้านบวกมากขึ้นเป็นทวีคูณ<br />
                แต่การสร้างพลังงานด้านบวกของแต่ละคนนั้นไม่เหมือนกัน
                พวกเราจึงพยายามที่จะสร้างสรรค์สิ่งต่างๆให้ครอบคลุมความชอบ
                ความสนใจ ให้ได้มากที่สุด โดยพวกเราหวังเป็นอย่างยิ่งว่า
                หากใครก็ตามที่ต้องการเพิ่มพลังงานด้านบวก จะนึกถึง Edenra.com
                เป็นอันดับแรก<br />
                แต่ถ้าหากว่าสิ่งที่เรานำเสนอได้สร้างเรื่องที่ไม่ดีกับใคร
                พวกเราพร้อมที่จะขอโทษและแก้ไข ได้โปรดให้อภัย
                และบอกเหตุผลกับเราเพื่อที่จะนำไปแก้ไขต่อไป
                เพราะในการสร้างสิ่งใหม่ๆอาจจะสร้างข้อผิดพลาดได้เสมอ
                พวกเราสัญญาว่าทุกข้อผิดพลาดจะเป็นพลังให้เราแก้ไขให้ดียิ่งๆขึ้นไป
              </div>
            </article>
          </div>
        </div>
      </section>
      <section class="section">
        <h3 class="title is-5 has-text-centered">สิ่งที่เรามุ่งเน้น</h3>
        <div class="columns is-mobile is-multiline">
          <div class="column">
            <div class="card">
              <div class="card-content">
                <div class="content has-text-centered">
                  <b-icon icon="creation" size="is-large" class="text-yellow" />
                </div>
              </div>
              <footer class="card-footer">
                <div class="card-footer-item">
                  <span> ความคิดสร้างสรรค์ </span>
                </div>
              </footer>
            </div>
          </div>
          <div class="column">
            <div class="card">
              <div class="card-content">
                <div class="content has-text-centered">
                  <b-icon icon="seesaw" size="is-large" class="text-green" />
                </div>
              </div>
              <footer class="card-footer">
                <div class="card-footer-item">
                  <span> ความบันเทิง </span>
                </div>
              </footer>
            </div>
          </div>
          <div class="column">
            <div class="card">
              <div class="card-content">
                <div class="content has-text-centered">
                  <b-icon icon="school" size="is-large" class="text-blue" />
                </div>
              </div>
              <footer class="card-footer">
                <div class="card-footer-item">
                  <span> สาระ ความรู้ </span>
                </div>
              </footer>
            </div>
          </div>
          <div class="column">
            <div class="card">
              <div class="card-content">
                <div class="content has-text-centered">
                  <b-icon icon="egg-easter" size="is-large" class="text-pink" />
                </div>
              </div>
              <footer class="card-footer">
                <div class="card-footer-item">
                  <span> ปริศนา? </span>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </section>
      <section class="section">
        <h3 class="title is-5 has-text-centered">ติดต่อเรา</h3>
        <div class="columns is-mobile is-multiline">
          <div class="column is-full-mobile is-half-desktop">
            <article class="message is-primary">
              <div class="message-body">
                <h3 class="title is-4 has-text-primary">
                  <b-icon icon="card-account-mail" class="m-r-md" />ติดต่อทีมงาน
                </h3>
                หากผู้ใช้งาน Edenra.com ท่านใด ต้องการที่จะแจ้งปัญหาในการใช้งาน หรือ
                เสนอแนะเรื่องอะไรก็ได้ที่คิดว่ามีประโยชน์ สามารถแจ้งมาได้ทาง Social Media ได้ทุกช่องทาง<br />
                หรือถ้าหากสมาชิกท่านใดต้องการติดต่อทีมงานในเรื่องอื่นๆก็สามารถทำได้เช่นกัน
                โดยเมื่อเราได้รับข้อมูลแล้วจะทำการติดต่อแจ้งความคืบหน้ากลับไปยังท่านที่ส่งข้อมูลมา
              </div>
            </article>
          </div>
          <div class="column is-full-mobile is-half-desktop">
            <div class="has-text-centered">
              <h3 class="title is-4 text-orange">สามารถส่งข้อความหาเราได้ทาง</h3>
              <span v-for="(item, key) in data" :key="key">
                <a v-if="key==='tiktok'" :href="item.url" :title="item.title" target="_blank" class="p-x-sm">
                  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>TikTok</title><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                </a>
                <a v-else :href="item.url" :title="item.title" target="_blank" class="p-x-sm">
                  <b-icon :icon="item.icon" :class="item.class" size="is-large" />
                </a>
              </span>
            </div>
            <div v-show="msgbox">
            <b-field horizontal label="หัวข้อ">
              <b-select placeholder="เลือกหัวข้อ" expanded>
                <option value="1">แจ้งปัญหา</option>
                <option value="2">เสนอแนะ</option>
                <option value="3">ติดต่อ</option>
              </b-select>
            </b-field>

            <b-field horizontal label="ข้อความ">
              <b-input type="textarea"></b-input>
            </b-field>

            <b-field horizontal>
              <p class="control">
                <b-button
                  label="ส่งข้อมูล"
                  type="is-primary"
                  expanded
                  disabled
                />
              </p>
            </b-field>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import GifBanner from '~/components/GifBanner'
import snsdata from '~/assets/sns.json'

export default {
  name: 'AboutusPage',
  components: {
    GifBanner,
  },
  data() {
    return {
      data: snsdata,
      msgbox: false,
    }
  },
}
</script>
<style scoped>
.header {
  margin-top: 42px;
}

.avatar {
  width: 80px;
  height: 100%;
  position: relative;
  margin: 0 auto;
}

.avatar img {
  display: block;
  border-radius: 50%;
  position: absolute;
  bottom: -42px;
  border: 4px solid white;
}

.card-body {
  padding: 30px;
}

.user-meta {
  padding-top: 20px;
}

.username {
  font-size: 18px;
  font-weight: 600;
}

.position {
  font-size: 90%;
}

svg {
  width: 48px;
  height: 40px;
  padding-top: 3px;
}
</style>
