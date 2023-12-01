import React, {useEffect, useState} from 'react';
import {StoryFn, StoryContext} from '@storybook/react';
import {UIKIT_ROOT_CLASS} from '../../src/constants';
import {Theme} from '@gravity-ui/page-constructor';

export const withTheme = (Story: StoryFn, context: StoryContext) => {
    const [prevTheme, setPrevTheme] = React.useState(context.globals.theme);
    const theme = context.globals.theme;

    const updateBodyClassName = (newTheme: Theme) => {
        const bodyEl = document.body;

        if (!bodyEl.classList.contains(UIKIT_ROOT_CLASS)) {
            bodyEl.classList.add(UIKIT_ROOT_CLASS);
        }

        bodyEl.classList.toggle(`${UIKIT_ROOT_CLASS}_theme_light`, newTheme === Theme.Light);
        bodyEl.classList.toggle(`${UIKIT_ROOT_CLASS}_theme_dark`, newTheme === Theme.Dark);
    };

    useEffect(() => {
        if (theme !== prevTheme) {
            updateBodyClassName(theme);
        }

        return () => {
            if (theme !== prevTheme) {
                setPrevTheme(theme);
            }
        };
    }, [theme, prevTheme]);

    useEffect(() => {
        updateBodyClassName(theme);
        // need to render only once
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Story {...context} />;
};
