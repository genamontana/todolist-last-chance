import React, {useEffect, useState} from 'react'
import {todolistsAPI} from '../api/todolists-a-p-i';

export default {
    title: 'TodoList/API'
}

const settings = {
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'eb07f558-5d2f-47f9-adac-eb8b66d5228c'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodoLists()
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodoList('last-chance')
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = 'bb874aea-a5c4-4dbd-a5f5-86bb779a29ad'
        todolistsAPI.deleteTodoList(todoListId)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = '673ead49-0fb8-48c2-82e5-bb5fa01e9e49'
        todolistsAPI.updateTodoList(todoListId, 'NEW TITLE')
            .then(res => setState(res.data))

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

