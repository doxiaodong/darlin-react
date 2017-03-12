import MobxReactForm from 'mobx-react-form'
import * as validatorjs from 'validatorjs'

const plugins = { dvr: validatorjs }

export class Form extends MobxReactForm {
  constructor(...arg) {
    if (!arg[1]) {
      arg[1] = { plugins }
    }
    super(...arg)
  }

  onSuccess(form) {
    // console.log('success', form)
  }

  onError(form) {
    // console.log('error', form)
  }
}

export default new Form()
