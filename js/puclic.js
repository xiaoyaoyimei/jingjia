// JavaScript Documentss
(function($) {
	//重写jquery的ajax方法  
	var _ajax = $.ajax;
	 
	$.ajax = function(opt) {
		// 如果是文件上传，则不出现
		if (opt.iframeSrc) {
		 _ajax(opt);
		 return;
		} 
		//备份opt中error和success方法  
		var fn = {
			error: function(XMLHttpRequest, textStatus, errorThrown) {},
			success: function(data, textStatus) {},
			beforeSend: function() {}
		}
		if (opt.error) {
			fn.error = opt.error;
		}
		if (opt.success) {
			fn.success = opt.success;
		}

		//扩展增强处理  
		var _opt = $.extend(opt, {
			beforeSend: function() {
				//成功回调方法增强处理  
				JINJIANG.Global.loadinghide();
				JINJIANG.Global.loading();

			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				//错误方法增强处理  
				JINJIANG.Global.loadinghide();
				fn.error(XMLHttpRequest, textStatus, errorThrown);
			},
			success: function(data, textStatus) {
				//成功回调方法增强处理  
				JINJIANG.Global.loadinghide();
				fn.success(data, textStatus);
			}
		});
		return _ajax(_opt);
	};
})(jQuery);

var JINJIANG = window.JINJIANG || {};
(function($) {

	try {
		jQuery.extend(jQuery.fn.dataTable.defaults, {
			"searching": false,
			"ordering": false,
			'lengthChange': false,
			"processing": false,
			'serverSide': true,
			'pageLength': 10,
			"autoWidth": false,
			//"stateSave":true,
			"language": {
				'emptyTable': '没有数据',
				"lengthMenu": "Display _MENU_ records per page",
				"zeroRecords": "记录为空",
				"info": "显示第  _PAGE_ 页,总页数  _PAGES_ 页",
				"infoEmpty": "记录为空",
				"infoFiltered": "(filtered from _MAX_ total records)",
				"paginate": {
					"first": "第一页",
					"last": "最后一页",
					"next": "下一页",
					"previous": "上一页"
				}
			}
		});
	} catch (e) {}
	JINJIANG.Global = {
		scrollTop: function() {
			$('html, body').animate({
				scrollTop: 0
			}, 0);
		},
		loading: function(option, param) {
			var loading = $('<div class="loading-wrap"><div class="loadingimg"></div></div><div class="loading"></div>');
			$('body').append(loading);
		},
		loadinghide: function() {
			$('.loading-wrap').remove();
			$('.loading').remove();
		},
		errorhint: function(data) {
			content = data.content;
			type = data.type;
			if (type == "error") {
				var loading = $('<div class="errorhint-wrap"><div class="mes-error-hint"><i class="fa fa-exclamation-circle"></i>' + content + '</div></div>');

			} else if(type == "success"){
				var loading = $('<div class="errorhint-wrap"><div class="mes-success-hint"><i class="fa fa-check-circle-o"></i>' + content + '</div></div>');
			} else{
				var loading = $('<div class="errorhint-wrap"><div class="mes-info-hint"><i class="fa fa-comment-o"></i>' + content + '</div></div>');
			}
			
			$('body').append(loading);
			setTimeout("$('.errorhint-wrap').remove()", 2000);

		},
		Errormessage: function(title, object) {
			var _this = $(object);
			var _parents = _this.parent();
			if(_parents.children("em").length>0)
				{
				_parents.children("em").text(title);
				}
			else{
				_parents.addClass('error-pr').append('<em class=error-message>' + title + '</em>')
			}
		},
		Errormessagehide:function(object){
			var _this = $(object);
			var _parents = _this.parent();
			_parents.removeClass('error-pr');
		},

		Pophide: function() {
			$(".modal").remove();
			$('.modal-backdrop').remove();
			$('body').removeClass('modal-open');
			$('body').removeAttr("style");
		},
		Popupwindow: function(data) {
			content = data.content;
            JINJIANG.Global.Pophide();
			var h = $(document).height();
			var modal = $('<div  class="modal fade in" ></div>');
			var modalbackdrop = $('<div class="modal-backdrop fade in" ></div>');
			$('body').append(modalbackdrop);
			$('body').addClass("modal-open");
			$('body').css({
				'padding-right': '17px'
			});
			$('body').append(modal);
			var modaldialog = $('<div class="modal-dialog">'+content+'</div>');
			$('.modal').append(modaldialog);	
			$('.modal-backdrop').css({
				"height": h + 'px'
			});
			$('.modal-dialog').show();
			$('.modal').show();
			$(".mod-close").click(function() {
				JINJIANG.Global.Pophide();
			});
			return $('.modal');
		},
		Operationalprompt:function(data){
			title=data.title;
			content=data.content;
			ok_callback=data.ok_callback;
			var _modal="";
			_modal=_modal+"<div class='modal-backdrop fade in'></div><div  class='modal fade in' ><div class='modal-dialog ' role='document'><div class='modal-content w340'><div class='modal-header'><input type='button' data-dismiss='modal' aria-label='Close' class='icon icon-close mod-close'><h4 class='modal-title' id='myModalLabel'>"+title+"</h4></div>"
			_modal=_modal+"<div class='modal-body'><img src='../statics/img/icon/ico-warning.png' class='mr10' /><span class='font-14'>"+content+"</span></div><div class='modal-footer text-center'> <button class='btn-f btn-blue  mr10 delete' type='button'> 确定</button> <button data-dismiss='modal' class='btn-f btn-default-f   mod-close' type='button'>取消</button></div></div>"		
			$("body").append(_modal);
			$('.modal').show();		
			$('.mod-close').click(function(){
				JINJIANG.Global.Pophide();
			});	
			$('.delete').click(function(){
				ok_callback();
				JINJIANG.Global.Pophide();
			});	
			
		},
		/**
		 * 请求url，加载到指定的元素中
		 * 
		 * @param modalwidth 非必填 弹窗宽度样式 
		 * @param title 标题 
		 * @param hcontent 页面内容
		 * @param param 非必填 请求后台方法参数 
		 * @param dataType 请求类型
		 * @param pathContent 请求路劲
		 * @param showCancel 是否包含取消按钮 true 是
		 *  @param btn 非必填 界面按钮组 
		 *  modalwidth,title,hcontent,param,dataType,pathContent,showCancel,btn
		 
		 */
     opencustomwindow:function(data){
    	   modalwidth= (null === data.modalwidth || undefined === data.modalwidth)?"":data.modalwidth;
		   title=data.title;
		   hcontent= (null === data.hcontent || undefined === data.hcontent)?"":data.hcontent;
		   param = (null === data.param || undefined === data.param) ? {}: data.param;
		   dataType=data.dataType;
		   pathContent= (null === data.pathContent || undefined === data.pathContent)?"":data.pathContent;
		   showCancel=data.showCancel;
		   btn=(null === data.btn || undefined === data.btn) ?[]:data.btn;
		   if(dataType=="post"){
				   jQuery.ajax({
					    async: false, 
						url: pathContent,
						type: dataType,
						data: param,
						timeout: 3000,
						success: function(r, textStatus) {
							hcontent=r;
							},
						   error: function() {
									alert("页面加载失败!");
									}
							});
			     }
			   else if(dataType=='text'){
				   hcontent= hcontent;
			   }else {
				   hcontent=$.load(pathContent);
				   }
		   //实例化modal
		   JINJIANG.Global.Pophide();
			var h = $(document).height();
			var modal = $('<div  class="modal fade in" ></div>');
			var modalbackdrop = $('<div class="modal-backdrop fade in" ></div>');
			$('body').append(modalbackdrop);
			$('body').addClass("modal-open");
			$('body').css({
				'padding-right': '17px'
			});
			$('body').append(modal);
			if($.trim(modalwidth)!="")
				{
				var modelcontentclass="modal-content "+modalwidth;
				}
			else{
				var modelcontentclass=" modal-content ";
			}
			var  modaldialog  = '<div class="'+modelcontentclass+'"><div class="modal-header"><input type="button" data-dismiss="modal" aria-label="Close" class="icon icon-close mod-close"> <h4 class="modal-title" id="myModalLabel">'+title+'</h4> </div><div class="modal-body">'+hcontent+'</div><div class="modal-footer clearfix text-center">';    
			if(btn.length>0){
		      for (var i=0;i<btn.length;i++){
		    	  var _temp = $('<button data-index='+i+' class="'+btn[i].classes+'" type="button" >'+btn[i].text+'</button>');
		    	  modaldialog +=_temp.prop("outerHTML");
			  }
		   }
	     if(showCancel){
				  modaldialog+='<button data-dismiss="modal" class="btn-f btn-default-f  mod-close" type="button">取消</button>';
				  }
		   modaldialog+='</div>';
			$('.modal').append(modaldialog);
			 modal.find('button').not('.mod-close').click(function(e){
				
				 var index = $(this).data('index');
				 btn[index]&&btn[index].callback&&btn[index].callback.call(this,arguments);
	    	  });
			$('.modal-backdrop').css({
				"height": h + 'px'
			});
			$('.modal-dialog').show();
			$('.modal').show();
			$(".mod-close").click(function() {
				JINJIANG.Global.Pophide();
			});
			return $('.modal');
			},
	
        		
        	

		openwindow: function(data) {
			url = data.url;
			content = data.data;
			var popupdata = {
				content: ''
			};
			jQuery.ajax({
				url: url,
				type: "POST",
				data: content || {},
				timeout: 3000,
				success: function(data, textStatus) {
					console.log(data);
					popupdata.content = data;
					JINJIANG.Global.Popupwindow(popupdata);
				},
				error: function() {
					alert("页面加载失败!");
				}
			});

		},
		
		/**
		 * 请求url，加载到指定的元素中
		 * 
		 * @param param.url 必填，请求的地址
		 * @param param.data 非必填，参数
		 * @param param.selector 必填，容器,url对应的jsp将会加载到这个容器中
		 */
		loadContent : function(param) {
			param.data = (null === param.data || undefined === param.data) ? {}: param.data;
			
			jQuery.ajax({
	            contentType : "application/x-www-form-urlencoded; charset=UTF-8",
	            url : param.url,
	            type : "post",
	            dataType : "html",
	            data : param.data,
	            traditional: true,
	            error : function(jqXHR, textStatus, errorThrown){
	                alert(jqXHR);
	            },
	            success : function(result) {
	            	if (param.selector && param.selector.length > 0) {
	            		param.selector.html(result);
	            	}
	            }
	        });
		}

	}
})(window.jQuery);

