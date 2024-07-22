"use client";
import React, { useEffect, useRef, useState } from "react";
import { add } from "@/slices/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "@/slices/todoSlice";
import { v4 as uuidv4 } from "uuid";
import { deleteTodo } from "@/slices/todoSlice";
import { editTodo } from "@/slices/todoSlice";
import { shiftEdit } from "@/slices/todoSlice";
import { completeTodo } from "@/slices/todoSlice";
import { ToastContainer, toast } from 'react-toastify';
import { reloadFun } from "@/slices/todoSlice";
import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todolist.todos);
  const [isLoading, setisLoading] = useState(true);
  const [editedText, seteditedText] = useState("");
  const editRef = useRef();
  const [inputTodo, setinputTodo] = useState("");

  useEffect(() => {
    setisLoading(true);
    dispatch(getTodos());
    setisLoading(false);
  }, []);

  window.onload=()=>{
    dispatch(getTodos())
    dispatch(reloadFun())
  }


  return (
    <>
      <div className="w-[50%] bg-slate-700 min-h-[80vh] py-10">
        <h1 className="text-white text-3xl px-3 py-2 text-center">Todo List</h1>
        <div className="px-10 py-4 flex justify-center items-center gap-3">
          <input
            type="text"
            name=""
            id=""
            placeholder="Write your task"
            className="px-2 py-1 w-[70%]"
            value={inputTodo}
            onChange={(e) =>
              setinputTodo(e.target.value)
            }
          />
          <button
            className="bg-[#CCCCCC] px-5 py-1  rounded-md"
            onClick={() => {
              if (inputTodo.length > 0) {
                dispatch(
                  add({
                    id: uuidv4(),
                    task: inputTodo,
                    isCompleted: false,
                    editMode: false,
                  })
                );
                setinputTodo("");
              } else {
                toast.info("please enter your task",{
                  position:"top-right"
                })
              }
            }}
          >
            Add{" "}
          </button>
        </div>
        <div className="w-[100%] px-20 mt-4 h-full  flex flex-col gap-1  ">
          {!isLoading ? (
            todos.length > 0 ? (
              todos.map((item) => {
                return (
                  <>
                    <div className="task  py-1 flex gap-3 items-center ">
                      <input
                        type="checkbox"
                        className="cursor-pointer"
                        name=""
                        id=""
                        onChange={() => dispatch(completeTodo(item))}
                        style={{ width: "30px", height: "20px" }}
                        defaultChecked={item.isCompleted}
                        disabled={item.editMode}
                      />

                      {item.editMode ? (
                        <input
                          type="text"
                          name=""
                          ref={editRef}
                          id=""
                          defaultValue={item.task}
                          className={`px-2 py-1 w-[60%] outline-none border-2 bg-transparent text-white ${
                            editRef.current && editRef.current.value === ""
                              ? "border-red-600"
                              : ""
                          }`}
                          onChange={(e) => {
                            seteditedText(e.target.value);
                            console.log("helo");
                          }}
                        />
                      ) : (
                        <div className="w-[60%]">
                          <p
                            className="text-white text-xl font-semibold  break-words "
                            style={
                              item.isCompleted
                                ? { textDecorationLine: "line-through" }
                                : {}
                            }
                          >
                            {item.task}
                          </p>
                        </div>
                      )}
                      {item.editMode ? (
                        <button
                          className="bg-green-600 px-4 h-10 text-md rounded-sm font-semibold"
                          onClick={() => {
                            if (editRef.current.value.length > 0) {
                              dispatch(shiftEdit(item));
                              dispatch(editTodo({ item, editedText }));
                            } else {
                              toast.info("please enter your task",{
                                position:"top-right"
                              })
                            }

                          }}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          className="bg-yellow-400 px-4 h-8 text-md rounded-sm font-semibold"
                          onClick={() => {
                            seteditedText(item.task);
                            dispatch(shiftEdit(item));
                          }}
                          disabled={item.isCompleted ? "true" : false}
                          style={item.isCompleted ? { opacity: "0.5" } : {}}
                        >
                          Editt
                        </button>
                      )}
                      <button
                        className="bg-red-700 px-3 h-8 text-white text-md rounded-sm font-semibold"
                        onClick={() => dispatch(deleteTodo(item))}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                );
              })
            ) : (
              <div className="h-[50vh] w-[100%] flex justify-center items-center text-3xl font-bold text-white opacity-35">
                No tasks
              </div>
            )
          ) : (
            <div class="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
              <div class="flex gap-8">
                <svg
                  class="text-gray-300 animate-spin"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                >
                  <path
                    d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                    stroke="currentColor"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                    stroke="currentColor"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-blue-500"
                  ></path>
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
