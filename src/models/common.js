const listModel = {
  state: {
    data: [],
    pagination: {
      totalOfData: null,
    },
    currentItem: null,
  },
  reducers: {
    showModal(state, { payload }) {
      return { ...state, modalType: payload, modalVisibility: true };
    },
    hideModal(state) {
      return { ...state, modalVisibility: false };
    },
    choiceItem(state, { payload }) {
      return {
        ...state,
        currentItem: payload,
      };
    },
    clearItem(state) {
      return {
        ...state,
        currentItem: [],
      };
    },
    querySuccess(state, { payload }) {
      const { data, page } = payload.data;
      return {
        ...state,
        data,
        pagination: {
          totalOfData: page.totalOfData,
          page: page.page,
          size: page.size,
        },
      };
    },

  },
  effects: {

  },
};

module.exports = {
  listModel,
};
