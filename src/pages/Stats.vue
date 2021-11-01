<template>
  <q-page >
  <p class="text-h5 text-weight-medium  text-center"> Статистика игрока :
    <span class="text-weight-bold tex">{{userName}}</span> </p>
    <p class="text-center text-body1 text-weight-bold" >Набранные очки :
      <span v-bind:class=" point > 0? 'text-blue':'text-red'">{{point}}</span></p>
    <p class="text-center text-body1 text-weight-bold  ">
      Кол-во правильных ответов : <span class="text-blue-3">{{wroteСorrectly.length}}</span>
    </p>
    <p class="text-center text-body1 text-weight-bold ">
      Кол-во неправильных ответов : <span class="text-red-4">{{misspelled.length}}</span>
    </p>
    <p class="text-center text-body1 text-weight-bold">
      Кол-во всех ответов :
      <span class="text-dark">{{misspelled.length + wroteСorrectly.length}}</span>
    </p>
  </q-page>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Stats',
  data() {
    const $store = useStore();
    const misspelled = computed({
      get: () => $store.getters['user/GET_WRONG_ANSWERS'].map((item) => item.value),
    });
    const wroteСorrectly = computed({
      get: () => $store.getters['user/GET_TRUE_ANSWERS'].map((item) => item.value),
    });
    const userName = computed({
      get: () => $store.getters['user/GET_USER_NAME'],
    });
    const point = computed({
      get: () => wroteСorrectly.value.reduce((prev, next) => prev + next, 0)
      - misspelled.value.reduce((prev, next) => prev + next, 0),
    });
    return {
      wroteСorrectly,
      misspelled,
      userName,
      point,
    };
  },
};
</script>
