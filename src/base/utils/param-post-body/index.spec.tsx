import { paramPostBody } from './'

class Example {
  a = 1
  b() {
    return 1
  }
}
const example = new Example()

describe('@param-post-body: fetch body pre deal', () => {
  test('should covent correct', () => {
    expect(
      paramPostBody({
        a: 1,
        b: 2
      })
    ).toEqual('a=1&b=2')

    expect(
      paramPostBody({
        a: 'http://darlin.me',
        'a b': 2
      })
    ).toEqual('a=http%3A%2F%2Fdarlin.me&a%20b=2')
  })

  test('should covent correct ignore prototype', () => {
    expect(
      paramPostBody(example)
    ).toEqual('a=1')

    expect(
      paramPostBody({
        a: 'http://darlin.me',
        'a b': 2
      })
    ).toEqual('a=http%3A%2F%2Fdarlin.me&a%20b=2')
  })
})
