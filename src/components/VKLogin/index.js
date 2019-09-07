import React, { PropTypes, Component } from 'react';
import styles from './vk.css';

class VKLogin extends Component 
{
	state = 
	{
		isSdkLoaded: false,
		isProcessing: false,
	};

	componentDidMount() 
	{
		switch(this.props.value)
		{
			case "vk":
				if (document.getElementById('vk-jssdk')) 
				{
				  this.sdkLoaded();
				  return;
				}
				this.loaVKdSdkAsynchronously();
				this.setVKAsyncInit();
				break;
			case "google":
				if (document.getElementById('goo-jssdk')) 
				{
				  this.sdkLoaded();
				  return;
				}
				this.loaGoogleSdkAsynchronously();
				break;
			case "facebook-f":
				if (document.getElementById('fb-jssdk')) 
				{
				  this.sdkLoaded();
				  return;
				}
				this.loaFacebookSdkAsynchronously();
				break;
		}
	}
	sdkLoaded() 
	{
		this.setState({ isSdkLoaded: true });
	}

	setVKAsyncInit() 
	{
		const { apiId } = this.props;
		window.vkAsyncInit = () => 
		{
			window.VK.init({ apiId });
			this.setState({ isSdkLoaded: true });
		};
	}
	loaVKdSdkAsynchronously() 
	{
		const el	= document.createElement('script');
		el.type 	= 'text/javascript';
		el.src 		= 'https://vk.com/js/api/openapi.js?162';
		el.async 	= true;
		el.id 		= 'vk-jssdk';
		document.getElementsByTagName('head')[0].appendChild(el);
	}
	checkVKLoginState = (response) => 
	{
		this.setState({ isProcessing: false });
		//console.log( response );
		window.VK.Api.call(
			"users.get",
			{uid:response.session.user.id, scope:"photo_100,contacts,email",  fields:"photo_100,contacts,email", v:"5.101."},
			r =>
			{
				if (response.status === 'connected') // авторизация прошла успешно
				{ 
					if (this.props.callback) 
					{
						r.response[0].href = r.response[0].id;
						r.response[0].display_name = r.response[0].first_name + " " + r.response[0].last_name;
						r.response[0].avatar_uri = r.response[0].photo_100;
						r.response[0].email = r.response[0].id + "@vk.com";
						r.response[0].oauth_type = "vk";
						this.props.callback(r.response[0]);			
					}
				}
			});
	};

	
	/* Google */
	
	loaGoogleSdkAsynchronously() 
	{
		const el	= document.createElement('script');
		el.type 	= 'text/javascript';
		el.src 		= 'https://apis.google.com/js/platform.js?onload=init';
		el.async 	= true;
		el.defer 	= true;
		el.id 		= 'goo-jssdk';
		el.ind		= this
		document.getElementsByTagName('head')[0].appendChild(el);
		el.onload = function()
		{
			//console.log("Goo loaded");
			this.ind.checkGoogleLoginState();
		}
	}
	checkGoogleLoginState = () => 
	{
		const { apiId } = this.props;
		//this.setState({ isProcessing: false });
		window.gapi.load("auth2", () => 
		{
			console.log( "gapi loaded" );
			window.gapi.auth2.init({
				client_id: apiId + ".apps.googleusercontent.com"//"664390345555-pjv9ul6tksdf048d3hi16cim6n4cebqf.apps.googleusercontent.com"
			})
				.then( 
					data => 
					{
						//console.log( data );
						this.setState({ isSdkLoaded: true });
					},
					error => console.log(error)
					
				)
		});
		//
		//
	}
	
		
	/* Facebook */
	
	loaFacebookSdkAsynchronously() 
	{
		const el	= document.createElement('script');
		el.type 	= 'text/javascript';
		el.src 		= 'https://connect.facebook.net/ru_RU/sdk.js';
		el.async 	= true;
		el.defer 	= true;
		el.id 		= 'fb-jssdk';
		el.ind		= this;
		document.getElementsByTagName('head')[0].appendChild(el);
		el.onload = function()
		{
			//console.log("FB loaded" );
			this.ind.checkFacebookLoginState()
		}
	}
	checkFacebookLoginState = () => 
	{
		const { apiId } = this.props;
		//console.log( window.FB );
		window.FB.init({
			appId            : apiId,//'142986035743966',
			autoLogAppEvents : true,
			xfbml            : true,
			version          : 'v4.0'
		});
		 window.FB.getLoginStatus(function(response) 
		 {
			//console.log(response);
		});
	}
	
	click = () => 
	{
		//console.log(this.props.value);
		if (!this.state.isSdkLoaded || this.state.isProcessing || this.props.disabled) 
		{
			return;
		}
		this.setState({ isProcessing: true });
		switch(this.props.value)
		{
			case "vk":
				window.VK.Auth.login( this.checkVKLoginState, this.props.apiId );
				break;
			case "google":
				const googleAuth = window.gapi.auth2.getAuthInstance();
				googleAuth.signIn( )
					.then( 
						user => {
							//console.log(user);
							const googleUser = user.getBasicProfile();
							if (this.props.callback) 
							{
								const response = {
									oauth_type		: "google",
									href			: googleUser.getEmail().split("@")[0],
									id 				: googleUser.getId(),
									display_name	: googleUser.getName(),
									first_name		: googleUser.getGivenName(),
									last_name		: googleUser.getFamilyName(),
									avatar_uri		: googleUser.getImageUrl(),
									email			: googleUser.getEmail(),
									
								}
								this.props.callback( response );			
							}
						},
						error => console.log(error)
					)
				break;
		}
	};


	render() {
		const { disabled, callback, apiId, ...buttonProps } = this.props;
		return this.props.fill ?
			<div
				{...buttonProps}
				className="soc vk"
				style={{...this.props.style, width:250, }}
				onClick={this.click}
				value={this.props.value}
			>
				<i className={"pr-2 fab fa-" + this.props.value} style={{width:"auto", left:10}}/>
				<span style={{position: "absolute", left: 40, top: 10, fontSize: ".8em" }}>
					{this.props.text}
				</span>
			</div>
			:
			<div
				{...buttonProps}
				className="soc vk"
				style={this.props.style}
				onClick={this.click}
				value={this.props.value}
			>
				<i className={"fab fa-" + this.props.value} />
			</div>
	}
}

export default VKLogin;
