export const tasks = {
  namespaced: true,
  state: () => ({
    boards: JSON.parse(localStorage.getItem("boards")) || [],
  }),
  mutations: {
    createBoard(state, payload) {
      state.boards.push({
        name: payload,
        id: Math.floor(Math.random() * 1e6),
        tasks: [],
      });
    },

    createTask(state, { value, column }) {
      const getTime = () => {
        const date = new Date();
        return `${date.toLocaleDateString(
          "ru-RU",
        )} в ${date.getHours()}:${date.getMinutes()}`;
      };
      const board = state.boards.find((item) => item.id === column);
      board.tasks.push({
        ...value,
        id: Math.floor(Math.random() * 1e6),
        date: getTime(),
      });
    },

    deleteBoard(state, payload) {
      state.boards = state.boards.filter((board) => board.id !== payload);
    },

    deleteTask(state, { taskID, colsID }) {
      const board = state.boards.find((board) => board.id === colsID);

      board.tasks = board.tasks.filter((task) => task.id !== taskID);
    },

    updateCols(state, payload) {
      state.boards = payload;
    },
    updateTasks(state, payload) {
      state.boards = payload;
    },
  },
  actions: {},
  getters: {
    getCols: (state) => {
      return state.boards;
    },
  },
};
