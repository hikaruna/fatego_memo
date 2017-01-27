import Hello from '../src/hello.jsx';

describe('Hello', () => {
  describe('#redner', () => {
    it('returns <h1>hello</h1>', () => {
      expect(new Hello().render()).toEq("<h1>hello</h1>");
    });
  });
});
