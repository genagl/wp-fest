 var glob_alert = {};
 var jssor_slider2;
 function a_alert(text, exec_title=-1, title='Attantion' )
 {
	jQuery(function($)
	{
		$("#titleModal").text(__(title));
		$("#contentModal").html(text);
		if(exec_title != -1)
		{
			$("#enterModal").removeClass("hidden");
			$("#enterModal").click( function(){
				window["sending"]( glob_alert ); 
			});
		}
		else
		{
			$("#enterModal").addClass("hidden");
		}
		$("#emptyModal").modal("show");
	})
 };
function updateQueryStringParam(key, value) 
{
	baseUrl = [location.protocol, '//', location.host, location.pathname].join('');
	if(key=="") 
	{
		window.history.replaceState({}, "", baseUrl);
		return baseUrl;
	}
	urlQueryString = document.location.search;
	var newParam = key + '=' + value,
	params = '?' + newParam;

	// If the "search" string exists, then build params from it
	if (urlQueryString) 
	{
		keyRegex = new RegExp('([\?&])' + key + '[^&]*');
		// If param exists already, update it
		if (urlQueryString.match(keyRegex) !== null) 
		{
			params = urlQueryString.replace(keyRegex, "$1" + newParam);
		} else 
		{ // Otherwise, add it to end of query string
			params = urlQueryString + '&' + newParam;
		}
  }
  window.history.replaceState({}, "", baseUrl + params);
}
 var __ = function( text )
 {
	return voc[text] ? voc[text] : text;
 }
 var sending = function(data)
 {
	console.log(data);
	data.descr = jQuery("#descr").val();
	send( [ data.send, data ] );
	jQuery(".modal").modal('hide');
 }
