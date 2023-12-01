import React from 'react';

import {block} from '../../utils/cn';

import './DummyComponent.scss';

const b = block('dummy-component');

export interface DummyComponentProps {
    text: string;
    qa?: string;
}

export const DummyComponent = ({text, qa}: DummyComponentProps) => (
    <div className={b()} data-qa={qa}>
        {text}
    </div>
);
