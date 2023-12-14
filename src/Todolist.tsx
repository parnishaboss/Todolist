import React, {FC} from 'react';
import {filterType} from './App';

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask:(taskID:number) => void
    changeFilter:(nextFilerValue:filterType) => void
}
export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist: FC<TodolistPropsType> = (
    {
        title,              // const title = props.title       // const {title , tasks} = props
        tasks,           // const tasks = props.tasks      // const {title:title , tasks:tasks} = props
        removeTask,
        changeFilter

    }
) => {

    const listItems: Array<JSX.Element> = tasks.map((t) => {
        const onClickRemoveTaskHandler = () => removeTask(t.id)
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                <button onClick={onClickRemoveTaskHandler}>x</button>
                {/*<button onClick={() => {removeTask(t.id)}}>x</button>*/}
            </li>
        )
    })
    const tasksList: JSX.Element = tasks.length //если у массива есть длина
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