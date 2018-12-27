/* @flow */
import logger from "redux-logger";
import {get_status} from "../index"
import {createStore, applyMiddleware} from "redux";
import {getCookie} from "../components/FmRUAppExt";
import * as TYPES from "../components/types";
import {_fetch} from "../api";
const _state = {
	data:{},
	code:"none",
	args:{},
}
/*
FLUX standart action
{type:STRING, payload:...}
*/
const _action = {
	type: "NONE",
	data:{members:[]},
	gfilters:[],
	ganres:[],
	name:"",
	id:-1,
	error:false
}

function rootReducer(state=_state, action=_action)
{
	let code = "started";
	switch(action.type)
	{
		case TYPES.NONE:
			return;
		case TYPES.STARTED:	
			var lass = getCookie("l");
			var l = lass ? lass.split("&") : [] ;
			var log ="";
			var psw = "";
			if(l.length)
			{
				log = l[0];
				psw = l[1];
			}
			_fetch( "page", 0, log, psw, {} )
				.then( data => {
					window.is_loader = false;
					store.dispatch({ type: TYPES.LOAD_PAGE, data:data });
				});		
			return {...state, ...{code: "none", data:action.data}};
		case TYPES.START_LOAD_PAGE:	
			_fetch( action.code, action.args, action.log, action.psw, action.data )
				.then( data => {
					window.is_loader = false;
					store.dispatch({ type: TYPES.LOAD_PAGE, data:data });
				});	
			return state;
		case TYPES.LOAD_PAGE:
			state = {...state, ...{code: action.data.code, data:action.data}};
			return state;
			//return {...state, ...{code: resp.code, data: resp.data}};
			
		case TYPES.GANRE_FILTER:
			return {...state, ...{code: code}};
		default:
			return state;
	}
}
var store = get_status() == "local" ? createStore(rootReducer, applyMiddleware(logger)) : createStore( rootReducer );
//var store = createStore(rootReducer);
export default store;