<template>
  <div class="columns is-mobile is-multiline">
    <div class="column is-full-mobile is-two-third-desktop">
      <vue-plyr :emit="['play']">
        <div class="video-container plyr__video-embed">
          <iframe
            src="https://www.youtube.com/embed/live_stream?channel=UCSKOVhLH9AOobKuDxre1ZVA"
            allowfullscreen
            allowtransparency
            allow="autoplay"
          >
          </iframe>
        </div>
      </vue-plyr>
    </div>
    <div class="column is-full-mobile is-one-third-desktop">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            <b-icon icon="television-play" class="p-x-md text-red" />Live
            Schedule
          </p>
        </header>
        <div class="card-content hero">
          <div class="content has-text-centered hero-body">
            <div class="columns is-mobile is-multiline">
              <div class="column is-full">
                <b-icon icon="sleep" size="is-large" type="is-primary" />
              </div>
              <div class="column is-full">
                <p>Coming Soon !!!</p>
              </div>
            </div>
          </div>
        </div>
        <footer class="card-footer">
          <p class="card-footer-item">
            <span>
              <a :href="data.youtube.url" :title="data.youtube.title" target="_blank">
                <b-icon icon="youtube" custom-size="mdi-18px" class="fa-youtube" />Youtube
              </a>
            </span>
          </p>
          <p class="card-footer-item">
            <span>
              <a :href="data.twitch.url" :title="data.twitch.title" target="_blank">
                <b-icon icon="twitch" custom-size="mdi-18px" class="fa-twitch"/>Twitch
              </a>
            </span>
          </p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import snsdata from '~/assets/sns.json'
export default {
  name: 'IndexLive',
  data() {
    return {
      data: snsdata,
    }
  },
}
</script>
<style scoped>
.card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-content {
  height: 100%;
}

.card-content .content {
  height: 100%;
    justify-content: center;
    align-items: center;
}

.card-footer {
  margin-top: auto;
}
</style>
