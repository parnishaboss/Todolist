import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type filterType = 'all' | 'active' | 'completed'
type TodolistsType = {
    id: string
    title: string
    filter: filterType
}

function App() {

    const removeTask = (ID: string, todolistId: string) => {
        let tasks = tasksObg[todolistId]
        let filteredTasks = tasks.filter((t) => t.id !== ID)
        tasksObg[todolistId] = filteredTasks
        setTasks({...tasksObg})
    }

    const addTask = (title: string, todolistId: string) => {
        let newTask = {id: v1(), isDone: false, title: title}
        let tasks = tasksObg[todolistId]
        let newTasks = [newTask, ...tasks]
        tasksObg[todolistId] = newTasks
        setTasks({...tasksObg})
    }

    const changeFilter = (value: filterType, todolistID: string) => {
        let todolist = todolists.find(tl => tl.id === todolistID)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }
    const changeStatus = (taskID: string, isDone: boolean, todolistID: string ) => {
        let tasks = tasksObg[todolistID]
        let task = tasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObg})
        }
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>(
        [{id: todolistId1, title: 'What to learn', filter: 'active'},
            {id: todolistId2, title: 'What to buy', filter: 'all'},]
    )
    const [tasksObg, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), isDone: true, title: 'HTML&CSS'},
            {id: v1(), isDone: true, title: 'JS'},
            {id: v1(), isDone: false, title: 'React'},
            {id: v1(), isDone: false, title: 'Redux'}
        ],
        [todolistId2]: [
            {id: v1(), isDone: false, title: 'milk'},
            {id: v1(), isDone: false, title: 'bread'},
            {id: v1(), isDone: false, title: 'apple'},
            {id: v1(), isDone: false, title: 'carrot'}
        ]
    })


    return (
        <div className="App">
            {todolists.map((tl) => {
                let tasksForTodolist = tasksObg[tl.id]
                if (tl.filter === 'active') {
                    tasksForTodolist = tasksObg[tl.id].filter((t) => t.isDone)
                }
                if (tl.filter === 'completed') {
                    tasksForTodolist = tasksObg[tl.id].filter((t) => !t.isDone)
                }
                return (
                    <Todolist
                        id={tl.id}
                        key={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                    />
                )
            })}

        </div>
    );
}


export default App;
