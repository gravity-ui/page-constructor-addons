import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {DummyComponent, DummyComponentProps} from '..';

import data from './data.json';

export default {
    component: DummyComponent,
    title: 'Components/DummyComponent',
} as Meta;

const DefaultTemplate: StoryFn<DummyComponentProps> = (args) => <DummyComponent {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = data.default as DummyComponentProps;
