import { createStore, combineReducers, applyMiddleware} from 'redux'
import { thunk } from 'redux-thunk'
import categoriesReducer from '../reducers/categories-reducer'
import expensesReducer from '../reducers/expenses-reducer'
//import userReducer from '../reducers/user-reducer'

const configureStore = () => { 
    const store = createStore(combineReducers({
       // user: userReducer, 
        categories: categoriesReducer,
        expenses: expensesReducer
    }), applyMiddleware(thunk))
    return store 
}

export default configureStore