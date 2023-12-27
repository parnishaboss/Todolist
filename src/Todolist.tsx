import React, {FC} from 'react';
import {filterType} from './App';

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id:number) => void
    changeFilter:  (value:filterType) => void
}
export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist: FC<TodolistPropsType> = (
    {
        title,
        tasks,
        removeTask,
        changeFilter,

    }
) => {

    const listItems = tasks.map((t) => {
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                <button onClick={ () => {removeTask(t.id)} }>x</button>
            </li>
        )
    })
    const tasksList = tasks.length
        ? <ul>{listItems}</ul>
        : <span>No tasks. Empty list</span>

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            {tasksList}
            <div>
                <button onClick={() => {changeFilter('all')}}>All</button>
                <button onClick={() => {changeFilter('active')}}>Active</button>
                <button onClick={() => {changeFilter('completed')}}>Completed</button>
            </div>
        </div>
    )
}