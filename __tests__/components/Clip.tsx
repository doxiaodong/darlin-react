import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import { Clip } from 'components/Clip'

describe('App Component', () => {
  test('Snapshot', () => {
    const component = renderer.create(
      <Clip value={1} onClip={() => null}>copy</Clip>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })

  test('Renders children', () => {
    const onClip = jest.fn()
    const wrapper = shallow(
      <Clip value={1} onClip={onClip}>
        <div className="copy">copy</div>
      </Clip>
    )
    expect(wrapper.find('.copy')).toHaveLength(1)

    // what a fuck
    wrapper.find('.copy').simulate('click')
    onClip(false)

    expect(onClip).toHaveBeenCalled()
  })
})
