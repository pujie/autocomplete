/*
 * by Puji W Prayitno (puji@padi.net.id)
 * PadiNET -- Surabaya 2014
 * License : GPL v 3
 * */
$.fn.autocomp = function(options){
	var settings = $.extend({
		data:'',
		},options);
	var liSelected;
	$(this).bind('keyup',function(e){
		thiselement = $(this);
		code = e.which;
		if((code!==40)&&(code!==38)&&(code!==13)){
			thiselement.parent().find('ul#padiDropDown').empty();
			$.each(settings.data,function(key,val){
				if(val.indexOf(thiselement.val())>=0){
					thiselement.parent().find('ul#padiDropDown').append('<li key='+key+' class="padiLiSuggestion">'+val+'</li>');
					$('.padiLiSuggestion').bind('mouseover',function(){
						$(this).addClass('selected');
					});
					$('.padiLiSuggestion').bind('mouseout',function(){
						$(this).removeClass('selected');
					});
					$('.padiLiSuggestion').bind('click',function(){
						thiselement.val($(this).text());
						thiselement.attr('key',$(this).attr('key'));
						thiselement.parent().find('ul#padiDropDown').empty();
					});
				}
			});
		}
		if(code===13){
			ss = thiselement.parent().find('ul#padiDropDown li.selected');
			thiselement.val(ss.text());
			thiselement.attr('key',ss.attr('key'));
			thiselement.parent().find('ul#padiDropDown').empty();
		}
	});
	$(this).bind('keydown',function(e){
		thiselement = $(this);
		li = thiselement.parent().find('ul#padiDropDown li');
		code = e.which;
		if(code===40){
			if(liSelected){
				liSelected.removeClass('selected');
				next = liSelected.next();
				if(next.length > 0){
					liSelected = next.addClass('selected');
				}else{
					liSelected = li.eq(0).addClass('selected');
				}
			}else{
				liSelected = li.eq(0).addClass('selected');				
			}
		}else	if(code===38){
			if(liSelected){
				liSelected.removeClass('selected');
				next = liSelected.prev();
				if(next.length > 0){
					liSelected = next.addClass('selected');
				}else{
					liSelected = li.last().addClass('selected');
				}
			}else{
				liSelected = li.last().addClass('selected');
			}
		}
	});
	$(this).parent().append('<ul id="padiDropDown"></ul>');
}
