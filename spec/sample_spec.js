import sample from '../src/sample.js';

describe('.add', () => {
  let func = sample.add;

  describe('when assigned 1 as a and 2 as b', () => {
    let a = 1;
    let b = 2;

    it('returns 3', () => {
      expect(func(a, b)).toBe(3);
    });
  });
});

describe('.sayHello', () => {
  let func = sample.sayHello;

  it('does not throw error', () => {
    expect(func).not.toThrow();
  });
});
