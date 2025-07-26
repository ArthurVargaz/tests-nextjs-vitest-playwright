import { makeTestTodoRepository } from '../../__tests__/utils/make-test-todo-repository';
import { InValidTodo, ValidTodo } from '../schemas/todo.contract';
import { createTodoUseCase } from './create-todo.usecase';

describe('createTodoUseCase (integration)', () => {
  beforeEach(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });
  afterAll(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });
  test('deve retornar erro se a validacao falhar', async () => {
    const result = (await createTodoUseCase('')) as InValidTodo;
    expect(result.success).toBe(false);
    expect(result.errors).toHaveLength(1);
  });
  test('deve retornar o todo se a validacao passar', async () => {
    const description = 'isso deve funcionar';
    const result = (await createTodoUseCase(description)) as ValidTodo;

    expect(result.success).toBe(true);
    expect(result.todo).toStrictEqual({
      createdAt: expect.any(String),
      description,
      id: expect.any(String),
    });
  });

  test('deve retornar erro se o repositorio falhar', async () => {
    const description = 'Isso só funciona 1 vez';
    (await createTodoUseCase(description)) as ValidTodo;

    const result = (await createTodoUseCase(description)) as InValidTodo;
    expect(result.success).toBe(false);
    expect(result.errors).toStrictEqual([
      'Ja existe um todo com o ID ou descrição enviados',
    ]);
  });
});
