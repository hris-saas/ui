// state
export const state = () => ({
  employees: null,
  employee: null,
  employeeName: null,
  employeeDirectReports: null,
  employeeIndirectReports: null,
  employeesForDirectory: null,
  employeesForSelect: null,
  employeesForDirectoryPage: 1,
  links: null,
  meta: null,
  viewType: 'table',
})

// getters
export const getters = {
  employees: (state) => state.employees,
  employeesForDirectory: (state) => state.employeesForDirectory,
  employeesForSelect: (state) => state.employeesForSelect,
  employee: (state) => state.employee,
  employeeName: (state) => state.employeeName,
  employeeDirectReports: (state) => state.employeeDirectReports,
  employeeIndirectReports: (state) => state.employeeIndirectReports,
  links: (state) => state.links,
  meta: (state) => state.meta,
  viewType: (state) => state.viewType,
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

  FETCH_EMPLOYEES_FOR_SELECT_DATA_SUCCESS(state, response) {
    const data = response.data

    const list = []
    for (let i = 0; i < data.length; i++) {
      const name =
        data[i].first_name +
        ' ' +
        data[i].last_name +
        ' (' +
        data[i].work_email +
        ')'

      list.push({ id: data[i].id, name })
    }

    state.employeesForSelect = list
  },

  FETCH_EMPLOYEES_FOR_SELECT_DATA_FAILURE(state, response) {
    state.employeesForSelect = null
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

  SET_VIEW_TYPE(state, response) {
    state.viewType = response
  },
}

// actions
export const actions = {
  async fetchEmployees({ commit }, { page, perPage, status }) {
    page = page || 1
    perPage = perPage || 16
    status = status || 1

    try {
      const { data } = await this.$axios.get(
        `/employees?page=${page}&per_page=${perPage}&status=${status}`
      )

      commit('FETCH_EMPLOYEES_DATA_SUCCESS', data)
      commit('FETCH_EMPLOYEES_LINKS_SUCCESS', data)
      commit('FETCH_EMPLOYEES_META_SUCCESS', data)
    } catch (e) {
      commit('FETCH_EMPLOYEES_FAILURE')
    }
  },
  async fetchEmployeesForSelect({ commit }) {
    try {
      const { data } = await this.$axios.get(
        `/employees?isSelect&orderBy=last_name&per_page=all`
      )

      commit('FETCH_EMPLOYEES_FOR_SELECT_DATA_SUCCESS', data)
    } catch (e) {
      commit('FETCH_EMPLOYEES_FOR_SELECT_DATA_FAILURE')
    }
  },
  async fetchMeta({ commit }, { page }) {
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
  setViewType({ commit }, { view }) {
    commit('SET_VIEW_TYPE', view)
  },
}
