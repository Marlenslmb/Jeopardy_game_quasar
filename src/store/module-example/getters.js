export function GET_USER_NAME(state) {
    return state.user.name;
  }
  export const GET_GAME_DATA = (state) => state.gameData;
  export const GET_WRONG_ANSWERS = (state) => state.user.isAnswerWrong;
  export const GET_TRUE_ANSWERS = (state) => state.user.isAnswerTrue;
  