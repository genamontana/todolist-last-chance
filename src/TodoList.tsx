import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    title: string
    tasks: TasksType[]
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function TodoList(props: TodoListType) {
    let [title, setTitle] = useState('')

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyUp={onKeyPressHandler}/>
                <button onClick={addTask}></button>
            </div>
            <ul>
                {props.tasks.map((task) => {
                    const onClickHandler = () => props.removeTask(task.id)

                    return (<li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button onClick={onClickHandler}></button>
                    </li>)

                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>
                    All
                </button>
                <button onClick={onActiveClickHandler}>
                    Active
                </button>
                <button onClick={onCompletedClickHandler}>
                    Completed
                </button>
            </div>
        </div>
    )
}