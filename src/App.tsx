import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';

export type filterType = 'all' | 'active' | 'completed'


function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: 1, isDone: true, title: 'HTML&CSS'},
            {id: 2, isDone: true, title: 'JS'},
            {id: 3, isDone: false, title: 'React'},
            {id: 4, isDone: false, title: 'Redux'}
        ]
    )
    const [filter, setFilter] = useState<filterType>('all')
    const removeTask = (id: number) => {
        let filteredTasks = tasks.filter((t) => t.id !== id)
        setTasks(filteredTasks)
    }

    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter((t) => t.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter((t) => !t.isDone)
    }
    const changeFilter = (value:filterType) => {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist
                title={'what to learn'}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}


export default App;
