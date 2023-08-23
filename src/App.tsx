import React, {useState} from 'react';
import './App.css';
import {TodoList} from './TodoList';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},

    ])

    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks)
    }

    let [filter, setFilter] = useState<FilterValuesType>('all')

    let tasksFourTodoList = tasks

    if (filter === 'active') {
        tasksFourTodoList = tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        tasksFourTodoList = tasks.filter(task => task.isDone)
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    const addTask = (title: string) => {
        let task = {id: v1(), title: title, isDone: false}
        setTasks([task, ...tasks])
    }

    return (
        <div className="App">
            <TodoList title={'What to learn'}
                      tasks={tasksFourTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}/>
        </div>
    );
}

export default App;
