export const SET_USER_NAME = (state, username) => {
    state.user.name = username;
  };
  export const SET_GAME_DATA = (state, gameData) => {
    state.gameData = gameData;
  };
  export const SET_IS_ANSWER_TRUE = (state, isTrueAnswer) => {
    state.user.isAnswerTrue.push(isTrueAnswer);
  };
  export const SET_IS_ANSWER_WRONG = (state, isWrongAnswer) => {
    state.user.isAnswerWrong.push(isWrongAnswer);
  };
  export const SET_IS_ANSWER_WRONG_LOCST = (state, data) => {
    state.user.isAnswerWrong = data;
  };
  export const SET_IS_ANSWER_TRUE_LOCST = (state, data) => {
    state.user.isAnswerTrue = data;
  };
  