jQuery(document).ready(function($)
{	
	$(".admin_panel").height($(window).height()-80);
	//set_jssor_slider();
	$(".nav.nav-tabs > li > a").live({click:function(evt)
	{
		$(".nav.nav-tabs > li").removeClass("active");
		$(this).parent().addClass("active");
	}});
	$('#emptyModal').on('hidden.bs.modal', function (e) 
	{
		//alert(glob_alert.old_raiting);
		if(glob_alert.raiting == 3)
		{
			jQuery( "[name=" + glob_alert.name + "][value='" + glob_alert.old_raiting + "']" ).prop("checked", true);
		}
	})
	$("._alert").live({mousedown:function(evt)
	{
		$(this).removeClass("_alert");
	}})
	$(".frmru_login").live({click:function(evt)
	{
		$("._alert").removeClass("_alert");
		
		if($("#ftell").val() == "")
		{
			$("#ftell").addClass("_alert");
			return;
		}
		if($("#fsecret").val() == "")
		{
			$("#fsecret").addClass("_alert");
			return;
		}
		send(["login", $("#ftell").val(), $("#fsecret").val(),  $("#femail").val()]);
		$("#ftell").val("");
		$("#fsecret").val("");
		$("#femail").val("");
	}})	
	$(".fill_critery").live({click:function(evt)
	{
		send( [ "fill_critery" ] );
	}})
	$(".save_setting").live({mousedown:function(evt)
	{
		send( [ "save_setting", {
			"secret": $("#fsecret").val(), 
			"is_started": $("#is_started").is(":checked")? 1: 0 ,
			"logotype_0" : $("[name='logotype_0']").val(),
			"default_member_thrumb" : $("[name='default_member_thrumb0']").val()
		} ] );
	}})
	$("#insert_expert_critery").live({mousedown:function(evt)
	{
		var cat = $("[name='choose_cat']:checked" ).val();
		var title = $("#new_critery_text").val();
		var alerted = [];
		if(title == "")
		{
			alerted.push($("#new_critery_text"));
		}
		if(cat == undefined )
		{
			alerted.push($("#select_new_cat"));
			//a_alert(__("Select category please"));
			//return;
		}
		if(alerted.length > 0)
		{
			for(var i=0; i<alerted.length; i++)
			{
				alerted[i].addClass("_alert");
			}
			return;
		}
		send( [ "insert_expert_critery", cat, title]);
	}})
	$("input[type=radio].srait").live({change:function(evt)
	{
		
		glob_alert = {};
		glob_alert.send = "single_raiting";
		glob_alert.raiting = $(this).val();
		glob_alert.old_raiting = $(this).parents("[old_raiting]").attr("old_raiting");	
		glob_alert.member_id = $(this).parents("[member_id]").attr("member_id");
		glob_alert.critery_id = $(this).parents("[critery_id]").attr("critery_id");	
		glob_alert.name = $(this).attr("name");
		if($(this).val()>2)
		{
			a_alert('<textarea rows=6 id="descr"></textarea>', "sending", 'Send description');
			return;
		}
		if($(this).val()<3)
			send( [ "single_raiting", glob_alert ] );
		glob_alert.old_raiting = $(this).val();
		$(this).parents("[old_raiting]").attr("old_raiting", $(this).val());	
	}});
	
	$("#set_expert_discr").live({click:function(evt)
	{
		var expert_descr = $("#expert_descr").val();
		var member_id = $(this).parents("[member_id]").attr("member_id");
		if(expert_descr == "")
		{
			a_alert(__("Set text"));
			return;
		}
		send( [ "set_expert_discr", expert_descr, member_id ] );
	}});
	$("[role_user_id]").live({change:function(evt)
	{
		send( [ "role_user_expert", $(this).attr("role_user_id"), $(this).is(":checked") ? 1:0, $(this).attr("role") ] );
	}});
	
	
	//admin
	$("[cid][eid]").live({change:function(evt)
	{
		var eid = $(this).attr("eid");
		var dist = "[exid=" + eid + "]";
		var ee = new Array(eid);
		$("[cid][eid=" + eid + "]").each(function(num, elem)
		{
			ee.push($(elem).attr("cid") + "." + $(elem).val());
		});
		$(dist).val( ee.join());
		//var val = ($(this).val());
	}});
	
	
	$("[data-fmru_type]").live({click:function(evt)
	{
		$(this)
			.append($(get_updatee())
				.hide()
					.fadeIn("fast"));
		var type 		= $(this).attr("data-fmru_type");
		var args 		= $(this).attr("data-args").split('|');
		var slide_id 	= $(this).parents("[slide_id]").attr("slide_id");
		send([ 'frmru_slide', { slide_id:slide_id,  type:type, args:args } ]);
	}});
	$("[frmru_type]").live({click:function(evt)
	{
		
		var type 		= $(this).attr("frmru_type");
		var args 		= $(this).attr("frmru_args").split('|');
		var slide_id 	= $(this).parents("[slide_id]").attr("slide_id");
		$(this)
			.append($(get_updatee())
				.hide()
					.fadeIn("fast"));
		send([ 'frmru_slide', { slide_id:slide_id,  type:type, args:args } ]);
	}});
	
	var prefix;
	var cur_upload_id = 1;
	$( ".my_image_upload" ).click(function() 
	{
		var cur_upload_id = $(this).attr("image_id");
		prefix = $(this).attr("prefix");// "pic_example";
		var downloadingImage = new Image();
		downloadingImage.cur_upload_id = cur_upload_id;
		on_insert_media = function(json)
		{
			//alert(json.id);
			$( "#" + prefix +"_media_id" + cur_upload_id ).val(json.id);
			downloadingImage.onload = function()
			{								
				$("#" + prefix + this.cur_upload_id).empty().append("<img src=\'"+this.src+"\' width='auto' height='200'>");
				$("#" + prefix + this.cur_upload_id).css({"height":"200px", "width":"400px"});
				
			};
			downloadingImage.src = json.url;		
			//
		}
		open_media_uploader_image();						
	});
	$( ".my_image_upload" ).each(function(num,elem)
	{
		prefix = $(this).attr("prefix");// "pic_example";
		$( elem ).height( $("#" + prefix  + $(elem).attr("image_id")).height() + 0);
	})
	
	
	
	
	
	
	
})
var frmru_slide = function( $slide_id, $content, id_disp )
{
	(jQuery)(function($)
	{
		var cont = $slide_id ? "[slide_id=" + $slide_id + "]" : "body > #main > #cont";
		if(!$(cont).length) cont = $("body > #main > #cont");
		if(id_disp)
			$(cont)
				.empty()
					.hide()
						.append($content)
							.fadeIn(1000);
		else
			$(cont)
				.empty()
					.append($content)
						.scrollTop(0);
		if($("[slide_id=" + $slide_id + "] .modal.fade").size())
		{
			var id = $("[slide_id=" + $slide_id + "] .modal.fade").attr("id");
			$("body>#" + id).detach();
			$("body").append($("[slide_id=" + $slide_id + "] .modal.fade"));
		}
		$(window).scrollTop(0);
	});
}
var set_jssor_slider = function()
{
	(jQuery)(function($)
	{
		if(!$("#mfcc").size()) return;		
		var options = {
			$DragOrientation: 1,   
			$AutoPlay: 0,
			$AutoPlaySteps: 1,
			$AutoPlayInterval: 4000,
			$PauseOnHover: 1,
			$PlayOrientation: 1,
			$UISearchMode: 1,
			 $DisplayPieces: 1, 
			
			/*	*/	
			$NavigatorOptions: {                                //[Optional] Options to specify and enable navigator or not
				$Class: $JssorNavigator$,                       //[Required] Class to create navigator instance
				$ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
				$AutoCenter: 1,                                 //[Optional] Auto center navigator in parent container, 0 None, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
				$Steps: 1,                                      //[Optional] Steps to go for each navigation request, default value is 1
				$Lanes: 1,                                      //[Optional] Specify lanes to arrange items, default value is 1
				$SpacingX: 5,                                 //[Optional] Horizontal space between each item in pixel, default value is 0
				$SpacingY: 10,                                  //[Optional] Vertical space between each item in pixel, default value is 0
				$Orientation: 1                                 //[Optional] The orientation of the navigator, 1 horizontal, 2 vertical, default value is 1
			},
			$DirectionNavigatorOptions: {
				$Class: $JssorDirectionNavigator$,              //[Requried] Class to create direction navigator instance
				$ChanceToShow: 2                                //[Required] 0 Never, 1 Mouse Over, 2 Always
			}
			
		};
		var ww = $(window).width() > 1140 ? 1140 : $(window).width();
		$("#mfcc").width(ww);
		$("#mfcc").height($(window).height() - (is_admin ? 35 :0));
		$("#mfcc [u='slides']").hide();
		$("#mfcc [u='slides']").width(ww);
		$("#mfcc [u='slides']").height($(window).height() - (is_admin ? 35 :0) );
		jssor_slider2 = new $JssorSlider$("mfcc", options);
		$("#mfcc [u='slides']").fadeIn(1000);
		
	});
}
 
