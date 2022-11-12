import { gql } from '@apollo/client';

export const getTodosGQL = gql`
  query Todos($options: PageQueryOptions) {
    todos(options: $options) {
      data {
        id
        title
        completed
        user {
          id
          name
          username
          email
          phone
          website
        }
      }
    }
  }
`;

export const updateTodoGQL = gql`
  mutation UpdateTodo($updateTodoId: ID!, $input: UpdateTodoInput!) {
  updateTodo(id: $updateTodoId, input: $input) {
    id
    title
    completed
    user {
      id
      name
      phone
    }
  }
}
`;

export const deleteTodoGQL = gql`
  mutation DeleteTodo($deleteTodoId: ID!) {
    deleteTodo(id: $deleteTodoId)
  }
`

export const createTodoGQL = gql `
  mutation CreateTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
      title
      completed
      user {
        id
        name
        phone
      }
    }
  }
`