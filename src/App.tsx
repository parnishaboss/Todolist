import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';

export type filterType = 'all' | 'active' | 'completed'


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
    const [filter, setFilter] = useState<filterType>('all')
    const getFilteredTasksForRender = (allTasks:Array<TaskType>,filterValue:filterType) => {
        switch (filterValue) {
            case 'active':
                return allTasks.filter(t=> t.isDone === false)
            case 'completed':
                return  allTasks.filter(t => t.isDone === true)
            default :
                return allTasks
        }
    }
    const changeFilter = (nextFilerValue:filterType) => {
        setFilter(nextFilerValue)
    }
    const filteredTasksForRender:Array<TaskType> = getFilteredTasksForRender(tasks, filter)
    return (
        <div className="App">
            <Todolist
                title={todolistTitle}
                tasks={filteredTasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}


export default App;
