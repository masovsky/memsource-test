import { render } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

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

describe('App Tests', () => {

    let store;
    let dispatch;

    beforeEach(() => {
        store = createStore(rootReducer);
        dispatch = jest.fn();
        useDispatch.mockReturnValue(dispatch);
    });

    it('renders without crashing', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            </Provider>,
        );
    });
});