import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';


function App() {
    const todolistTitle_1: string = 'what to learn'
    const todolistTitle_2: string = 'what to buy'
    const tasks_1: Array<TaskType> = [
        {id: 1, isDone: true, title: 'HTML&CSS'},
        {id: 2, isDone: true, title: 'JS'},
        {id: 3, isDone: false, title: 'React'},
        {id: 4, isDone: false, title: 'Redux'}
    ]
    const tasks_2: Array<TaskType> = [
        {id: 5, isDone: false, title: 'Bread'},
        {id: 6, isDone: false, title: 'Chocolate'},
        {id: 7, isDone: true, title: 'Tea'},
        {id: 8, isDone: true, title: 'Coffee'}
    ]

    return (
        <div className="App">
            <Todolist
                title={todolistTitle_1}
                tasks={tasks_1}
            />

            <Todolist
                title={todolistTitle_2}
                tasks={tasks_2}
            />

        </div>
    );
}


export default App;
