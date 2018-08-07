import get_url from "../index"
import {MD5, base64_encode, base64_decode} from "../components/FmRUAppExt"

export function _fetch( code, args, log, psw, data )
{
	code = !code ? "page" : code;
	var headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	};
	if(window.auth)
	{
		headers.Authorization = 'Basic ' + window.auth; 
	}
	else if(log && psw)
	{
		const xxx = base64_encode( log+':'+psw ); // Z2VuYWdsOnphcTEyd3M=
		headers.Authorization = 'Basic ' + xxx; 
	}
	return fetch(get_url() + '/wp-json/get_main/' + code,
	{
		method: 'POST',
		headers: headers,
		body: JSON.stringify({
			code: code,
			args: args,
			gfilter: data.gfilter,
			mpp: data.mpp,
		})
	} ) 
		.then((r) => {
			//console.log(r);
			const res = r.json();
			//console.log(res);
			return res;
			}
		);
		
}