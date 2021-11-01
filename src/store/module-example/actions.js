import axios from 'axios';

export const SET_USER_NAME_STATE = ({ commit }, username) => {
  commit('SET_USER_NAME', username);
};
export const GET_GAME_DATA_API = ({ commit }, userName) => {
  const allRequest = async () => {
    const allData = [];
    await axios.get('http://jservice.io/api/clues?category=1')
      .then((res) => {
        allData.push(res.data.slice(0, 5).sort((a, b) => a.value - b.value));
      });
    await axios.get('http://jservice.io/api/clues?category=2')
      .then((res) => {
        allData.push(res.data.slice(0, 5).sort((a, b) => a.value - b.value));
      });
    await axios.get('http://jservice.io/api/clues?category=3')
      .then((res) => {
        allData.push(res.data.slice(0, 5).sort((a, b) => a.value - b.value));
      });
    await axios.get('http://jservice.io/api/clues?category=4')
      .then((res) => {
        allData.push(res.data.slice(0, 5).sort((a, b) => a.value - b.value));
      });
    await axios.get('http://jservice.io/api/clues?category=5')
      .then((res) => {
        allData.push(res.data.slice(0, 5).sort((a, b) => a.value - b.value));
      });
    return allData;
  };
  allRequest().then((data) => {
    commit('SET_GAME_DATA', data);
  });
  commit('SET_IS_ANSWER_TRUE_LOCST', JSON.parse(localStorage.getItem(userName))?.right || []);
  commit('SET_IS_ANSWER_WRONG_LOCST', JSON.parse(localStorage.getItem(userName))?.wrong || []);
};
export const SET_TRUE_ANSWER_STATE = ({ commit }, trueAnswer) => {
  commit('SET_IS_ANSWER_TRUE', trueAnswer);
};
export const SET_WRONG_ANSWER_STATE = ({ commit }, wrongAnswer) => {
  commit('SET_IS_ANSWER_WRONG', wrongAnswer);
};
