import { createStore, applyMiddleware } from 'redux'    
import createSagaMiddleware from 'redux-saga'
import papayaRepairAppPartner from './reducers/index'    
import persistState from 'redux-localstorage'    
import rootSaga from 'sagas'
import { composeWithDevTools} from 'redux-devtools-extension'

const sagaMiddleware = createSagaMiddleware()

const enhancer = composeWithDevTools(
    applyMiddleware(sagaMiddleware),
    persistState()
)    

const store = createStore(papayaRepairAppPartner, enhancer)    
sagaMiddleware.run(rootSaga)
export { store }
