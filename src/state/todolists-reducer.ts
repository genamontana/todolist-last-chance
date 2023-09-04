import {FilterValuesType, TodolistsType} from '../App';
import {v1} from 'uuid';
import {todolistsAPI, TodoListType} from '../api/todolists-a-p-i';
import {Dispatch} from 'redux';

type ActionsType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType
    | SetTodoListsActionType

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}
export type SetTodoListsActionType = {
    type: 'SET-TODOLISTS'
    todoLists: TodoListType[]
}

const initialState: TodolistsType[] = []

export const todolistsReducer = (state: TodolistsType[] = initialState, action: ActionsType): TodolistsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{id: action.todolistId, title: action.title, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE': {
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
            }
            return [...state]
        }
        case 'SET-TODOLISTS': {
            return action.todoLists.map(tl => ({...tl, filter: 'all'}))
        }
        default:
            return state
    }

}

export const fetchTodoListsThunk = (dispatch: Dispatch) => {
    todolistsAPI.getTodoLists()
        .then(res => dispatch(setTodoListsAC(res.data)))
}


export const removeTodoListAC = (todolistId: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST' as const, id: todolistId}
}
export const addTodoListAC = (title: string): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST' as const, title, todolistId: v1()}
}
export const changeTodoListTitleAC = (todolistId: string, title: string): ChangeTodoListTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE' as const, id: todolistId, title}
}
export const changeTodoListFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodoListFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER' as const, id: todolistId, filter}
}
export const setTodoListsAC = (todoLists: TodoListType[]): SetTodoListsActionType => {
    return {type: 'SET-TODOLISTS' as const, todoLists}
}
