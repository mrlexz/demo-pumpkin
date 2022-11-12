import React, { useMemo, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { toast } from "react-toastify";
import Loading from '../../components/Loading';
import TodoItem from '../../components/TodoItem';
import { createTodoGQL, getTodosGQL } from '../../services/todoList';
import { TodoCreatePayload, TodoListPayload, TodoListResponse } from '../../services/todoList/types';

import './styles.css';

function List() {

  const [inputValue, setInputValue] = useState<string>("");

  const [createTodo] = useMutation<any, TodoCreatePayload>(createTodoGQL, {
    onCompleted: () => {
      toast("Create successfully!");
      refetch({
        options: {
          paginate: {
            limit: 10,
            page: 1,
          },
        },
      });
      setInputValue('');
    },
    onError: () => {
      toast("Something went wrong!", {
        type: "error",
      });
    },
  });

  const { loading, data, refetch } = useQuery<TodoListResponse, TodoListPayload>(getTodosGQL, {
    variables: {
      options: {
        paginate: {
          limit: 10,
          page: 1
        },
      }
    }
  });

  const todoList = useMemo(() => data?.todos?.data || [], [data])
  
  return (
    <div id="listWrapper">
      <div id="title">
        <input id="titleInput" type="text" placeholder="My List" maxLength={21} />
        <i className="fa fa-pencil-alt"></i>
      </div>

      <div id="separator"></div>

      <div id="itemsWrapper">
        {loading ? (
            <Loading />
          ) : (
            <div className="item">
              {todoList.map(todo => (
                <TodoItem key={todo.id} item={todo} refetch={refetch} />
              ))}
            </div>
          )}
      </div>
      <div id="addNewItemWrapper">
        <input type="text" id="addNewItemInput" value={inputValue} onChange={(e) => setInputValue(e?.target?.value)} />
        <button id="addNewItemBtn" onClick={() => {
          createTodo({
            variables: {
              input: {
                title: inputValue,
                completed: false,
              }
            }
          })
        }}>
          <i className="fas fa-plus"></i>
        </button>
      </div>
  </div>
  )
}

export default List;