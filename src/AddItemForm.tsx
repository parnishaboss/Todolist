import React, {useState} from 'react';

type  addItemFormType = {
    addItem: (title: string, todolistID: string) => void
    id: string
}



export const AddItemForm: React.FC<addItemFormType> = ({addItem, id}) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addItem(newTaskTitle.trim(), id)
            setNewTaskTitle('')
        }
    }

    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== '') {
            addItem(newTaskTitle, id)
            setNewTaskTitle('')
        } else {
            setError('Field is requered')
        }

    }
    return (
        <div>
            <input value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   className={error ? 'error' : ''}/>
            <button onClick={addTaskHandler}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}