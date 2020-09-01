import { createStore, applyMiddleware, compose } from 'redux';
import allReducers from './../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSage from './../sagas'

const configStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        allReducers,
        compose(
            applyMiddleware(sagaMiddleware)
            //,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        ),
    );
    sagaMiddleware.run(rootSage);
    return store;
}

export default configStore;