import {EditableSpan} from '../EditableSpan';
import {action} from '@storybook/addon-actions';

export default {
    title: 'TodoList/EditableSpan',
    component: EditableSpan,
}

const changeCallback = action('Value changed')

export const EditableSpanBaseExample = () => {
    return <EditableSpan title={'Start value'} onChange={changeCallback}/>
}