import { makeTestTodoRepository } from '../../__tests__/utils/make-test-todo-repository';
import { deleteTodoUseCase } from './delete-todo.usecase';

describe('deleteTodoUseCase (integration)', () => {
  beforeEach(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });
  afterAll(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });
  test('deve retornar erro se o id for inválido', async () => {
    const result = await deleteTodoUseCase('');

    expect(result).toStrictEqual({
      errors: ['ID Inválido'],
      success: false,
    });
  });

  test('deve retornar sucesso se o todo ja estar no bd', async () => {
    const { insertTodoDb, todos } = await makeTestTodoRepository();
    await insertTodoDb().values(todos);

    const result = await deleteTodoUseCase(todos[0].id);

    expect(result).toStrictEqual({
      success: true,
      todo: todos[0],
    });
  });

  test('deve retornar erro se o todo nao estiver no bd', async () => {
    const result = await deleteTodoUseCase('This-does-not-exist');

    expect(result).toStrictEqual({
      success: false,
      errors: ['Todo nao existe'],
    });
  });
});
