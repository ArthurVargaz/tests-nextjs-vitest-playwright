type ValidateTodoDescription = {
  success: boolean;
  errors: string[];
};
export function validateTodoDescription(
  description: string,
): ValidateTodoDescription {
  const errors = [];

  if (description.length <= 3) {
    errors.push('Descricao precisa ter mais de 3 caracteres');
  }

  return {
    success: errors.length == 0,
    errors,
  };
}
