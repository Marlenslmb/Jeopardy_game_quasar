<template>
  <q-page>
    <div class=" bg-indigo-10 text-white" v-if="switchGame">
      <div class="columns"
           v-for="( questionCategory, index ) in gameData"
           :key="index"
      >
        <div class="row">
          <p class="text-weight-bold q-ma-none col ">{{ questionCategory[0].category.title }}</p>
          <div class="col value" v-for="category in questionCategory"
               :key="category.id"
               @click="!answers.find((item) => item.id === category.id) && autoClose(category)"
               :class="misspelled.find((item) =>item.id === category.id)? 'bg-red':
                wroteСorrectly.find((item) => item.id == category.id)? 'bg-green':'' "
          >
            {{ category.value }}
          </div>
        </div>
      </div>
    </div>
    <h5 class="h5h5" v-else>Вы вне игры</h5>
    <q-btn class="q-mx-auto" color="primary" :label="switchGame? 'Конец игры':'Начать игру'"
           @click="switchStartEnd"/>
  </q-page>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { useQuasar } from 'quasar';

export default {
  name: 'Game',
  components: {},
  data() {
    const $store = useStore();
    const $q = useQuasar();
    const gameData = computed({
      get: () => $store.getters['user/GET_GAME_DATA'],
    });
    const misspelled = computed({
      get: () => $store.getters['user/GET_WRONG_ANSWERS'],
    });
    const wroteСorrectly = computed({
      get: () => $store.getters['user/GET_TRUE_ANSWERS'],
    });
    const answers = computed({
      get: () => [...misspelled.value, ...wroteСorrectly.value],
    });
    const userName = computed({
      get: () => $store.getters['user/GET_USER_NAME'],
    });
    return {
      $store,
      gameData,
      $q,
      wroteСorrectly,
      misspelled,
      answers,
      userName,
      switchGame: false,
    };
  },
  mounted() {
    this.$store.dispatch('user/GET_GAME_DATA_API', this.userName);
  },
  beforeUnmount() {
    const wrong = this.$store.state.user.user.isAnswerWrong;
    const right = this.$store.state.user.user.isAnswerTrue;
    localStorage.setItem(this.userName, JSON.stringify({ wrong: [...wrong] || null, right: [...right] || null }));
  },
  methods: {
    autoClose(question) {
      let seconds = 60;
      const dialog = this.$q.dialog({
        title: `<h3 class="text-center text-dark">Category:
                <span class="text-light-green-6">${question.category.title.toUpperCase()}</span> </h3> `,
        message: `<p class="text-weight-medium text-center">
                      Question: <span class="text-indigo-10">${question.question}?</span></p>
                   <p class="text-weight-medium text-center q-mt-xs"> Cost:
                   <span class="text-deep-orange-10"> ${question.value} </span></p>
                   <p class="text-weight-medium text-center q-mt-xs">
                   Closing in ${seconds} second${seconds > 1 ? 's' : ''}</p>`,
        prompt: {
          model: '',
          type: 'text',
        },
        html: true,
      }).onOk((data) => {
        if (data.toLowerCase() === question.answer.toLowerCase()) {
          this.$store.dispatch('user/SET_TRUE_ANSWER_STATE', { id: question.id, value: question.value });
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: `Вы ответили верно = ${question.value}`,
          });
        } else {
          const questionData = { id: question.id, value: question.value };
          this.isWrongAnswer(questionData);
        }
      }).onCancel(() => {
        const questionData = { id: question.id, value: question.value, flag: true };
        this.isWrongAnswer(questionData);
      }).onDismiss(() => {
        clearTimeout(timer);
      });
      const timer = setInterval(() => {
        seconds--;
        if (seconds > 0) {
          dialog.update({
            message: `<p class="text-weight-medium text-center">
                      Question: <span class="text-indigo-10">${question.question}?</span></p>
                      <p class="text-weight-medium text-center q-mt-xs">Cost:
                      <span class="text-deep-orange-10"> ${question.value} </span></p>
                      <p class="text-weight-medium text-center q-mt-xs">
                      Closing in ${seconds} second${seconds > 1 ? 's' : ''}</p>`,
          });
        } else {
          clearInterval(timer);
          dialog.hide();
        }
      }, 1000);
    },
    isWrongAnswer(data) {
      const close = `Если закроете окно, вычтим из ваших баллов = ${data.value}`;
      const answer = `Ваш ответ не верный, вычли очки = ${data.value}`;
      this.$store.dispatch('user/SET_WRONG_ANSWER_STATE', data);
      this.$q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: `${data.flag ? close : answer}`,
        progress: true,
      });
    },
    switchStartEnd() {
      this.switchGame = !this.switchGame;
    },
  },
};
</script>
<style lang="scss" scoped>
.row {
  p {
    min-width: 135px !important;
  }
};
.q-mx-auto{
  display: flex;
  justify-content: center;
  margin-top: 20px;
};
.h5h5{
  display: flex;
  justify-content: center;
  color: red
};

.col {
  min-width: 60px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  border: 1px solid #FFFFFFFF;
}
.value{
  cursor: pointer;
}
</style>
