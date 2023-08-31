import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@mui/material';

export type AddItemFormType = {
    addItem: (title: string) => void
    disabled?: boolean
}


export const AddItemForm = React.memo((props: AddItemFormType)=>{

    let [title, setTitle] = useState('')
    const [error, setError] = useState<null | string>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null){
            setError(null)
        }
        if (e.key === 'Enter') {
            addItem()
        }
    }


    return (
        <div>
            <TextField variant={'outlined'}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyUp={onKeyPressHandler}
                       error={!!error}
                       label={'Title'}
                       helperText={error}/>
            <IconButton color={'primary'}
                        onClick={addItem}
                        style={{margin: '3px'}}></IconButton>
        </div>

    )
})