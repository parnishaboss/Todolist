import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';


function App() {
    const todolistTitle: string = 'what to learn'
    const [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: 1, isDone: true, title: 'HTML&CSS'},
            {id: 2, isDone: true, title: 'JS'},
            {id: 3, isDone: false, title: 'React'},
            {id: 4, isDone: false, title: 'Redux'}
        ]
    )
    const removeTask = (taskId:number) => {
        let filteredTasks = tasks.filter(t => t.id !==taskId)
        setTasks(filteredTasks)
        // let filteredTasks = tasks.filter ( (t) => {
        //     if (t.id !== id) {
        //         return true;
        //     } else {
        //         return false
        //     }
        // })
    }
    return (
        <div className="App">
            <Todolist
                title={todolistTitle}
                tasks={tasks}
                removeTask={removeTask}
            />
        </div>
    );
}


export default App;
