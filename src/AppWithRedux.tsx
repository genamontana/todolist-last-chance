import React from 'react';
import './App.css';
import {TodoList} from './TodoList';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC
} from './state/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TasksStateType, TodolistsType} from './App';

export type FilterValuesType = 'all' | 'active' | 'completed'

function AppWithRedux() {
    const todoLists = useSelector<AppRootStateType, TodolistsType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = (id: string, todoListId: string) => {
        dispatch(removeTaskAC(id, todoListId))
    }
    const addTask = (title: string, todoListId: string) => {
        dispatch(addTaskAC(title, todoListId))
    }
    const changeTaskStatus = (id: string, isDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(id, isDone, todoListId))
    }
    const changeTaskTitle = (id: string, newTitle: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(id, newTitle, todoListId))
    }


    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        dispatch(changeTodoListFilterAC(todoListId, value))
    }
    const removeTodoList = (id: string) => {
        dispatch(removeTodoListAC(id))
    }
    const changeTodoListTitle = (todoListId: string, newTitle: string) => {
        dispatch(changeTodoListTitleAC(todoListId, newTitle))
    }
    const addTodoList = (title: string) => {
        dispatch(addTodoListAC(title))
    }

    return (
        <div className="App">
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
        </div>
    );
}

export default AppWithRedux;
