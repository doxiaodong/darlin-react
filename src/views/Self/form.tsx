import { Form } from 'stores/form'
import store from './store'

class SelfForm extends Form {
  onSuccess(form) {
    super.onSuccess(form)
    const { password, key } = form.values()
    store.genPassword(password, key)
  }

  onError(form) {
    super.onError(form)
  }
}

const fields = {
  password: {
    label: 'Password',
    value: '',
    rules: ''
  },
  key: {
    label: 'Key',
    value: '',
    rules: 'required'
  }
}

export default new SelfForm({ fields })
