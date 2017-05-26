import loadingsStore from './loadings'

describe('stores/loadings', () => {
  test('init', () => {
    const { names, state } = loadingsStore
    expect(names).toHaveLength(0)
    expect(state).toEqual({})
  })

  test('handle', () => {
    class HandleTest {
      @loadingsStore.handle('request')
      request() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(200)
          }, 1000)
        })
      }
    }
    const handleTest = new HandleTest()
    expect(loadingsStore.names).toHaveLength(1)
    handleTest.request()
      .then(() => {
        expect(loadingsStore.state.request).toBeFalsy()
      })
    expect(loadingsStore.state.request).toBeTruthy()

  })

})
