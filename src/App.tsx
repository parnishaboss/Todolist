import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type filterType = 'all' | 'active' | 'completed'


function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: v1(), isDone: true, title: 'HTML&CSS'},
            {id: v1(), isDone: true, title: 'JS'},
            {id: v1(), isDone: false, title: 'React'},
            {id: v1(), isDone: false, title: 'Redux'}
        ]
    )

    const [filter, setFilter] = useState<filterType>('all')
    const removeTask = (ID:string) => {
        let filteredTasks = tasks.filter( (t) => t.id !== ID)
        setTasks(filteredTasks)
    }
    const addTask = (title:string) => {
        let newTask = {id: v1(), isDone: false, title: title}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }
    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter( (t) => t.isDone )
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter( (t) => !t.isDone )
    }
    const changeFilter = (value:filterType) =>{
        setFilter(value)
    }
    return (
        <div className="App">
            <Todolist
                title={'what to learn'}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}


export default App;
