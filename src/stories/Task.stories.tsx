import {Task} from '../Task';
import {action} from '@storybook/addon-actions';

export default {
    title: 'TodoList/Task',
    component: Task,
}

const changeTaskStatusCallback = action('Status changed')
const changeTaskTitleCallback = action('Title changed')
const removeTaskCallback = action('Task removed')

export const TaskBaseExample = () => {
    return <>

        <Task todolistId={'todoListId_1'}
              task={{id: '1', title: 'Gena', isDone: false}}
              removeTask={removeTaskCallback}
              changeTaskStatus={changeTaskStatusCallback}
              changeTaskTitle={changeTaskTitleCallback}/>

        <Task todolistId={'todoListId_1'}
              task={{id: '2', title: 'Gena', isDone: true}}
              removeTask={removeTaskCallback}
              changeTaskStatus={changeTaskTitleCallback}
              changeTaskTitle={removeTaskCallback}/>

        </>

        }