var media_uploader = null;
function open_media_uploader_image()
{
    media_uploader = wp.media({
        frame:    "post", 
        state:    "insert", 
        multiple: false
    });
    media_uploader.on("insert", function()
	{
        var json = media_uploader.state().get("selection").first().toJSON();

        var image_url = json.url;
        var image_caption = json.caption;
        var image_title = json.title;
		on_insert_media(json);
    });
    media_uploader.open();
}

var get_updatee = function()
{
	return '<div class="updatee"><svg width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-sync fa-w-16 fa-spin"><path fill="#FFFFFF"  stroke="white" stroke-width="0"  d="M440.935 12.574l3.966 82.766C399.416 41.904 331.674 8 256 8 134.813 8 33.933 94.924 12.296 209.824 10.908 217.193 16.604 224 24.103 224h49.084c5.57 0 10.377-3.842 11.676-9.259C103.407 137.408 172.931 80 256 80c60.893 0 114.512 30.856 146.104 77.801l-101.53-4.865c-6.845-.328-12.574 5.133-12.574 11.986v47.411c0 6.627 5.373 12 12 12h200.333c6.627 0 12-5.373 12-12V12c0-6.627-5.373-12-12-12h-47.411c-6.853 0-12.315 5.729-11.987 12.574zM256 432c-60.895 0-114.517-30.858-146.109-77.805l101.868 4.871c6.845.327 12.573-5.134 12.573-11.986v-47.412c0-6.627-5.373-12-12-12H12c-6.627 0-12 5.373-12 12V500c0 6.627 5.373 12 12 12h47.385c6.863 0 12.328-5.745 11.985-12.599l-4.129-82.575C112.725 470.166 180.405 504 256 504c121.187 0 222.067-86.924 243.704-201.824 1.388-7.369-4.308-14.176-11.807-14.176h-49.084c-5.57 0-10.377 3.842-11.676 9.259C408.593 374.592 339.069 432 256 432z"></path></svg></div>';
}



var send = function (params)
{
	console.log(params);
		/*
	cur_send = params[0];
	jQuery(function($)
	{
		$("body").append("<div id='waiting-fon'></div>");
		$("#waiting-fon").hide().fadeIn('fast');
		clearmuarr		= setInterval(function()
		{
			clearInterval(clearmuarr);
			$("#waiting-fon").fadeOut('slow').detach();
			
		}, 15000);
	});
		*/
	jQuery.post	(
		myajax.url,
		{
			action	: 'myajax',
			nonce	: myajax.nonce,
			params	: params
		},
		function( response ) 
		{
			console.log(response);
			try
			{
				var dat		= JSON.parse(response);
			}
			catch(e)
			{
				//console.log("Error");
				//jQuery("#waiting-fon").fadeOut('slow').detach();
				return;
			}
			//alert(dat);
			var command	= dat[0];
			var datas	= dat[1];
			//console.log(command);
			switch(command)
			{
				case "login":
					jQuery(".modal").modal('hide');
					if(datas['text'])
						alert(datas['text']);
					if(datas['redirect'])
						document.location.href = document.location;
					break;	
				case "set_expert_discr":
					jQuery("#my_comment").html(datas['experts_descr']);
					break;	
				case "frmru_slide":
					frmru_slide( datas['slide_id'], datas['content'], datas['id_disp'], datas['url_key'], datas['url_val'] );
					updateQueryStringParam( datas['url_key'], datas['url_val'] ); 
					jQuery("[frmru_type] > .updatee").detach();
					break;	
				case "single_raiting":
					jQuery("#_valuations").text(datas['raiting']);
					var otm = Math.round(datas['raiting']);
					if(otm>8) otm = 8;
					jQuery("#_raiting").text(otm);
					jQuery( "[name=" + datas['text'].name + "][value='" + datas['text'].raiting + "']" ).prop("checked", true);
					//jQuery("h4[cat_id=" + datas['cat_id'] + "]").text( datas['cat_raiting'] );
					break;				
				default:
					var customEvent = new CustomEvent("_send_", {bubbles : true, cancelable : true, detail : dat})
					document.documentElement.dispatchEvent(customEvent);					
					break;
			}
			
			if(datas['exec'] && datas['exec'] != "")
			{
				window[datas['exec']](datas['args']);
			}
			if(datas['a_alert'])
			{
				a_alert(datas['a_alert']);
			}
		}		
	);
} 