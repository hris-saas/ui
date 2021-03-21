// state
export const state = () => ({
  employees: null,
  employee: null,
  employeeName: null,
  employeeDirectReports: null,
  employeeIndirectReports: null,
  employeesForDirectory: null,
  employeesForDirectoryPage: 1,
  links: null,
  meta: null,
})

// getters
export const getters = {
  employees: (state) => state.employees,
  employeesForDirectory: (state) => state.employeesForDirectory,
  employee: (state) => state.employee,
  employeeName: (state) => state.employeeName,
  employeeDirectReports: (state) => state.employeeDirectReports,
  employeeIndirectReports: (state) => state.employeeIndirectReports,
  links: (state) => state.links,
  meta: (state) => state.meta,
}

// mutations
export const mutations = {
  FETCH_EMPLOYEES_DATA_SUCCESS(state, response) {
    state.employees = response.data
  },
  FETCH_EMPLOYEES_FOR_DIRECTORY_DATA_SUCCESS(state, response) {
    // Merge data if requested page > 1
    if (response.page > 1) {
      const mergedData = state.employeesForDirectory
      const data = response.data.data

      for (const [initial, employees] of Object.entries(data)) {
        for (let i = 0; i < employees.length; i++) {
          // Init index if it does not exist yet.
          if (typeof mergedData[initial] === 'undefined') {
            mergedData[initial] = []
          }

          mergedData[initial].push(employees[i])
        }
      }

      state.employeesForDirectoryPage = response.page

      // For some reason the state needs to bet set to null to reflect changes.
      state.employeesForDirectory = null
      state.employeesForDirectory = mergedData
    } else {
      state.employeesForDirectory = response.data.data
    }
  },

  FETCH_EMPLOYEES_LINKS_SUCCESS(state, response) {
    state.links = response.links
  },

  FETCH_EMPLOYEES_META_SUCCESS(state, response) {
    state.meta = response.meta
  },

  FETCH_EMPLOYEES_FAILURE(state) {
    state.employees = null
    state.employeesForDirectory = null
    state.employeesForDirectoryPage = 1
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
  },
}

// actions
export const actions = {
  async fetchEmployees({ commit }, { page }) {
    page = page || 1

    try {
      const { data } = await this.$axios.get(`/employees?page=${page}`)

      commit('FETCH_EMPLOYEES_DATA_SUCCESS', data)
      commit('FETCH_EMPLOYEES_LINKS_SUCCESS', data)
      commit('FETCH_EMPLOYEES_META_SUCCESS', data)
    } catch (e) {
      commit('FETCH_EMPLOYEES_FAILURE')
    }
  },
  async fetchEmployeesForDirectory({ commit }, { page }) {
    page = page || 1

    try {
      const { data } = await this.$axios.get(
        `/employees?orderBy=last_name&groupBy=last_name&page=${page}`
      )

      const response = { data, page }

      commit('FETCH_EMPLOYEES_FOR_DIRECTORY_DATA_SUCCESS', response)
      commit('FETCH_EMPLOYEES_LINKS_SUCCESS', data)
      commit('FETCH_EMPLOYEES_META_SUCCESS', data)
    } catch (e) {
      commit('FETCH_EMPLOYEES_FAILURE')
    }
  },
  async fetchEmployee({ commit }, { id }) {
    try {
      const {
        data: { data },
      } = await this.$axios.get('/employees/' + id)

      commit('FETCH_EMPLOYEE_DATA_SUCCESS', data)
    } catch (e) {
      commit('FETCH_EMPLOYEE_FAILURE')
    }
  },
  async fetchEmployeeDirectReports({ commit }, { id, page }) {
    page = page || 1

    try {
      const { data } = await this.$axios.get(
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
      const { data } = await this.$axios.get(
        `/employees/${id}/indirect-reports?page=${page}`
      )

      commit('FETCH_EMPLOYEE_INDIRECT_REPORTS_SUCCESS', data)
      commit('FETCH_EMPLOYEES_LINKS_SUCCESS', data)
      commit('FETCH_EMPLOYEES_META_SUCCESS', data)
    } catch (e) {
      commit('FETCH_EMPLOYEE_INDIRECT_REPORTS_FAILURE')
    }
  },
}
