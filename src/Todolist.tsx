import React, {FC, useState} from 'react';
import {filterType} from './App';
import {Simulate} from 'react-dom/test-utils';
import error = Simulate.error;

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (ID: string) => void
    changeFilter: (value: filterType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    filter:filterType
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
        changeTaskStatus,
        filter,

    }
) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const listItems = tasks.map((t) => {
        const onRemoveHandler = () => {
            removeTask(t.id)
        }
        const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(t.id, e.currentTarget.checked)
        }
        return (
            <li key={t.id} className={t.isDone  ? 'is-done' : ''}>
                <input type="checkbox"
                       onChange={onChangeHandler}
                       checked={t.isDone}
                />
                <span>{t.title}</span>
                <button onClick={onRemoveHandler}>
                    x
                </button>
            </li>
        )
    })
    const tasksList = tasks.length
        ? <ul>{listItems}</ul>
        : <span>No tasks. Empty list</span>
    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTask(newTaskTitle.trim())
            setNewTaskTitle('')
        }
    }
    const onNewTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== '') {
            addTask(newTaskTitle)
            setNewTaskTitle('')
        } else {
            setError('Field is requered')
        }

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
                       onKeyDown={onKeyDownHandler}
                       className={error ? 'error' : ''}/>
                <button onClick={addTaskHandler}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            {tasksList}
            <div>
                <button className={filter === 'all'? 'active-filter' : ''} onClick={onAllClickHandler}>All
                </button>
                <button className={filter === 'active'? 'active-filter' : ''} onClick={onActiveClickHandler}>Active
                </button>
                <button className={filter === 'completed'? 'active-filter' : ''} onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}