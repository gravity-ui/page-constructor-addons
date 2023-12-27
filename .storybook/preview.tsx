import '../styles/storybook/index.scss';
import '@gravity-ui/uikit/styles/styles.scss';
import '@gravity-ui/page-constructor/styles/styles.scss';

import {MobileProvider, Platform} from '@gravity-ui/uikit';
import {Theme} from '@gravity-ui/page-constructor';

import React from 'react';
import {MINIMAL_VIEWPORTS} from '@storybook/addon-viewport';
import type {Decorator, Preview} from '@storybook/react';
import {withMobile} from './decorators/withMobile';
import {withLang} from './decorators/withLang';
import {withTheme} from './decorators/withTheme';
import {DocsDecorator} from './decorators/docs';
import {themeLight} from './theme/light';

import {configure, Lang} from '../src/utils/configure';

import '../styles/styles.scss';

configure({
    lang: Lang.En,
});

const withContextProvider: Decorator = (Story, context) => {
    const theme = context.globals.theme;

    // to set theme in docs
    context.parameters.backgrounds.default = theme;
    context.globals.backgrounds = {
        value: theme === Theme.Light ? 'white' : 'black',
    };
    context.globals.background = theme;

    return (
        <MobileProvider mobile={false} platform={Platform.BROWSER}>
            <Story {...context} />
        </MobileProvider>
    );
};

const preview: Preview = {
    decorators: [withLang, withMobile, withTheme, withContextProvider],
    parameters: {
        layout: 'fullscreen',
        docs: {
            theme: themeLight,
            container: DocsDecorator,
        },
        jsx: {showFunctions: true}, // to show function in sources
        viewport: {
            viewports: MINIMAL_VIEWPORTS,
        },
        backgrounds: {
            default: 'light',
            values: [
                {name: 'light', value: 'white'},
                {name: 'dark', value: 'rgba(45, 44, 51, 1)'},
            ],
        },
    },
    globalTypes: {
        theme: {
            name: 'Theme',
            description: 'Global theme for components',
            defaultValue: 'light',
            toolbar: {
                items: [
                    {value: 'light', icon: 'circle', title: 'Light'},
                    {value: 'dark', icon: 'circlehollow', title: 'Dark'},
                ],
            },
        },
        lang: {
            name: 'Language',
            defaultValue: 'en',
            toolbar: {
                icon: 'globe',
                items: [
                    {value: 'ru', right: '🇷🇺', title: 'Ru'},
                    {value: 'en', right: '🇺🇸', title: 'En'},
                ],
            },
        },
        platform: {
            name: 'Platform',
            defaultValue: 'desktop',
            toolbar: {
                items: [
                    {value: 'desktop', title: 'Desktop', icon: 'browser'},
                    {value: 'mobile', title: 'Mobile', icon: 'mobile'},
                ],
            },
        },
    },
};

export default preview;
