<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="main-header">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
      </q-toolbar>
        <div class="q-px-lg q-pt-xl q-mb-md">
          <div class="text-h4">JEOPARDY</div>
          <div class="text-subtitle1">{{todaysDate}}</div>
        </div>
      <q-img 
        src="https://cdn.pixabay.com/photo/2021/09/07/07/11/game-console-6603120_960_720.jpg"
        class="header-image absolute-top"
      />
    </q-header>
    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="250"
        :breakpoint="600"
      >
        <q-scroll-area style="height: calc(100% - 182.56px); margin-top: 182.56px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item to="/" clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="inbox" />
              </q-item-section>
              <q-item-section>
                Game
              </q-item-section>
            </q-item>
            <q-item to="/stats" clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>
              <q-item-section>
                player stats
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://cdn.pixabay.com/photo/2021/09/07/07/11/game-console-6603120_960_720.jpg" style="height: 181.56px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.pixabay.com/photo/2020/12/09/16/08/joker-5817831_960_720.png">
            </q-avatar>
            <div class="text-weight-bold">Marlen Salimbekov</div>
            <div>@marlenslmb</div>
          </div>
        </q-img>
      </q-drawer>

    <q-page-container>
      <Auth
        v-if="!userName"
      />
      <router-view
        v-if="userName"
      />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import Auth from 'components/Auth';
import { useStore } from 'vuex';
import { computed } from 'vue';
import { date } from 'quasar'

export default {
  name: 'MainLayout',

  components: {
    Auth
  },
  computed: {
    todaysDate() {
      const timeStamp = Date.now()
      return date.formatDate(timeStamp, 'dddd D MMMM')
    }
  },
  data () {
    const leftDrawerOpen = ref(false)
    const $store = useStore();
    const userName = computed({
      get: () => $store.getters['user/GET_USER_NAME'],
    });
    return {
      userName,
      leftDrawerOpen,
    }
  },
}
</script>

<style >
  .main-header{
    background-color: #002074;
  }
  .header-image{
    height: 100%;
    z-index: -1;
    opacity: 0.2;
    filter: grayscale(100%);
  }
</style>
