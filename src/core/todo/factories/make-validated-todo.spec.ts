import * as sanitizeStrMod from '../../../utils/sanitize-str';
import * as validateTodoDescriptionMod from '../schemas/validate-todo-description';
import { makeValidatedTodo } from './make-validated-todo';
import * as makeNewTodoMod from './make-new-todo';
import { InValidTodo, ValidTodo } from '../schemas/todo.contract';

describe('makeValidatedTodo (unit)', () => {
  test('deve chamar a função sanitizeStr com o valor correto', () => {
    const { description, sanitizeStrSpy } = makeMocks();

    makeValidatedTodo(description);

    expect(sanitizeStrSpy).toHaveBeenCalled();
  });
  test('deve chamar a validateTodoDescription com o retorno de sanitizeStr', () => {
    const { description, sanitizeStrSpy, validateTodoDescriptionSpy } =
      makeMocks();

    const sanitizeStrReturn = 'retorno da sanitizeStr';

    sanitizeStrSpy.mockReturnValue(sanitizeStrReturn);
    makeValidatedTodo(description) as ValidTodo;

    expect(validateTodoDescriptionSpy).toHaveBeenCalledExactlyOnceWith(
      sanitizeStrReturn,
    );
  });
  test('deve chamar makeNewTodo se validatedDescription retornou sucesso', () => {
    const { description } = makeMocks();
    const result = makeValidatedTodo(description) as ValidTodo;
    expect(result.success).toBe(true);

    expect(result.todo.id).toBe('any-id');
    expect(result.todo.description).toBe('abcd');
    expect(result.todo.createdAt).toBe('any-date');
  });
  test('deve retornar makeNewTodo se validatedDescription.error se a validacao falhou', () => {
    const { description, validateTodoDescriptionSpy, errors } = makeMocks();
    validateTodoDescriptionSpy.mockReturnValue({
      errors,
      success: false,
    });

    const result = makeValidatedTodo(description) as InValidTodo;

    expect(result).toStrictEqual({
      errors,
      success: false,
    });
  });
});

const makeMocks = (description = 'abcd') => {
  const errors = ['any', 'error'];
  const todo = {
    id: 'any-id',
    description,
    createdAt: 'any-date',
  };
  const sanitizeStrSpy = vi
    .spyOn(sanitizeStrMod, 'sanitizeStr')
    .mockReturnValue(description);
  const validateTodoDescriptionSpy = vi
    .spyOn(validateTodoDescriptionMod, 'validateTodoDescription')
    .mockReturnValue({
      errors: [],
      success: true,
    });
  const makeNewTodoSpy = vi
    .spyOn(makeNewTodoMod, 'makeNewTodo')
    .mockReturnValue(todo);

  return {
    description,
    sanitizeStrSpy,
    validateTodoDescriptionSpy,
    makeNewTodoSpy,
    todo,
    errors,
  };
};
