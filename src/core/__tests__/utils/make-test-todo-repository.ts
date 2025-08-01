import { eq } from 'drizzle-orm';
import { drizzleDatabase } from '../../../db';
import { DrizzleTodoRepository } from '../../todo/repositories/drizzle-todo.repository';

export async function makeTestTodoRepository() {
  const { db, todoTable } = drizzleDatabase;
  const repository = new DrizzleTodoRepository(db);
  const todos = makeTestTodos();
  const insertTodoDb = () => db.insert(todoTable);
  const deleteTodoNoWhere = () => db.delete(todoTable);
  const deleteTodo = (id: string) =>
    db.delete(todoTable).where(eq(todoTable.id, id));
  return {
    todos,
    repository,
    insertTodoDb,
    deleteTodo,
    deleteTodoNoWhere,
  };
}

export const insertTestTodos = async () => {
  const { insertTodoDb } = await makeTestTodoRepository();
  const todos = makeTestTodos();

  await insertTodoDb().values(todos);

  return todos;
};

export const makeTestTodos = () => {
  return Array.from({ length: 5 }).map((_, index) => {
    const newTodo = {
      id: index.toString(),
      description: `Todo ${index}`,
      createdAt: `date ${index}`,
    };

    return newTodo;
  });
};
