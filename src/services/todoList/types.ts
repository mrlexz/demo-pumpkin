

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
}

export interface TodoItemI {
  id: string;
  title: string;
  completed: boolean;
  user: User
}

export interface TodoListResponse {
  todos: {
    data: Array<TodoItemI>
  }
}

export interface TodoListPayload {
  options?: {
    paginate?: {
      limit: number;
      page: number;
    };
    search?: {
      q?: string;
    }
  }
}

interface Input {
  completed?: boolean;
  title?: string;
}

export interface TodoUpdatePayload {
  updateTodoId: string;
  input?: Input
}

export interface TodoCreatePayload {
  input?: Input
}