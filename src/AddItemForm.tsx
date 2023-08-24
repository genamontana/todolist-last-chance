import React, {KeyboardEvent, ChangeEvent, useState} from 'react';

export type AddItemFormType = {
    addItem: (title: string) => void
}


export function AddItemForm(props: AddItemFormType) {
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
        setError(null)
        if (e.key === 'Enter') {
            addItem()
        }
    }

    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyUp={onKeyPressHandler}
                   className={error ? 'error' : ''}/>
            <button onClick={addItem}></button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>

    )
}