import React from 'react';

import {render, screen} from '@testing-library/react';

import {DummyComponent} from '..';

const testId = 'dummy';

const props = {
    text: 'This is a test',
};

describe('Author', () => {
    test('Render component by default', async () => {
        render(<DummyComponent {...props} qa={testId} />);
        const object = screen.getByTestId(testId);
        expect(object).toBeInTheDocument();
    });
});
