//IMPORT ALL REDUCERS
import {combineReducers} from 'redux';


const loggedinReducer = (state=false, action) => {
    switch(action.type){
        case "LOGIN":
            return true;  
        case "LOGOUT":
            return false;
        default:
            return state;
    }
}

const loginReducer = (state=null, action) => {
    //console.log("USER REDUCER CALL ", action.type, " ", USER.LOAD_SUCCESS);
    if (action.type === 'LOGIN'){
        return action.token;
    }
    else if (action.type === 'LOGOUT'){
        return null
    }
    return state;
}

const menuReducer = (state={}, action) => {
    if (action.type === 'MENU')
    {
        return action.menu
    }
    return state
}


const vegReducer = (state=true, action) => {
    switch(action.type){
        case "VEG":
            return action.veg;
        default:
            return state;
    }
}

const staffReducer = (state=false, action) => {
    switch(action.type){
        case "ISSTAFF":
            return action.isStaff;
        default:
            return state;
    }
}

const addMealsReducer = (state=[], action) => {
    switch(action.type){
        case "AVAIL":
            return action.meal;
        default:
            return state;
    }
}


const allReducers = combineReducers({
    //list of all reducers here
    isLoggedIn: loggedinReducer,
    veg: vegReducer,
    isStaff: staffReducer,
    token: loginReducer,
    menu: menuReducer,
    meals: addMealsReducer
})

export default allReducers;