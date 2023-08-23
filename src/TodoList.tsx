import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
type TodoListType = {
    id: string
    title: string
    tasks: TasksType[]
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (id: string) => void
}

export function TodoList(props: TodoListType) {
    let [title, setTitle] = useState('')
    const [error, setError] = useState<null | string>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim(), props.id)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }

    const deleteTodolist = () => {
        props.removeTodoList(props.id)
    }
    return (
        <div>
            <h3>{props.title}
                <button onClick={deleteTodolist}>x</button>
            </h3>

            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyUp={onKeyPressHandler}
                       className={error ? 'error' : ''}/>
                <button onClick={addTask}></button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map((task) => {
                    const onClickHandler = () => props.removeTask(task.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeTaskStatus(task.id, newIsDoneValue, props.id)
                    }

                    return (<li key={task.id} className={task.isDone ? 'is-done' : ''}>
                        <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                        <span>{task.title}</span>
                        <button onClick={onClickHandler}></button>
                    </li>)

                })}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>
                    All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>
                    Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>
                    Completed
                </button>
            </div>
        </div>
    )
}