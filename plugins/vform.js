import Vue from 'vue'
import { HasError, AlertError, AlertSuccess, Form } from 'vform'

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
Vue.component(AlertSuccess.name, AlertSuccess)

export default ({ $axios }) => {
  Form.axios = $axios
}
