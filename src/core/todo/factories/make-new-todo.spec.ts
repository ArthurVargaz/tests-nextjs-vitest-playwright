import { makeNewTodo } from './make-new-todo';

describe('makeNewTodo (unit)', () => {
  test('deve retornar um novo todo válido', () => {
    const expectedTodo = {
      id: expect.any(String),
      description: 'meu novo todo',
      createdAt: expect.any(String),
    };

    const newTodo = makeNewTodo('meu novo todo');

    expect(newTodo.description).toBe(expectedTodo.description);

    expect(newTodo).toStrictEqual(expectedTodo);
  });
});
