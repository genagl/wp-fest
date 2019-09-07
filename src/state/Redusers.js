/* @flow */

import logger from "redux-logger";
import {get_status} from "../index"
import {createStore, applyMiddleware} from "redux";
import {setCookie, getCookie} from "../components/FmRUAppExt";
import * as TYPES from "../components/types";
import {_fetch} from "../api";
const _state = {
	data:{},
	code:"none",
	args:{},
}
//window.fmru_member = -1;
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
	//console.log(action.type);
	let code = "started";
	switch(action.type)
	{
		case TYPES.NONE:
			return;
		case TYPES.LOGIN:
			//console.log("LOgin");
			_fetch( "login", action.args, log, psw, {} )
				.then( data => {
					window.is_loader = false;
					//store.dispatch({ type: TYPES.LOAD_PAGE, data:data });
				});		
			return {...state, ...{code: "none", data:action.data}};
			break;
		case TYPES.STARTED:	
			var lass = getCookie("l");
			var l = lass ? lass.split("&") : [] ;
			var log ="";
			var psw = "";
			if( window.fmru_member )
			{
				var page = "fmru_player";
				var id = window.fmru_member;
			}
			else
			{
				var page = "page";
				var id = 0;
			}
			if(l.length)
			{
				log = l[0];
				psw = l[1];
			}
			_fetch( page, id, log, psw, {} )
				.then( data => {
					window.is_loader = false;
					store.dispatch({ type: TYPES.LOAD_PAGE, data:data });
				});		
			return {...state, ...{code: "none", data:action.data}};
		case TYPES.START_LOAD_PAGE:	
			//console.log(action);
			_fetch( action.code, action.args, action.log, action.psw, action.data )
				.then( data => {
					console.log(data);
					if(data.token)
					{
						setCookie("token", data.token, {expires:4 * 3600});
					}
					window.is_loader = false;
					store.dispatch({ type: TYPES.LOAD_PAGE, data:data });
				});	
			return state;
		case TYPES.LOAD_PAGE:
			state = {...state, ...{code: action.data.code, data:action.data}};
			return state;			
		case TYPES.GANRE_FILTER:
			return {...state, ...{code: code}};
		default:
			return state;
	}
}
var store = get_status() !== "local" ? createStore(rootReducer, applyMiddleware(logger)) : createStore( rootReducer );
//var store = createStore(rootReducer);
export default store;
