import {imageCheck} from '../src/utils/imageCheck';

describe('image url changer', () => {
  it('should not change url', () => {
    const test = imageCheck('https://mockaddress.com');
    expect(test).toBe('https://mockaddress.com');
  });
  it('should change url', () => {
    const test = imageCheck('http://mockaddress.com');
    expect(test).toBe('https://mockaddress.com');
  });
});
