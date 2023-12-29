import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {Footer} from '../Footer';
import {FooterProps} from '../models';

import data from './data.json';

export default {
    component: Footer,
    title: 'Navigation/Footer',
} as Meta;

const DefaultTemplate: StoryFn<FooterProps> = (args) => {
    return (
        <div style={{position: 'absolute', bottom: 0, width: '100%'}}>
            <Footer {...args} />
        </div>
    );
};

export const Simple = DefaultTemplate.bind({});

Simple.args = data.simple as FooterProps;

export const Underline = DefaultTemplate.bind({});

Underline.args = data.underline as FooterProps;

const RichTemplate: StoryFn<FooterProps> = (args) => {
    return (
        <div style={{position: 'absolute', bottom: 0, width: '100%'}}>
            <Footer {...args} media={{position: 'left', md: 6, item: 'Custom media content'}} />
        </div>
    );
};

export const Enriched = RichTemplate.bind({});

Enriched.args = data.rich as FooterProps;

const RichRightTemplate: StoryFn<FooterProps> = (args) => {
    return (
        <div style={{position: 'absolute', bottom: 0, width: '100%'}}>
            <Footer {...args} media={{position: 'right', md: 6, item: 'Custom media content'}} />
        </div>
    );
};

export const EnrichedWithRightMedia = RichRightTemplate.bind({});

EnrichedWithRightMedia.args = data.rich as FooterProps;
