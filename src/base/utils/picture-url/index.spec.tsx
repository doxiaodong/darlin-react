import { getPictureURL } from './'

describe('@picture-url: get complete head picture', () => {
  test('should get complete url normally', () => {
    expect(
      getPictureURL('aaa/bbb/c.png')
    ).toEqual('//media.darlin.me/aaa/bbb/c.png-headPicture')
  })

  test('should get complete url third, http -> https', () => {
    expect(
      getPictureURL('http://aaa/bbb/c.png')
    ).toEqual('https://aaa/bbb/c.png')
    expect(
      getPictureURL('https://aaa/bbb/c.png')
    ).toEqual('https://aaa/bbb/c.png')
  })

  test('should get gravatar', () => {
    expect(
      getPictureURL('none', 'duxiaodong@darlin.me')
    ).toEqual('https://s.gravatar.com/avatar/da1a0f997a3329f53529b28f5f6d3536?s=100')
  })
})
