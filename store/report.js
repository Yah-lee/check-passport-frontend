export const state = () => ({
  report: [],
})

export const mutations = {
  setReport(state, data) {
    state.report = data
  },
}

export const actions = {
  async getReport({ commit }, params) {
    await this.$axios
      .$get('http://localhost:4000/machine/by-date-between', {
        params,
      })
      .then((data) => {
        commit('setReport', data)
      })
  },
}
