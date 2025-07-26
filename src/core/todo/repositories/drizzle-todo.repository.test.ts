import { describe, test, expect, beforeEach, afterAll } from 'vitest';
import {
  insertTestTodos,
  makeTestTodoRepository,
} from '../../__tests__/utils/make-test-todo-repository';
import { InValidTodo, ValidTodo } from '../schemas/todo.contract';

describe('DrizzleTodoRepository (integration)', () => {
  beforeEach(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  afterAll(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  describe('findAll', () => {
    test('deve retornar um array vazio se a tabela estiver limpa', async () => {
      const { repository } = await makeTestTodoRepository();
      const result = await repository.findAll();
      expect(result).toStrictEqual([]);
    });

    test('deve retornar todos os TODOS em ordem decrescente', async () => {
      const { repository } = await makeTestTodoRepository();
      await insertTestTodos();

      const result = await repository.findAll();

      expect(result).toHaveLength(5);
      expect(result[0].createdAt).toBe('date 4');
      expect(result[1].createdAt).toBe('date 3');
    });
  });

  describe('create', () => {
    test('cria um todo se os dados estão válidos', async () => {
      const { repository, todos } = await makeTestTodoRepository();
      const newTodo = (await repository.create(todos[0])) as ValidTodo;
      expect(newTodo.success).toBe(true);
      expect(newTodo.todo).toEqual(todos[0]);
    });

    test('falha se houver uma descrição ou ID igual na tabela', async () => {
      const { repository, todos } = await makeTestTodoRepository();
      await repository.create(todos[0]);

      const anotherTodo = {
        id: 'any-other-id',
        description: todos[0].description,
        createdAt: 'any-date',
      };

      const result = (await repository.create(anotherTodo)) as InValidTodo;

      expect(result.success).toBe(false);
      expect(result.errors).toStrictEqual([
        'Ja existe um todo com o ID ou descrição enviados',
      ]);
    });
  });

  describe('remove', () => {
    test('apaga um todo se ele existir', async () => {
      const { repository, todos } = await makeTestTodoRepository();
      await insertTestTodos();
      const result = (await repository.remove(todos[0].id)) as ValidTodo;
      expect(result.success).toBe(true);
      expect(result.todo).toEqual(todos[0]);
    });

    test('falha ao apagar se o todo nao existir', async () => {
      const { repository } = await makeTestTodoRepository();
      const result = (await repository.remove('any id')) as InValidTodo;
      expect(result.success).toBe(false);
      expect(result.errors).toEqual(['Todo nao existe']);
    });
  });
});
