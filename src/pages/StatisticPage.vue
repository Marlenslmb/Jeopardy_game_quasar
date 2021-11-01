<template>
  <q-page >
  <p class="text-h5 text-weight-medium  text-center"> Statistic of:
    <span class="text-weight-bold tex">{{userName.toUpperCase()}}</span> </p>
    <p class=" text-body1 text-weight-medium" >Points scored:
      <span v-bind:class=" point > 0? 'text-green':'text-red'">{{point}}</span></p>
    <p class=" text-body1 text-weight-medium  ">
      Amount right answers: <span class="text-green-3">{{rightAnswers.length}}</span>
    </p>
    <p class=" text-body1 text-weight-medium ">
      Amount wrong answers: <span class="text-red-4">{{wrongAnswers.length}}</span>
    </p>
    <p class=" text-body1 text-weight-medium">
      Amount answers:
      <span class="text-dark">{{wrongAnswers.length + rightAnswers.length}}</span>
    </p>
  </q-page>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'StatisticPage',
  setup() {
    const $store = useStore();
    const wrongAnswers = computed({
      get: () => $store.getters['user/GET_WRONG_ANSWERS'].map((item) => item.value),
    });
    const rightAnswers = computed({
      get: () => $store.getters['user/GET_TRUE_ANSWERS'].map((item) => item.value),
    });
    const userName = computed({
      get: () => $store.getters['user/GET_USER_NAME'],
    });
    const point = computed({
      // eslint-disable-next-line max-len
      get: () => rightAnswers.value.reduce((prev, next) => prev + next, 0)
      - wrongAnswers.value.reduce((prev, next) => prev + next, 0),
    });
    return {
      rightAnswers,
      wrongAnswers,
      userName,
      point,
    };
  },
});
</script>
