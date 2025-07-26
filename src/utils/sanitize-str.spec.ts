import { sanitizeStr } from './sanitize-str';

describe('sanitizeStr (unit)', () => {
  test('return one string empty when recive one value falsy', () => {
    // @ts-expect-error testando a função sem parametros
    expect(sanitizeStr()).toBe('');
  });
  test('return one string empty when recive one value not is string', () => {
    // @ts-expect-error testando a função com tipagem incorreta
    expect(sanitizeStr(123)).toBe('');
  });
  test('garante o trim da string enviada', () => {
    expect(sanitizeStr('    a    ')).toBe('a');
  });
  test('garante que a string é normalizada com NFC', () => {
    const original = 'e\u0301';
    const expected = 'é';
    expect(expected).toBe(sanitizeStr(original));
  });
});
