<template>
  <div class="q-pa-md q-mx-auto" style="max-width: 400px;">
    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="name"
        label="Имя"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Напишите имя']"
      />
      <div>
        <q-btn label="Войти" type="submit" color="primary"/>
      </div>
    </q-form>
  </div>
</template>
<script>
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Auth',
  data() {
    const $q = useQuasar();
    const name = ref(null);
    const $store = useStore();
    return {
      onSubmit() {
        $store.dispatch('user/SET_USER_NAME_STATE', name.value);
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Вы вошли в игру',
        });
      },
      name,
    };
  },
};
</script>
