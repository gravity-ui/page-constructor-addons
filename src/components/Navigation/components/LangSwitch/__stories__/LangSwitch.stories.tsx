import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {LangSwitch, LangSwitchProps} from '..';

import data from './data.json';

export default {
    component: LangSwitch,
    title: 'Components/LangSwitch',
} as Meta;

const DefaultTemplate: StoryFn<LangSwitchProps> = (args) => <LangSwitch {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = data.default as LangSwitchProps;

export const NoTextInMobile = DefaultTemplate.bind({});

NoTextInMobile.args = data.noTextInMobile as LangSwitchProps;
