import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {Header, HeaderProps} from '../containers/Header';

import {DummySearch} from './DummySearch/DummySearch';

import data from './data.json';

export default {
    component: Header,
    title: 'Components/Navigation',
} as Meta;

const renderDummySearch: HeaderProps['renderSearch'] = (props) => <DummySearch {...props} />;

const DefaultTemplate: StoryFn<HeaderProps> = (args, context) => (
    <Header
        {...args}
        isMobile={context.globals.platform === 'mobile'}
        theme={context.globals.theme}
        renderSearch={renderDummySearch}
    />
);

export const Default = DefaultTemplate.bind({});

Default.args = data.default as HeaderProps;
