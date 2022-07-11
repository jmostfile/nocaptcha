<template>
  <div class="is-full-width">
    <GifBanner />
    <div class="container">
      <section class="section p-y-lg">
        <article class="message">
          <div class="message-header">
            <h3 class="title is-5 has-text-centered has-text-light">
              คุกกี้ (Cookies)
            </h3>
          </div>
          <div class="message-body">
            <p>
              คือสิ่งที่เก็บข้อมูลของ Website ต่างๆเอาไว้บน Web Browser
              ที่คุณใช้ เพื่อนำมาใช้งานในด้านต่างๆ เช่น ข้อมูลการใช้งาน
              ข้อมูลบัญชีผู้ใช้งาน เป็นต้น
            </p>
          </div>
        </article>
      </section>
      <section class="section p-y-lg">
        <article class="message">
          <div class="message-header">
            <h3 class="title is-5 has-text-centered has-text-light">
              เราใช้งานคุกกี้อย่างไร
            </h3>
          </div>
          <div class="message-body">
            <p>
              ณ
              ปัจจุบันเราหลีกเลี่ยงการใช้งานคุกกี้ให้ได้มากที่สุดเพื่อรักษาความเป็นส่วนตัวของผู้ใช้งาน
              จึงทำให้เราเลือกที่จะไม่ใช้งานคุกกี้ใดๆเลย มีแต่เพียงคุกกี้จาก
              Website ภายนอกเท่านั้น เช่นจาก ตัวเล่น video ของ youtube twitch
              plyr หรือจากการตรวจสอบผู้ใช้งานว่าเป็นมนุษย์หรือไม่ของ hcaptcha
              เป็นต้น
            </p>
          </div>
        </article>
      </section>
      <section class="section p-y-lg">
        <article class="message">
          <div class="message-header">
            <h3 class="title is-5 has-text-centered has-text-light">
              สิ่งที่เราใช้แทนคุกกี้
            </h3>
          </div>
          <div class="message-body">
            <p>
              ณ ปัจจุบันเราใช้การบันทึกข้อมูลแบบ local storage แทนการใช้คุกกี้
              แม้จะไม่เหมือนกับคุกกี้ 100% แต่ก็เพียงพอที่จะใช้งานใน Website
              Edenra.com ได้อย่างไม่มีปัญหา
            </p>
          </div>
        </article>
      </section>
      <section class="section p-y-lg">
        <article class="message">
          <div class="message-header">
            <h3 class="title is-5 has-text-centered has-text-light">
              สิ่งที่เราบันทึกข้อมูล
            </h3>
          </div>
          <div class="message-body">
            <p>
              เราใช้สำหรับบันทึกข้อมูลผู้ใช้งานที่ได้สมัครสมาชิกกับ Edenra.com
              เท่านั้น
            </p>
          </div>
        </article>
      </section>
      <section class="section p-y-lg">
        <article class="message">
          <div class="message-header">
            <h3 class="title is-5 has-text-centered has-text-light">
              นโยบายการใช้งานคุกกี้
            </h3>
          </div>
          <div class="message-body">
            <p>
              เนื่องจากเราไม่ได้ใช้งานคุกกี้
              คุณสามารถดูการใช้งานคุกกี้ในด้านต่างๆได้จาก Website
              ภายนอกที่เราใช้งานภายใน Website Edenra.com ได้ดังนี้
            </p>
            <p>Youtube</p>
            <p>
              <a href="https://www.youtube.com/t/terms" target="_blank"
                >https://www.youtube.com/t/terms</a
              ><a href="https://www.youtube.com/t/terms" target="_blank"></a>
            </p>
            <p>
              <a href="https://www.youtube.com/about/policies/" target="_blank"
                >https://www.youtube.com/about/policies/</a
              ><br />
            </p>
            <p>twitch</p>
            <p>
              <a
                href="https://www.twitch.tv/p/legal/cookie-policy/"
                target="_blank"
                >https://www.twitch.tv/p/legal/cookie-policy/</a
              ><a
                href="https://www.twitch.tv/p/legal/cookie-policy/"
                target="_blank"
              ></a>
            </p>
            <p>plyr</p>
            <p>
              <a href="https://plyr.io/" target="_blank">https://plyr.io/</a
              ><br />
            </p>
            <p>hcaptcha</p>
            <p>
              <a href="https://www.hcaptcha.com/privacy" target="_blank"
                >https://www.hcaptcha.com/privacy</a
              ><a href="https://www.hcaptcha.com/privacy" target="_blank"></a>
            </p>
            <p>
              <a href="https://www.hcaptcha.com/terms" target="_blank"
                >https://www.hcaptcha.com/terms</a
              ><br /><br />
            </p>
          </div>
        </article>
      </section>
    </div>
  </div>
</template>

<script>
import GifBanner from '~/components/GifBanner'

export default {
  name: 'TOS',
  components: {
    GifBanner,
  },
  data() {},
}
</script>