$(function() {

	if ($('.page-homepage').length > 0) {

		$(window).scroll(function() {
			if ($(window).scrollTop() > 150) {
				$(".gotoback").fadeIn(1000);
				$(".header").addClass('affix');
			} else {
				$(".header").removeClass('affix');
				$(".gotoback").fadeOut(1000);
			}
		});
		$('.gotoback').click(function() {
			JINJIANG.Global.scrollTop();
		});
	}

	/*TAB切换*/
	$('.TAB-content>div:not(:first-child)').hide();
	$('.TAB li').click(function() {
		var _index = $(this).index();
		$(this).addClass('active');
		$(this).siblings().removeClass('active');
		var _thistabcontent = $(this).parent().next('.TAB-content');
		_thistabcontent.children().eq(_index).show().siblings().hide();
	});
	$('.icon-drop-down-arrow').click(function() {
		$(this).parent().toggleClass('scaling');
	});
	$('.tb td .simulate-cbox-wrap').click(function() {
		$(this).toggleClass('checked');

	});
	$('.tb th .simulate-cbox-wrap').click(function() {
		$(this).toggleClass('checked');

		$(this).parents('.tb').find('td .simulate-cbox-wrap').toggleClass('checked');
	});
$("body").on('click', ".radio-wrap", function () {
		
		if ($(this).hasClass('checked')) {
			$(this).removeClass('checked');

		} else {

			$(this).parent().find('.radio-wrap').removeClass('checked');
			$(this).addClass('checked');
		}
	});
	$('.fg-edit').click(function() {
		var _parent = $(this).parents('.assessment-detile-left');
		$(this).parents('.assessment-detile-left').hide();
		_parent.next('.assessment-detile-left').show();
	});
	$('.assessment-save .fg-save').click(function() {
		var _parent = $(this).parents('.assessment-detile-left');
		$(this).parents('.assessment-detile-left').hide();
		_parent.prev('.assessment-detile-left').show();
	});
	$('.MENU >li a').click(function() {
		var _parent=$(this).parent();
		if ( _parent.hasClass('active')) {
			 _parent.removeClass('active');
			 _parent.find('ul').slideUp();
		} else {
			 _parent.addClass('active');
			 _parent.siblings().removeClass('active')
			 _parent.find('ul').slideDown();
		}
	});
	$('.dynamic-content .fa-chevron-down').click(function() {
		$(this).prev().toggle();
	});
	$('.btn-reply').click(function() {
		$(this).next().toggle();
	});
	$('.mail-content .btn-new-mail').click(function() {
		var _paernts = $(this).parents('.mail-content');
		$(this).parents('.mail').hide();
		_paernts.find('.new-mail').show();
	});
	$('.show-mail-detail').click(function() {
		var _paernts = $(this).parents('.mail-content');
		$(this).parents('.mail').hide();
		_paernts.find('.mail-detail').show();
	});
});