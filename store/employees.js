import axios from 'axios'

// state
export const state = () => ({
  employees: null,
  employee: null,
  employeeName: null,
  employeeDirectReports: null,
  employeeIndirectReports: null,
  links: null,
  meta: null
})

// getters
export const getters = {
  employees: (state) => state.employees,
  employee: (state) => state.employee,
  employeeName: (state) => state.employeeName,
  employeeDirectReports: (state) => state.employeeDirectReports,
  employeeIndirectReports: (state) => state.employeeIndirectReports,
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
    state.employeeName =
      state.employee.first_name + ' ' + state.employee.last_name
  },

  FETCH_EMPLOYEE_DIRECT_REPORTS_SUCCESS(state, response) {
    state.employeeDirectReports = response.data
  },

  FETCH_EMPLOYEE_DIRECT_REPORTS_FAILURE(state, response) {
    state.employeeDirectReports = null
    state.links = null
    state.meta = null
  },

  FETCH_EMPLOYEE_INDIRECT_REPORTS_SUCCESS(state, response) {
    state.employeeIndirectReports = response.data
  },

  FETCH_EMPLOYEE_INDIRECT_REPORTS_FAILURE(state, response) {
    state.employeeIndirectReports = null
    state.links = null
    state.meta = null
  },

  FETCH_EMPLOYEE_FAILURE(state) {
    state.employee = null
  }
}

// actions
export const actions = {
  async fetchEmployees({ commit }, { page }) {
    page = page || 1

    try {
      const { data } = await axios.get(`/employees?page=${page}`)

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
  },
  async fetchEmployeeDirectReports({ commit }, { id, page }) {
    page = page || 1

    try {
      const { data } = await axios.get(
        `/employees/${id}/direct-reports?page=${page}`
      )

      commit('FETCH_EMPLOYEE_DIRECT_REPORTS_SUCCESS', data)
      commit('FETCH_EMPLOYEES_LINKS_SUCCESS', data)
      commit('FETCH_EMPLOYEES_META_SUCCESS', data)
    } catch (e) {
      commit('FETCH_EMPLOYEE_DIRECT_REPORTS_FAILURE')
    }
  },
  async fetchEmployeeIndirectReports({ commit }, { id, page }) {
    page = page || 1

    try {
      const { data } = await axios.get(
        `/employees/${id}/indirect-reports?page=${page}`
      )

      commit('FETCH_EMPLOYEE_INDIRECT_REPORTS_SUCCESS', data)
      commit('FETCH_EMPLOYEES_LINKS_SUCCESS', data)
      commit('FETCH_EMPLOYEES_META_SUCCESS', data)
    } catch (e) {
      commit('FETCH_EMPLOYEE_INDIRECT_REPORTS_FAILURE')
    }
  }
}
