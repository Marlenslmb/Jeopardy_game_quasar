<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="9">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" alt="logo">
          </q-avatar>
          Own Game
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/" label="Game"/>
        <q-route-tab to="/statistic" label=" User statistic"/>
      </q-tabs>
    </q-header>
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
import Auth from 'components/Auth';
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  components: {
    Auth,
  },
  setup() {
    const $store = useStore();
    const userName = computed({
      get: () => $store.getters['user/GET_USER_NAME'],
    });
    return {
      userName,
    };
  },
};
</script>
