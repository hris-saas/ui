import axios from 'axios'

// state
export const state = () => ({
  employees: null,
  employee: null,
  links: null,
  meta: null
})

// getters
export const getters = {
  employees: (state) => state.employees,
  employee: (state) => state.employee,
  links: (state) => state.links,
  meta: (state) => state.meta
}

// mutations
export const mutations = {
  FETCH_EMPLOYEES_DATA_SUCCESS(state, response) {
    state.employees = response.data
  },

  FETCH_EMPLOYEES_LINKS_SUCCESS(state, response) {
    state.links = response.links
  },

  FETCH_EMPLOYEES_META_SUCCESS(state, response) {
    state.meta = response.meta
  },

  FETCH_EMPLOYEES_FAILURE(state) {
    state.employees = null
    state.links = null
    state.meta = null
  },

  FETCH_EMPLOYEE_DATA_SUCCESS(state, response) {
    state.employee = response
  },

  FETCH_EMPLOYEE_FAILURE(state) {
    state.employee = null
  }
}

// actions
export const actions = {
  async fetchEmployees({ commit }) {
    try {
      const { data } = await axios.get('/employees')

      commit('FETCH_EMPLOYEES_DATA_SUCCESS', data)
      commit('FETCH_EMPLOYEES_LINKS_SUCCESS', data)
      commit('FETCH_EMPLOYEES_META_SUCCESS', data)
    } catch (e) {
      commit('FETCH_EMPLOYEES_FAILURE')
    }
  },
  async fetchEmployee({ commit }, { id }) {
    try {
      const {
        data: { data }
      } = await axios.get('/employees/' + id)

      commit('FETCH_EMPLOYEE_DATA_SUCCESS', data)
    } catch (e) {
      commit('FETCH_EMPLOYEE_FAILURE')
    }
  }
}
