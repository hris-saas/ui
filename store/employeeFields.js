// state
export const state = () => ({
  statuses: null,
  maritalStatuses: null,
  employmentStatuses: null,
  departments: null,
  jobTitles: null,
  divisions: null,
  locations: null,
  payTypes: null,
  payPeriods: null,
  changeReasons: null,
})

// getters
export const getters = {
  statuses: (state) => state.statuses,
  maritalStatuses: (state) => state.maritalStatuses,
  employmentStatuses: (state) => state.employmentStatuses,
  departments: (state) => state.departments,
  jobTitles: (state) => state.jobTitles,
  divisions: (state) => state.divisions,
  locations: (state) => state.locations,
  payTypes: (state) => state.payTypes,
  payPeriods: (state) => state.payPeriods,
  changeReasons: (state) => state.changeReasons,
}

// mutations
export const mutations = {
  FETCH_EMPLOYEE_FIELD_DATA_SUCCESS(state, response) {
    state[response.storeItem] = response.data.data
  },

  FETCH_EMPLOYEE_FIELD_FAILURE(state, storeItem) {
    state[storeItem] = null
  },
}

// actions
export const actions = {
  async fetchEmployeeField({ commit }, { employeeField, isSelect }) {
    const storeItem = employeeField.replace(/-([a-z])/g, function (g) {
      return g[1].toUpperCase()
    })

    try {
      let data = ''

      if (isSelect) {
        data = await this.$axios.get(`/${employeeField}?isSelect`)
      } else {
        data = await this.$axios.get(`/${employeeField}`)
      }

      const response = {
        data: data.data,
        storeItem,
      }

      commit('FETCH_EMPLOYEE_FIELD_DATA_SUCCESS', response)
    } catch (e) {
      commit('FETCH_EMPLOYEE_FIELD_DATA_FAILURE')
    }
  },
}
