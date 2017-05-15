describe('use jest test', () => {
  test('1 + 1 should = 2', () => {
    expect(1 + 1 === 2).toBeTruthy()
  })

  test('1 + 1 should != 3', () => {
    expect(1 + 1 === 3).toBeFalsy()
  })
})
