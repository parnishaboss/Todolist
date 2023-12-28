import React, {FC, useState} from 'react';
import {filterType} from './App';

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (ID: string) => void
    changeFilter: (value: filterType) => void
    addTask: (title: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist: FC<TodolistPropsType> = (
    {
        title,
        tasks,
        removeTask,
        changeFilter,
        addTask,

    }
) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const listItems = tasks.map((t) => {
        const onRemoveHandler = () => {
            removeTask(t.id)
        }
        return (

            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                <button onClick={onRemoveHandler}>x
                </button>
            </li>
        )
    })
    const tasksList = tasks.length
        ? <ul>{listItems}</ul>
        : <span>No tasks. Empty list</span>
    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    const onNewTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const addTaskHandler = () => {
        addTask(newTaskTitle)
        setNewTaskTitle('')
    }
    const onAllClickHandler = () => {
        changeFilter('all')
    }
    const onActiveClickHandler = () => {
        changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        changeFilter('completed')
    }

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyDown={onKeyDownHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            {tasksList}
            <div>
                <button onClick={onAllClickHandler}>All
                </button>
                <button onClick={onActiveClickHandler}>Active
                </button>
                <button onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}