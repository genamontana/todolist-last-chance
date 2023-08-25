import {FilterValuesType, TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodoListActionType, RemoveTodoListActionType} from './todolists-reducer';

type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    id: string,
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    id: string
    isDone: boolean
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    id: string
    title: string
    todolistId: string
}

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id)}
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.id
                    ? {...t, isDone: action.isDone} : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.id
                    ? {...t, title: action.title} : t)
            }
        case 'ADD-TODOLIST':
            return {
                ...state, [action.todolistId]: []
            }
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.id]
            return copyState

        default:
            throw new Error('I don\'t understand this type')
    }
}

export const removeTaskAC = (id: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK' as const, id, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK' as const, title, todolistId}
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS' as const, id, isDone, todolistId}
}
export const ChangeTaskTitleAC = (id: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE' as const, id, title, todolistId}
}

