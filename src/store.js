import {createStore, applyMiddleware} from "redux";
import {mainReducer} from "./redusers/Redusers";
import * as TYPES from "./components/types";


var store = createStore(mainReducer);
//var store = createStore(mainReducer, applyMiddleware(logger));

export default store;