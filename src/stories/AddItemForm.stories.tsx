import React from 'react';
import {AddItemForm} from '../AddItemForm';
import {action} from '@storybook/addon-actions';


export default {
    title: 'TodoList/AddItemForm',
    component: AddItemForm,

}

const callback = action('Button add was pressed inside the form')

export const AddItemFormBaseExample = (props: any) => {
    return <AddItemForm addItem={callback}/>
}

export const AddItemFormDisabledExample = (props: any) => {
    return <AddItemForm addItem={callback} disabled={true}/>
}

/*

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormOne = Template.bind({});
AddItemFormOne.args = {
    addItem: action('Button clicked inside form')
};

*/


