import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from '@mui/material';

export type EditableSpanType = {
    title: string
    onChange: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeHandlerTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setEditMode(false)
        }
    }

    return (
        editMode
            ? <TextField variant={'outlined'}
                         onBlur={activateViewMode}
                         onChange={onChangeHandlerTitle}
                         onKeyUp={onKeyPressHandler}
                         autoFocus
                         value={title}/>
            : <span onDoubleClick={activateEditMode}>{title}</span>
    );
};
