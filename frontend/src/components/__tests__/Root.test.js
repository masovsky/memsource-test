import React from 'react';
import { render } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import Root from '../Root';

jest.mock('react-redux', () => {
    const origModule = jest.requireActual('react-redux');
    return {
        __esModule: true,
        ...origModule,
        useDispatch: jest.fn(),
    };
});

describe('Root Tests', () => {

    let dispatch;

    beforeEach(() => {
        dispatch = jest.fn();
        useDispatch.mockReturnValue(dispatch);
    });

    it('should render without crashing', () => {
        render(
            <Root />,
        );
    });
});
