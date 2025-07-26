import { createTodoAction } from './create-todo.action';
import { makeTestTodoMocks } from '../../__tests__/utils/make-teste-todo-mocks';

vi.mock('next/cache', () => {
  return {
    revalidatePath: vi.fn(),
  };
});

describe('createTodoAction (unit)', () => {
  test('deve chamar o createTodoUseCase com os valores corretos', async () => {
    const { createTodoUseCaseSpy } = makeTestTodoMocks();
    const expectedParamCall = 'Usecase shoud be called with this';
    await createTodoAction(expectedParamCall);

    expect(createTodoUseCaseSpy).toHaveBeenCalledExactlyOnceWith(
      expectedParamCall,
    );
  });
  test('deve chamar o revalidatePath se o usecase retornar sucesso', async () => {
    const { revalidatePathMocked } = makeTestTodoMocks();
    const description = 'Usecase shoud be called with this';
    await createTodoAction(description);

    expect(revalidatePathMocked).toHaveBeenCalledExactlyOnceWith('/');
  });
  test('deve retornar o mesmo valor do usecase em caso de sucesso', async () => {
    const { successResult } = makeTestTodoMocks();
    const description = 'Usecase shoud be called with this';
    const result = await createTodoAction(description);

    expect(result).toStrictEqual(successResult);
  });
  test('deve retornar o mesmo valor do usecase em caso de erro', async () => {
    const { createTodoUseCaseSpy, errorResult } = makeTestTodoMocks();
    createTodoUseCaseSpy.mockResolvedValue(errorResult);
    const description = 'Usecase shoud be called with this';
    const result = await createTodoAction(description);

    expect(result).toStrictEqual(errorResult);
  });
});
