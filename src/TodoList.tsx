import React from 'react';
import {FilterValuesType} from './App';

type TasksType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListType = {
    title: string
    tasks: TasksType[]
    removeTask: (id: number) => void
    changeFilter: (value: FilterValuesType) => void
}

export function TodoList(props: TodoListType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button></button>
            </div>
            <ul>
                {props.tasks.map(task => <li key={task.id}>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={() => props.removeTask(task.id)}></button>
                </li>)}
            </ul>
            <div>
                <button
                    onClick={() => props.changeFilter('all')}>
                    All
                </button>
                <button
                    onClick={() => props.changeFilter('active')}>
                    Active
                </button>
                <button
                    onClick={() => props.changeFilter('completed')}>
                    Completed
                </button>
            </div>
        </div>
    )
}