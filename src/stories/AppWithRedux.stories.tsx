import {action} from '@storybook/addon-actions';
import AppWithRedux from '../AppWithRedux';
import {ReduxStoreProviderDecorator} from './decorators/ReduxStoreProviderDecorator';
import {AppRootStateType} from '../state/store';

export default {
    title: 'TodoList/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}

const changeCallback = action('Value changed')

export const AppWithReduxBaseExample = () => {
    return <AppWithRedux/>
}