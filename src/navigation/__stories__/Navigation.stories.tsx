import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {Header, HeaderProps} from '../components/Header/Header';

import data from './data.json';

export default {
    component: Header,
    title: 'Components/Navigation',
} as Meta;

const DefaultTemplate: StoryFn<HeaderProps> = (args, context) => (
    <Header {...args} isMobile={context.globals.platform === 'mobile'} />
);

export const Default = DefaultTemplate.bind({});

//@ts-ignore
Default.args = data.default as HeaderProps;
