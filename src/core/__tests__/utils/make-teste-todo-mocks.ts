import * as createTodoUseCaseMod from '@/core/todo/usecases/create-todo.usecase';
import * as deleteTodoUseCaseMod from '@/core/todo/usecases/delete-todo.usecase';
import { revalidatePath } from 'next/cache';
import { InValidTodo, ValidTodo } from '../../todo/schemas/todo.contract';

export const makeTestTodoMocks = () => {
  const successResult = {
    success: true,
    todo: {
      id: 'id',
      description: 'any-desc',
      createdAt: 'any-create',
    },
  } as ValidTodo;

  const errorResult = {
    success: false,
    errors: ['any', 'error'],
  } as InValidTodo;

  const createTodoUseCaseSpy = vi
    .spyOn(createTodoUseCaseMod, 'createTodoUseCase')
    .mockResolvedValue(successResult);
  const deleteTodoUseCaseSpy = vi
    .spyOn(deleteTodoUseCaseMod, 'deleteTodoUseCase')
    .mockResolvedValue(successResult);

  const revalidatePathMocked = vi.mocked(revalidatePath);

  return {
    successResult,
    errorResult,
    createTodoUseCaseSpy,
    revalidatePathMocked,
    deleteTodoUseCaseSpy,
  };
};
