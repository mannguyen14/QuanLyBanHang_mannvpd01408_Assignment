var busyIndicatorLSP= null;


function wlCommonInit(){
	/*
	 * Use of WL.Client.connect() API before any connectivity to a MobileFirst Server is required.
	 * This API should be called only once, before any other WL.Client methods that communicate with the MobileFirst Server.
	 * Don't forget to specify and implement onSuccess and onFailure callback functions for WL.Client.connect(), e.g:
	 *
	 *    WL.Client.connect({
	 *    		onSuccess: onConnectSuccess,
	 *    		onFailure: onConnectFailure
	 *    });
	 *
	 */

	// Common initialization code goes here
	busyIndicatorLSP = new WL.BusyIndicator(null,{text:'Waiting ...'});

	
	// Tab Loai San Pham
	$('#btnresetLSP').click(doResetLSP);
	$('#btnCancelLSP').click(doResetUpdateLSP);
	$('#btnaddLSP').click(doAddBusyIndicatorLSP);
	$('#btnagreeLSP').click(doUpdateLSP);
	//showlist();
}

//function doReset(){
//
//	var id = $('#MaKH').val("");
//	var name = $('#TenKH').val("");
//	var dc =$('#DiaChi').val("");
//	var sdt =$('#SoDT').val("");
//	Materialize.toast('Clear !!!', 1500, 'rounded');
//}
//
//function doResetUpdate(){
//	var id = $('#MaKH1').val("");
//	var name = $('#TenKH1').val("");
//	var dc =$('#DiaChi1').val("");
//	var sdt =$('#SoDT1').val("");
//	$('#modal1').closeModal();
//}
//// Add student
//function doAddBusyIndicator(){
//	busyIndicator.show();
//	setTimeout(function(){
//		busyIndicator.hide();
//		doAdd();
//	},1000);
//}
//function doAdd(){
//	var id = $('#MaKH').val();
//	var name = $('#TenKH').val();
//	var dc =$('#DiaChi').val();
//	var sdt =$('#SoDT').val();
//	if(id ==""){
//		dialogcheck();
//		$('#MaKH').focus();
//	}else if(name ==""){
//		dialogcheck();
//		$('#TenKH').focus();
//	}else if(dc ==""){
//		dialogcheck();
//		$('#birthday').focus();
//	}else if(sdt ==""){
//		dialogcheck();
//		$('#SoDT').focus();
//	}else {
//
//        var dialogtile = "Question !";
//        var dialogtext = "Are you sure add ?";
//        WL.SimpleDialog.show(dialogtile, dialogtext, [{
//            text: 'Ok',
//            handler: function() {
//                var invocationData = {
//                    adapter: 'ManagerStudent',
//                    procedure: 'addManagerStudent',
//                    parameters: [id, name, dc, sdt]
//                };
//                WL.Client.invokeProcedure(invocationData, {
//                    onSuccess: loadSQLQueerySuccess,
//                    onFailure: loadSQLQueeryFailure
//                });
//
//
//
//                function loadSQLQueerySuccess() {
//                	Materialize.toast('Add Successfull !!!', 2000, 'rounded');
//                    showlist();
//                }
//
//                function loadSQLQueeryFailure() {
//                    var dialogtile = "Question !";
//                    var dialogtext = "Add failure, ID must unique !";
//                    WL.SimpleDialog.show(dialogtile, dialogtext, [{
//                        text: 'Ok',
//                    }]);
//                };
//            }
//        }, {
//            text: 'cancel',
//            handler: function() {}
//        }]);
//
//
//    }
//}
////Show student list
//function showlist(){
//
//	var invocationData = {
//			adapter : 'ManagerStudent',
//			procedure : 'getManagerStudents',
//			parameters : []
//			};
//	var options = {
//			onSuccess : loadSqlSuccess,
//			onFailure : loadSqlFailure
//
//			};
//	WL.Client.invokeProcedure(invocationData,options);
//
//	function loadSqlSuccess(result){
//		displaylist(result.invocationResult.resultSet);
//	}
//	function loadSqlFailure(){
//		alert("fail");
//	}
//	function displaylist(items){
//		
//		
//		var li="";
//		$("#listst").empty();
//		var ranIcon = new Array();
//		ranIcon = ['face','grade','insert_emoticon','perm_identity','stars','child_care','spa','sentiment_very_dissatisfied','star_half','school','whatshot','cake','ac_unit'];
//		for(var i=0; i<items.length;i++){
//
//			li += '<ul class="collapsible popout" data-collapsible="expandable"><li><div class="collapsible-header"><i class="material-icons">'+ranIcon[randInt(0, ranIcon.length-1)]+'</i> Tên Khách Hàng : '+items[i].TenKH+'</div>'+
//				'<div class="collapsible-body">'+
//					'<p>'+"Mã Khách Hàng : "+items[i].MaKH+'<br/>'+"Địa Chỉ : "+
//					items[i].DiaChi+'<br/>'+"Số Điện Thoại : "+
//					items[i].SoDienThoai+'</p>'+
//					'<div align="center">'+
//					'<button class="waves-effect waves-light btn" onclick="dodelete('+items[i].MaKH+')" style="margin-right:15px; margin-bottom:18px; border-radius:5px; text-transform: none;">Delete</button>'+
//					'<button data-target="modal1"  class="mui-btn mui-btn--small btn modal-trigger btn"  style="margin-bottom:17px; border-radius:5px; text-transform: none;" id="btnupdate" >Update</button>'+
//					'</div'+
//					'</div>'+
//				'</div>'+
//			'</ul>';
//		}
//		$("#listst").append(li);
//		$(document).ready(function(){
//		    $('.collapsible').collapsible({
//		      accordion : false
//		    });
//		  });
//		$('.modal-trigger').leanModal();
//
//	}
//	//Function random icon
//	function randInt(min, max){
//		return Math.floor(Math.random()*(max - min + 1)+min);
//	}
//}
//
////Delete student
//function dodelete(MaKH){
//	
//	
//	
//	 var dialogtile = "Question ?";
//	    var dialogtext = "Are you sure delete student ! ";
//	    WL.SimpleDialog.show(dialogtile, dialogtext, [
//	    {
//	        text: 'OK',
//	        handler: function (){
//	        	
//	        	var invocationData = {
//	        			adapter : 'ManagerStudent',
//	        			procedure : 'deleteManagerStudent',
//	        			parameters : [MaKH]
//	        			};
//
//	        	WL.Client.invokeProcedure(invocationData,{
//	        		onSuccess : loadSQLQueerySuccess, 
//	        		onFailure : loadSQLQueeryFailure 
//	        	});
//
//	        	function loadSQLQueerySuccess(){
//	        		Materialize.toast('Delete Successfull !!!', 2000, 'rounded');
//
//	        		showlist();
//	        	}
//	        	function loadSQLQueeryFailure(){
//	        		var dialogtile = "Question !";
//                    var dialogtext = "Delete fail !";
//                    WL.SimpleDialog.show(dialogtile, dialogtext, [{
//                        text: 'Ok',
//                    }]);
//	        	}
//	        }
//	    },
//	    {
//	    	text: 'cancel',
//	    	handler: function (){}
//	    }]);
//
//	
//
//}
//
//
////Update all
//
//$("#btnupdate").click(function() {
//	var index = $(this).parents("li").index();
//	var idStudent = $(this).parents("li").find('a')
//			.siblings("span1").text();
//
//	$(this).parents("li").append(
//					"<div id='modal1' style='overflow:hidden; height:100%'class='modal'> <div class='modal-content' style='padding:0px'> <div style='padding-top:5px;padding-bottom:5px; background:#E0E0E0' align='center'> <h5 style='font-size:22px'>   Update Student</h5> </div><div style='padding-right:25px; padding-left:25px; margin-top:25px'>  <form ><div class='mui-textfield'><input type='text' id='name1'><label>Input Name</label></div>"
//							+ "<div class='mui-textfield'><input type='text' id='class1'><label>Input class</label></div> <div class='mui-textfield'><input type='text' id='date1'><label>Input date</label></div>  "
//							+ "<div class='mui-textfield'><input type='text' id='phone1'><label>Input phone</label></div></form></div> </div><button href='#!' class='mui-btn mui-btn--small  mui-btn--primary' style='margin-left:22px' onclick='validForm2("
//							+ idStudent
//							+ ")'>Agree</button></div>");
//
//	$('.modal-trigger').leanModal();
//
//});
//
//
//
////check form2 update
////function checkform(){
////
////}
//
////Update student
//function doUpdate(){
//
//	var id1 = $('#MaKH1').val();
//	var name1 = $('#TenKH1').val();
//	var dc1 =$('#DiaChi1').val();
//	var sdt1 =$('#SoDT1').val();
//	if(id1 ==""){
//		dialogcheck();
//		$('#MaKH1').focus();
//	}else if(name1 ==""){
//		dialogcheck();
//		$('#TenKH1').focus();
//	}else if(dc1 ==""){
//		dialogcheck();
//		$('#DiaChi1').focus();
//	}else if(sdt1 ==""){
//		dialogcheck();
//		$('#SoDT1').focus();
//	}else{
//
//		var invocationData = {
//				adapter : 'ManagerStudent',
//				procedure : 'updateManagerStudent',
//				parameters : [name1,dc1,sdt1,id1]
//				};
//
//		WL.Client.invokeProcedure(invocationData,{
//			onSuccess : loadSQLQueerySuccess1, 
//			onFailure : loadSQLQueeryFailure1 
//		});
//
//		function loadSQLQueerySuccess1(){
//
//			Materialize.toast('Update Successfull !!!', 2000, 'rounded');
//			showlist();
//			$('#modal1').closeModal();
//		}
//		function loadSQLQueeryFailure1(){
//			var dialogtile ="Question ?";
//			var dialogtext ="Update fail !";
//			WL.SimpleDialog.show(dialogtile, dialogtext,[
//			         {
//			        	 text:'Ok',
//			         }
//			]);
//		}
//	}
//}
//
//
//function dialogcheck() {
//    var dialogtile = "Question ?";
//    var dialogtext = "Please input full information !!! ";
//    WL.SimpleDialog.show(dialogtile, dialogtext, [{
//        text: 'OK',
//    }]);
//}
//


// Tab Loai San Pham
function doResetLSP(){
	var id = $('#MaLSP').val("");
	var name = $('#TenLSP').val("");
	Materialize.toast('Clear !!!', 1500, 'rounded');
}

//Tab Loai San Pham
