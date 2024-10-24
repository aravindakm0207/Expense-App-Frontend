import { SET_EXPENSES, REMOVE_EXPENSE, ADD_EXPENSE, SET_EXPENSE_ERRORS, SET_EDIT_EXPENSE_ID, UPDATE_EXPENSE } from "../actions/expenses-action";

const initialState = {
    data: [],
    serverErrors: [], 
    editExpenseId: null
};

const expensesReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_EXPENSES: {
            return { ...state, data: action.payload };
        }
        case REMOVE_EXPENSE: {
            return { ...state, data: state.data.filter(ele => ele._id !== action.payload) };
        }
        case ADD_EXPENSE: {
            return { ...state, data: [...state.data, action.payload] };
        }
        case SET_EXPENSE_ERRORS: {
            return { ...state, serverErrors: action.payload };
        }
        case SET_EDIT_EXPENSE_ID: {
            return { ...state, editExpenseId: action.payload };
        }
        case UPDATE_EXPENSE: {
            return { 
                ...state, 
                data: state.data.map(ele => 
                    ele._id === action.payload._id ? { ...action.payload } : ele 
                )
            };
        }
        default: {
            return { ...state };
        }
    }
};

export default expensesReducer;
