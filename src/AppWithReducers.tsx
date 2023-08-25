import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todolistsReducer
} from './state/todolists-reducer';

export type FilterValuesType = 'all' | 'active' | 'completed'

function AppWithReducers() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    const removeTask = (id: string, todoListId: string) => {
        dispatchToTasks(removeTaskAC(id, todoListId))
    }
    const addTask = (title: string, todoListId: string) => {
        dispatchToTasks(addTaskAC(title, todoListId))
    }
    const changeTaskStatus = (id: string, isDone: boolean, todoListId: string) => {
        dispatchToTasks(changeTaskStatusAC(id, isDone, todoListId))
    }
    const changeTaskTitle = (id: string, newTitle: string, todoListId: string) => {
        dispatchToTasks(changeTaskTitleAC(id, newTitle, todoListId))
    }

    let [todoLists, dispatchToTodoList] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        dispatchToTodoList(changeTodoListFilterAC(todoListId, value))
    }
    const removeTodoList = (id: string) => {
        dispatchToTodoList(removeTodoListAC(id))
        dispatchToTasks(removeTodoListAC(id))
    }
    const changeTodoListTitle = (todoListId: string, newTitle: string) => {
        dispatchToTodoList(changeTodoListTitleAC(todoListId, newTitle))
    }
    const addTodoList = (title: string) => {
        const action = addTodoListAC(title)
        dispatchToTasks(action)
        dispatchToTodoList(action)
    }

    return (
        <div className="App">
            {/*
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        TodoList
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(tl => {
                        let allTodoListTasks = tasks[tl.id]
                        let tasksFourTodoList = allTodoListTasks

                        if (tl.filter === 'active') {
                            tasksFourTodoList = allTodoListTasks.filter(task => !task.isDone)
                        }
                        if (tl.filter === 'completed') {
                            tasksFourTodoList = allTodoListTasks.filter(task => task.isDone)
                        }
                        return <Grid item key={tl.id}>
                            <Paper style={{padding: '10px'}}>
                                <TodoList key={tl.id}
                                          id={tl.id}
                                          title={tl.title}
                                          tasks={tasksFourTodoList}
                                          removeTask={removeTask}
                                          changeFilter={changeFilter}
                                          addTask={addTask}
                                          changeTaskStatus={changeTaskStatus}
                                          filter={tl.filter}
                                          removeTodoList={removeTodoList}
                                          changeTaskTitle={changeTaskTitle}
                                          changeTodoListTitle={changeTodoListTitle}/>
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
            */}
        </div>
    );
}

export default AppWithReducers;
