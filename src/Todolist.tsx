import React, {FC} from 'react';
import {filterType} from './App';
import {AddItemForm} from './AddItemForm';

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (ID: string, todolistID: string) => void
    changeFilter: (value: filterType, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistID: string) => void
    filter: filterType
    removeTodolist: (todolistID: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist: FC<TodolistPropsType> = (
    {
        id,
        title,
        tasks,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        filter,
        removeTodolist
    }
) => {
    const listItems = tasks.map((t) => {
        const onRemoveHandler = () => {
            removeTask(t.id, id)
        }
        const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(t.id, e.currentTarget.checked, id)
        }
        return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
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

    const removeTodolistHandler = () => {
        removeTodolist(id)
    }
    const onAllClickHandler = () => {
        changeFilter('all', id)
    }
    const onActiveClickHandler = () => {
        changeFilter('active', id)
    }
    const onCompletedClickHandler = () => {
        changeFilter('completed', id)
    }
    const addTask = (title:string) => {
        addTask(title,id)
    }

    return (
        <div className="todolist">
            <h3>{title}
                <button onClick={removeTodolistHandler}>delete</button>
            </h3>
            <AddItemForm
                id={id}
                addItem={addTask}
            />
            {tasksList}
            <div>
                <button className={filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All
                </button>
                <button className={filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active
                </button>
                <button className={filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}



