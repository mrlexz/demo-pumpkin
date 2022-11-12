import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import {
  TodoItemI,
  TodoListPayload,
  TodoUpdatePayload,
} from "../../services/todoList/types";
import { deleteTodoGQL, updateTodoGQL } from "../../services/todoList";

interface TodoItemProps {
  item: TodoItemI;
  refetch: (payload: TodoListPayload) => {};
}

function TodoItem({ item, refetch }: TodoItemProps) {
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const [inputValue, setInputValue] = useState<string>("");

  const [updateTodo] = useMutation<any, TodoUpdatePayload>(updateTodoGQL, {
    onCompleted: () => {
      toast("Update successfully!");
      refetch({
        options: {
          paginate: {
            limit: 10,
            page: 1,
          },
        },
      });
    },
    onError: () => {
      toast("Something went wrong!", {
        type: "error",
      });
    },
  });

  const [deleteTodo] = useMutation<any, { deleteTodoId: string }>(
    deleteTodoGQL,
    {
      onCompleted: () => {
        toast("Delete successfully!");
        refetch({
          options: {
            paginate: {
              limit: 10,
              page: 1,
            },
          },
        });
      },
      onError: () => {
        toast("Something went wrong!", {
          type: "error",
        });
      },
    }
  );

  const updateComplete = (item: TodoItemI) => {
    updateTodo({
      variables: {
        updateTodoId: item?.id,
        input: {
          completed: !item?.completed,
        },
      },
    });
  };

  const updateTitle = (item: TodoItemI) => {
    updateTodo({
      variables: {
        updateTodoId: item?.id,
        input: {
          title: inputValue,
        },
      },
    });
    setInputValue("");
  };

  return (
    <div className="itemInner">
      {!isUpdate ? (
        <>
          <i
            className="far fa-hand-point-right"
            onClick={() => updateComplete(item)}
          ></i>
          <p className={(item?.completed || (Number(item.id) % 2 === 0) ? "completed" : "")}>{item?.title}</p>
          <button
            className="updateItemBtn"
            onClick={() => {
              setIsUpdate(true);
              setInputValue(item?.title);
            }}
          >
            <i className="fas fa-pencil-alt"></i>
          </button>
          <button
            className="removeItemBtn"
            onClick={() => {
              deleteTodo({
                variables: {
                  deleteTodoId: item?.id,
                },
              });
            }}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </>
      ) : (
        <div id="addNewItemWrapper">
          <input
            type="text"
            id="addNewItemInput"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e?.target?.value);
            }}
          />
          <button
            id="addNewItemBtn"
            onClick={() => {
              updateTitle(item);
              setIsUpdate(false);
            }}
          >
            <i className="fas fa-check"></i>
          </button>
          <button
            id="cancelBtn"
            onClick={() => {
              setIsUpdate(false);
            }}
          >
            <i className="fas fa-ban"></i>
          </button>
        </div>
      )}
    </div>
  );
}

export default TodoItem;
