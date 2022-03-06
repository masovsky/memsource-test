import axios from 'axios';
import React from 'react';
import { render } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Settings from '../Settings';
import "@testing-library/jest-dom/extend-expect";

beforeEach(() => {
    library.add(fas);
});

jest.mock('react-redux', () => {
    const origModule = jest.requireActual('react-redux');
    return {
        __esModule: true,
        ...origModule,
        useDispatch: jest.fn(),
    };
});

jest.mock('axios');

describe('Settings Tests', () => {

    let dispatch;

    beforeEach(() => {
        dispatch = jest.fn();
        useDispatch.mockReturnValue(dispatch);
        axios.get.mockResolvedValue(null);
    });

    it('should render Loading in Settings', () => {
        const { container } = render(
            <Settings />,
        );
        expect(container.textContent).toEqual("Loading...")
    });

    it('should render name and password in Settings', async () => {
        const mockedResponse = {
            data: { "name": "aaa", "password": "bbb" },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        };
        axios.get.mockResolvedValueOnce(mockedResponse);
        const { findByText } = render(<Settings />);
        expect(await findByText("Name")).toBeInTheDocument();
        expect(await findByText("Password")).toBeInTheDocument();
    });
});
