var busyIndicator= null;


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
	busyIndicator = new WL.BusyIndicator(null,{text:'Waiting ...'});
	showlist();
	showlistLSP();
	showlist_SanPham();
	showlist_HoaDon();
	//   Khach Hang
	$('#btnreset').click(doReset);
	$('#btnCancel').click(doResetUpdate);
	$('#btnadd').click(doAddBusyIndicator);
	$('#btnagree').click(doUpdate);

	
	//   Loai San Pham
	$('#btnresetLSP').click(doResetLSP);
	$('#btnCancelLSP').click(doResetUpdateLSP);
	$('#btnaddLSP').click(doAddBusyIndicatorLSP);
	
	
	//  San Pham
	$('#btnreset_SanPham').click(doReset_SanPham);
	$('#btnCancel_SanPham').click(doResetUpdate_SanPham);
	$('#btnadd_SanPham').click(function(){
		doAddBusyIndicator_SanPham();
	});
	
	
	//   Hoa Don
	$('#btnreset_HoaDon').click(doReset_HD);
	$('#btnCancel_HoaDon').click(doResetUpdate_HD);
	$('#btnadd_HoaDon').click(doAddBusyIndicator_HD);
	
}

// Khach Hang

function doReset(){

	var id = $('#MaKH').val("");
	var name = $('#TenKH').val("");
	var dc =$('#DiaChi').val("");
	var sdt =$('#SoDT').val("");
	Materialize.toast('Clear !!!', 1500, 'rounded');
}

function doResetUpdate(){
	var id = $('#MaKH1').val("");
	var name = $('#TenKH1').val("");
	var dc =$('#DiaChi1').val("");
	var sdt =$('#SoDT1').val("");
	$('#modal1').closeModal();
}
function doAddBusyIndicator(){
	busyIndicator.show();
	setTimeout(function(){
		busyIndicator.hide();
		doAdd();
	},1000);
}
function doAdd(){
	var id = $('#MaKH').val();
	var name = $('#TenKH').val();
	var dc =$('#DiaChi').val();
	var sdt =$('#SoDT').val();
	if(id ==""){
		dialogcheck();
		$('#MaKH').focus();
	}else if(name ==""){
		dialogcheck();
		$('#TenKH').focus();
	}else if(dc ==""){
		dialogcheck();
		$('#birthday').focus();
	}else if(sdt ==""){
		dialogcheck();
		$('#SoDT').focus();
	}else {

        var dialogtile = "Question !";
        var dialogtext = "Are you sure add ?";
        WL.SimpleDialog.show(dialogtile, dialogtext, [{
            text: 'Ok',
            handler: function() {
                var invocationData = {
                    adapter: 'ManagerStudent',
                    procedure: 'addManagerStudent',
                    parameters: [id, name, dc, sdt]
                };
                WL.Client.invokeProcedure(invocationData, {
                    onSuccess: loadSQLQueerySuccess,
                    onFailure: loadSQLQueeryFailure
                });



                function loadSQLQueerySuccess() {
                	Materialize.toast('Add Successfull !!!', 2000, 'rounded');
                    showlist();
                }

                function loadSQLQueeryFailure() {
                    var dialogtile = "Question !";
                    var dialogtext = "Add failure, ID must unique !";
                    WL.SimpleDialog.show(dialogtile, dialogtext, [{
                        text: 'Ok',
                    }]);
                };
            }
        }, {
            text: 'cancel',
            handler: function() {}
        }]);


    }
}

function showlist(){

	var invocationData = {
			adapter : 'ManagerStudent',
			procedure : 'getManagerStudents',
			parameters : []
			};
	var options = {
			onSuccess : loadSqlSuccess,
			onFailure : loadSqlFailure

			};
	WL.Client.invokeProcedure(invocationData,options);

	function loadSqlSuccess(result){
		displaylist(result.invocationResult.resultSet);
	}
	function loadSqlFailure(){
		alert("fail");
	}
	function displaylist(items){
		
		
		var li="";
		$("#listst").empty();
		var ranIcon = new Array();
		ranIcon = ['face','grade','insert_emoticon','perm_identity','stars','child_care','spa','sentiment_very_dissatisfied','star_half','school','whatshot','cake','ac_unit'];
		for(var i=0; i<items.length;i++){

			li += '<ul class="collapsible popout" data-collapsible="expandable"><li><div class="collapsible-header"><i class="material-icons">'+ranIcon[randInt(0, ranIcon.length-1)]+'</i> Tên Khách Hàng : '+items[i].TenKH+'</div>'+
				'<div class="collapsible-body">'+
					'<p>'+"Mã Khách Hàng : "+items[i].MaKH+'<br/>'+"Địa Chỉ : "+
					items[i].DiaChi+'<br/>'+"Số Điện Thoại : "+
					items[i].SoDienThoai+'</p>'+
					'<div align="center">'+
					'<button class="waves-effect waves-light btn" onclick="dodelete('+items[i].MaKH+')" style="margin-right:15px; margin-bottom:18px; border-radius:5px; text-transform: none;">Delete</button>'+
					'<button data-target="modal1"  class="mui-btn mui-btn--small btn modal-trigger btn"  style="margin-bottom:17px; border-radius:5px; text-transform: none;" id="btnupdate" >Update</button>'+
					'</div'+
					'</div>'+
				'</div>'+
			'</ul>';
		}
		$("#listst").append(li);
		$(document).ready(function(){
		    $('.collapsible').collapsible({
		      accordion : false
		    });
		  });
		$('.modal-trigger').leanModal();

	}
	//Function random icon
	function randInt(min, max){
		return Math.floor(Math.random()*(max - min + 1)+min);
	}
}


function dodelete(MaKH){

	 var dialogtile = "Question ?";
	    var dialogtext = "Are you sure delete ! ";
	    WL.SimpleDialog.show(dialogtile, dialogtext, [
	    {
	        text: 'OK',
	        handler: function (){
	        	
	        	var invocationData = {
	        			adapter : 'ManagerStudent',
	        			procedure : 'deleteManagerStudent',
	        			parameters : [MaKH]
	        			};

	        	WL.Client.invokeProcedure(invocationData,{
	        		onSuccess : loadSQLQueerySuccess, 
	        		onFailure : loadSQLQueeryFailure 
	        	});

	        	function loadSQLQueerySuccess(){
	        		Materialize.toast('Delete Successfull !!!', 2000, 'rounded');

	        		showlist();
	        	}
	        	function loadSQLQueeryFailure(){
	        		var dialogtile = "Question !";
                    var dialogtext = "Delete fail !";
                    WL.SimpleDialog.show(dialogtile, dialogtext, [{
                        text: 'Ok',
                    }]);
	        	}
	        }
	    },
	    {
	    	text: 'cancel',
	    	handler: function (){}
	    }]);

	

}


//Update all

$("#btnupdate").click(function() {
	var index = $(this).parents("li").index();
	var idKH = $(this).parents("li").find('a')
			.siblings("span1").text();

	$(this).parents("li").append(
					"<div id='modal1' style='overflow:hidden; height:100%'class='modal'> <div class='modal-content' style='padding:0px'> <div style='padding-top:5px;padding-bottom:5px; background:#E0E0E0' align='center'> <h5 style='font-size:22px'>   Update Student</h5> </div><div style='padding-right:25px; padding-left:25px; margin-top:25px'>  <form ><div class='mui-textfield'><input type='text' id='name1'><label>Input Name</label></div>"
							+ "<div class='mui-textfield'><input type='text' id='class1'><label>Input class</label></div> <div class='mui-textfield'><input type='text' id='date1'><label>Input date</label></div>  "
							+ "<div class='mui-textfield'><input type='text' id='phone1'><label>Input phone</label></div></form></div> </div><button href='#!' class='mui-btn mui-btn--small  mui-btn--primary' style='margin-left:22px' onclick='validForm2("
							+ idKH
							+ ")'>Agree</button></div>");

	$('.modal-trigger').leanModal();

});


function doUpdate(){

	var id1 = $('#MaKH1').val();
	var name1 = $('#TenKH1').val();
	var dc1 =$('#DiaChi1').val();
	var sdt1 =$('#SoDT1').val();
	if(id1 ==""){
		dialogcheck();
		$('#MaKH1').focus();
	}else if(name1 ==""){
		dialogcheck();
		$('#TenKH1').focus();
	}else if(dc1 ==""){
		dialogcheck();
		$('#DiaChi1').focus();
	}else if(sdt1 ==""){
		dialogcheck();
		$('#SoDT1').focus();
	}else{

		var invocationData = {
				adapter : 'ManagerStudent',
				procedure : 'updateManagerStudent',
				parameters : [name1,dc1,sdt1,id1]
				};

		WL.Client.invokeProcedure(invocationData,{
			onSuccess : loadSQLQueerySuccess1, 
			onFailure : loadSQLQueeryFailure1 
		});

		function loadSQLQueerySuccess1(){

			Materialize.toast('Update Successfull !!!', 2000, 'rounded');
			showlist();
			$('#modal1').closeModal();
		}
		function loadSQLQueeryFailure1(){
			var dialogtile ="Question ?";
			var dialogtext ="Update fail !";
			WL.SimpleDialog.show(dialogtile, dialogtext,[
			         {
			        	 text:'Ok',
			         }
			]);
		}
	}
}







function dialogcheck() {
    var dialogtile = "Question ?";
    var dialogtext = "Please input full information !!! ";
    WL.SimpleDialog.show(dialogtile, dialogtext, [{
        text: 'OK',
    }]);
}




//Khach Hang





//  Loai San Pham
function doResetLSP(){
	var id = $('#MaLSP').val("");
	var name = $('#TenLSP').val("");
	Materialize.toast('Clear !!!', 1500, 'rounded');
}

function doResetUpdateLSP(){
	var id = $('#MaLSP1').val("");
	var name = $('#TenLSP1').val("");
	$('#modal2').closeModal();
}

function doAddBusyIndicatorLSP(){
	busyIndicator.show();
	setTimeout(function(){
		busyIndicator.hide();
		doAddLSP();
	},1000);
}

function doAddLSP(){
	var id = $('#MaLSP').val();
	var name = $('#TenLSP').val();

	if(id ==""){
		dialogcheck();
		$('#MaLSP').focus();
	}else if(name ==""){
		dialogcheck();
		$('#TenLSP').focus();
	}else {

        var dialogtile = "Question !";
        var dialogtext = "Are you sure add ?";
        WL.SimpleDialog.show(dialogtile, dialogtext, [{
            text: 'Ok',
            handler: function() {
                var invocationData = {
                    adapter: 'ManagerStudent',
                    procedure: 'addManagerLoaiSanPham',
                    parameters: [id, name]
                };
                WL.Client.invokeProcedure(invocationData, {
                    onSuccess: loadSQLQueerySuccessLSP,
                    onFailure: loadSQLQueeryFailureLSP
                });

                function loadSQLQueerySuccessLSP() {
                	Materialize.toast('Add Successfull !!!', 2000, 'rounded');
                	showlistLSP();
                }
                function loadSQLQueeryFailureLSP() {
                    var dialogtile = "Question !";
                    var dialogtext = "Add failure, ID must unique !";
                    WL.SimpleDialog.show(dialogtile, dialogtext, [{
                        text: 'Ok',
                    }]);
                };
            }
        }, {
            text: 'cancel',
            handler: function() {}
        }]);
    }
}


function showlistLSP(){

	var invocationData = {
			adapter : 'ManagerStudent',
			procedure : 'getManagerLoaiSP',
			parameters : []
			};
	var options = {
			onSuccess : loadSqlSuccessLSP,
			onFailure : loadSqlFailureLSP

			};
	WL.Client.invokeProcedure(invocationData,options);

	function loadSqlSuccessLSP(result){
		displaylistLSP(result.invocationResult.resultSet);
	}
	function loadSqlFailureLSP(){
		alert("fail");
	}
	function displaylistLSP(items){
		
		
		var li="";
		$("#list_LSP").empty();
		var ranIcon = new Array();
		ranIcon = ['face','grade','insert_emoticon','perm_identity','stars','child_care','spa','sentiment_very_dissatisfied','star_half','school','whatshot','cake','ac_unit'];
		for(var i=0; i<items.length;i++){

			li += '<ul class="collapsible popout" data-collapsible="expandable"><li><div class="collapsible-header"><i class="material-icons">'+ranIcon[randInt(0, ranIcon.length-1)]+'</i> Tên Loại Sản Phẩm : '+items[i].TenLoaiSP+'</div>'+
				'<div class="collapsible-body">'+
					'<p>'+
					"Mã Loại Sản Phẩm : "+items[i].MaLSP+'<br/>'+
					'</p>'+
					'<div align="center">'+
					'<button class="waves-effect waves-light btn" onclick="dodelete_LSP('+items[i].MaLSP+')" style="margin-right:15px; margin-bottom:18px; border-radius:5px; text-transform: none;">Delete</button>'+
					'<a class="modal-trigger waves-effect waves-light btn"   style="margin-right:15px; margin-bottom:18px; border-radius:5px; text-transform: none; " href="#modal2">Update</a>'+
					'</div'+
					'</div>'+
				'</div>'+
			'</ul>';
		}
		$("#list_LSP").append(li);
		$(document).ready(function(){
		    $('.collapsible').collapsible({
		      accordion : false
		    });
		  });
		$('.modal-trigger').leanModal();

	}
	//Function random icon
	function randInt(min, max){
		return Math.floor(Math.random()*(max - min + 1)+min);
	}
}

function dodelete_LSP(MaLSP){
	
	
	
	 var dialogtile = "Question ?";
	    var dialogtext = "Are you sure delete ! ";
	    WL.SimpleDialog.show(dialogtile, dialogtext, [
	    {
	        text: 'OK',
	        handler: function (){
	        	
	        	var invocationData = {
	        			adapter : 'ManagerStudent',
	        			procedure : 'deleteManagerLoaiSanPham',
	        			parameters : [MaLSP]
	        			};

	        	WL.Client.invokeProcedure(invocationData,{
	        		onSuccess : loadSQLQueerySuccess, 
	        		onFailure : loadSQLQueeryFailure 
	        	});

	        	function loadSQLQueerySuccess(){
	        		Materialize.toast('Delete Successfull !!!', 2000, 'rounded');
	        		showlistLSP();
	        	}
	        	function loadSQLQueeryFailure(){
	        		var dialogtile = "Question !";
                   var dialogtext = "Delete fail !";
                   WL.SimpleDialog.show(dialogtile, dialogtext, [{
                       text: 'Ok',
                   }]);
	        	}
	        }
	    },
	    {
	    	text: 'cancel',
	    	handler: function (){}
	    }]);

}




function doUpdateLSP(){

	var ma_lsp = $('#MaLSP1').val();
	var ten_lsp = $('#TenLSP1').val();
	if(ma_lsp ==""){
		dialogcheck();
		$('#MaLSP1').focus();
	}else if(ten_lsp ==""){
		dialogcheck();
		$('#TenLSP1').focus();
	}else{

		var invocationData = {
				adapter : 'ManagerStudent',
				procedure : 'updateManagerLoaiSP',
				parameters : [ten_lsp ,ma_lsp]
				};

		WL.Client.invokeProcedure(invocationData,{
			onSuccess : loadSQLQueerySuccess1, 
			onFailure : loadSQLQueeryFailure1 
		});

		function loadSQLQueerySuccess1(){

			Materialize.toast('Update Successfull !!!', 2000, 'rounded');
			showlistLSP();
			$('#modal2').closeModal();
		}
		function loadSQLQueeryFailure1(){
			var dialogtile ="Question ?";
			var dialogtext ="Update fail !";
			WL.SimpleDialog.show(dialogtile, dialogtext,[
			         {
			        	 text:'Ok',
			         }
			]);
		}
	}
}




// Loai San Pham






// San Pham
function doReset_SanPham(){
	var id = $('#MaSPP').val("");
	var name = $('#TenSP').val("");
	var DonViTinh = $('#DonViTinh').val("");
	var DonGia = $('#DonGia').val("");
	var MaLSP = $('#MaLSP_1').val("");
	Materialize.toast('Clear !!!', 1500, 'rounded');
}

function doResetUpdate_SanPham(){
	var id = $('#MaSP1').val("");
	var name = $('#TenSP1').val("");
	var DonViTinh = $('#DonViTinh1').val("");
	var DonGia = $('#DonGia1').val("");
	var MaLSP = $('#MaLSP_2').val("");
	$('#modal3').closeModal();
}

function doAddBusyIndicator_SanPham(){
	busyIndicator.show();
	setTimeout(function(){
		busyIndicator.hide();
		doAdd_SanPham();
	},1000);
}

function doAdd_SanPham(){
	var idsp = $('#MaSPP').val();
	var namesp = $('#TenSP').val();
	var DonViTinhsp = $('#DonViTinh').val();
	var DonGiasp = $('#DonGia').val();
	var MaLSP_sp = $('#MaLSP_1').val();
	if(idsp ==""){
		dialogcheck();
		$('#MaSPP').focus();
	}else if(namesp ==""){
		dialogcheck();
		$('#TenSP').focus();
	}else if(DonViTinhsp ==""){
		dialogcheck();
		$('#DonViTinh').focus();
	}else if(DonGiasp ==""){
		dialogcheck();
		$('#DonGia').focus();
	}else if(MaLSP_sp ==""){
		dialogcheck();
		$('#MaLSP_1').focus();
	}else {

        var dialogtile = "Question !";
        var dialogtext = "Are you sure add ?";
        WL.SimpleDialog.show(dialogtile, dialogtext, [{
            text: 'Ok',
            handler: function() {
                var invocationData = {
                    adapter: 'ManagerStudent',
                    procedure: 'addSanPham',
                    parameters: [idsp,namesp,DonViTinhsp,DonGiasp,MaLSP_sp]
                };
                WL.Client.invokeProcedure(invocationData, {
                    onSuccess: loadSQLQueerySuccessSP,
                    onFailure: loadSQLQueeryFailureSP
                });

                function loadSQLQueerySuccessSP() {
                	Materialize.toast('Add Successfull !!!', 2000, 'rounded');
                	showlist_SanPham();
                }
                function loadSQLQueeryFailureSP() {
                    var dialogtile = "Question !";
                    var dialogtext = "Add failure, ID must unique !";
                    WL.SimpleDialog.show(dialogtile, dialogtext, [{
                        text: 'Ok',
                    }]);
                };
            }
        }, {
            text: 'cancel',
            handler: function() {}
        }]);
    }
}


function showlist_SanPham(){

	var invocationData = {
			adapter : 'ManagerStudent',
			procedure : 'getSanPham',
			parameters : []
			};
	var options = {
			onSuccess : loadSqlSuccessLSP,
			onFailure : loadSqlFailureLSP

			};
	WL.Client.invokeProcedure(invocationData,options);

	function loadSqlSuccessLSP(result){
		displaylistLSP(result.invocationResult.resultSet);
	}
	function loadSqlFailureLSP(){
		alert("fail");
	}
	function displaylistLSP(items){
		
		
		var li="";
		$("#list_SanPham").empty();
		var ranIcon = new Array();
		ranIcon = ['face','grade','insert_emoticon','perm_identity','stars','child_care','spa','sentiment_very_dissatisfied','star_half','school','whatshot','cake','ac_unit'];
		for(var i=0; i<items.length;i++){

			li += '<ul class="collapsible popout" data-collapsible="expandable"><li><div class="collapsible-header"><i class="material-icons">'+ranIcon[randInt(0, ranIcon.length-1)]+'</i> Tên Sản Phẩm : '+items[i].TenSP+'</div>'+
				'<div class="collapsible-body">'+
					'<p>'+
					"Mã Sản Phẩm : "+items[i].MaSP+'<br/>'+
					"Đơn Vị Tính : "+items[i].DonViTinh+'<br/>'+
					"Đơn Giá : "+items[i].DonGia+'<br/>'+
					"Mã Loại Sản Phẩm : "+items[i].MaLSP+'<br/>'+
					'</p>'+
					'<div align="center">'+
					'<button class="waves-effect waves-light btn" onclick="dodelete_SanPham('+items[i].MaSP+')" style="margin-right:15px; margin-bottom:18px; border-radius:5px; text-transform: none;">Delete</button>'+
					'<a class="modal-trigger waves-effect waves-light btn"   style="margin-right:15px; margin-bottom:18px; border-radius:5px; text-transform: none; " href="#modal3">Update</a>'+
					'</div'+
					'</div>'+
				'</div>'+
			'</ul>';
		}
		$("#list_SanPham").append(li);
		$(document).ready(function(){
		    $('.collapsible').collapsible({
		      accordion : false
		    });
		  });
		$('.modal-trigger').leanModal();

	}
	//Function random icon
	function randInt(min, max){
		return Math.floor(Math.random()*(max - min + 1)+min);
	}
}



function dodelete_SanPham(MaSP){
	
	
	
	 var dialogtile = "Question ?";
	    var dialogtext = "Are you sure delete ! ";
	    WL.SimpleDialog.show(dialogtile, dialogtext, [
	    {
	        text: 'OK',
	        handler: function (){
	        	
	        	var invocationData = {
	        			adapter : 'ManagerStudent',
	        			procedure : 'deleteSanPham',
	        			parameters : [MaSP]
	        			};

	        	WL.Client.invokeProcedure(invocationData,{
	        		onSuccess : loadSQLQueerySuccess, 
	        		onFailure : loadSQLQueeryFailure 
	        	});

	        	function loadSQLQueerySuccess(){
	        		Materialize.toast('Delete Successfull !!!', 2000, 'rounded');
	        		showlist_SanPham();
	        	}
	        	function loadSQLQueeryFailure(){
	        		var dialogtile = "Question !";
                  var dialogtext = "Delete fail !";
                  WL.SimpleDialog.show(dialogtile, dialogtext, [{
                      text: 'Ok',
                  }]);
	        	}
	        }
	    },
	    {
	    	text: 'cancel',
	    	handler: function (){}
	    }]);
}

function doUpdate_SanPham(){

	var ma_sp1 = $('#MaSP1').val();
	var ten_sp1 = $('#TenSP1').val();
	var donvitinh_sp1 = $('#DonViTinh1').val();
	var dongia_sp1 = $('#DonGia1').val();
	var ma_pr = $('#MaLSP_2').val();
	
	if(ma_sp1 ==""){
		dialogcheck();
		$('#MaSP1').focus();
	}else if(ten_sp1 ==""){
		dialogcheck();
		$('#TenSP1').focus();
	}else if(donvitinh_sp1 ==""){
		dialogcheck();
		$('#DonViTinh1').focus();
	}else if(dongia_sp1 ==""){
		dialogcheck();
		$('#DonGia1').focus();
	}else if(ma_pr ==""){
		dialogcheck();
		$('#MaLSP_2').focus();
	}else{

		var invocationData = {
				adapter : 'ManagerStudent',
				procedure : 'updateManager_SP',
				parameters : [ma_pr, ten_sp1, donvitinh_sp1, dongia_sp1, ma_sp1]
				};

		WL.Client.invokeProcedure(invocationData,{
			onSuccess : loadSQLQueerySuccess1, 
			onFailure : loadSQLQueeryFailure1 
		});

		function loadSQLQueerySuccess1(){

			Materialize.toast('Update Successfull !!!', 2000, 'rounded');
			showlist_SanPham();
			$('#modal3').closeModal();
		}
		function loadSQLQueeryFailure1(){
			var dialogtile ="Question ?";
			var dialogtext ="Update fail !";
			WL.SimpleDialog.show(dialogtile, dialogtext,[
			         {
			        	 text:'Ok',
			         }
			]);
		}
	}
}
//San Pham









//  Hoa Don
function doReset_HD(){
	var id_HD = $('#Ma_HD').val("");
	var id_KH = $('#Ma_KH').val("");
	var ngay_GD = $('#ngay_GD').val("");
	var ngay_GH = $('#ngay_GH').val("");

	Materialize.toast('Clear !!!', 1500, 'rounded');
}

function doResetUpdate_HD(){
	var id = $('#Ma_HD1').val("");
	var name = $('#Ma_KH1').val("");
	var NgayGD = $('#ngay_GD1').val("");
	var NgayGH = $('#ngay_GH1').val("");
	$('#modal4').closeModal();
}

function doAddBusyIndicator_HD(){
	busyIndicator.show();
	setTimeout(function(){
		busyIndicator.hide();
		doAdd_HoaDon();
	},1000);
}

function doAdd_HoaDon(){
	var id_HD = $('#Ma_HD').val();
	var id_KH = $('#Ma_KH').val();
	var ngay_GD = $('#ngay_GD').val();
	var ngay_GH = $('#ngay_GH').val();

	if(id_HD ==""){
		dialogcheck();
		$('#Ma_HD').focus();
	}else if(id_KH ==""){
		dialogcheck();
		$('#Ma_KH').focus();
	}else if(ngay_GD ==""){
		dialogcheck();
		$('#ngay_GD').focus();
	}else if(ngay_GH ==""){
		dialogcheck();
		$('#ngay_GH').focus();
	}else {

        var dialogtile = "Question !";
        var dialogtext = "Are you sure add ?";
        WL.SimpleDialog.show(dialogtile, dialogtext, [{
            text: 'Ok',
            handler: function() {
                var invocationData = {
                    adapter: 'ManagerStudent',
                    procedure: 'add_HD',
                    parameters: [id_HD, id_KH, ngay_GD, ngay_GH]
                };
                WL.Client.invokeProcedure(invocationData, {
                    onSuccess: loadSQLQueerySuccessSP,
                    onFailure: loadSQLQueeryFailureSP
                });

                function loadSQLQueerySuccessSP() {
                	Materialize.toast('Add Successfull !!!', 2000, 'rounded');
                	showlist_HoaDon();
                }
                function loadSQLQueeryFailureSP() {
                    var dialogtile = "Question !";
                    var dialogtext = "Add failure, ID must unique !";
                    WL.SimpleDialog.show(dialogtile, dialogtext, [{
                        text: 'Ok',
                    }]);
                };
            }
        }, {
            text: 'cancel',
            handler: function() {}
        }]);
    }
}


function showlist_HoaDon(){

	var invocationData = {
			adapter : 'ManagerStudent',
			procedure : 'getHoaDon',
			parameters : []
			};
	var options = {
			onSuccess : loadSqlSuccessLSP,
			onFailure : loadSqlFailureLSP

			};
	WL.Client.invokeProcedure(invocationData,options);

	function loadSqlSuccessLSP(result){
		displaylistLSP(result.invocationResult.resultSet);
	}
	function loadSqlFailureLSP(){
		alert("fail");
	}
	function displaylistLSP(items){
		
		
		var li="";
		$("#list_HoaDon").empty();
		var ranIcon = new Array();
		ranIcon = ['face','grade','insert_emoticon','perm_identity','stars','child_care','spa','sentiment_very_dissatisfied','star_half','school','whatshot','cake','ac_unit'];
		for(var i=0; i<items.length;i++){

			li += '<ul class="collapsible popout" data-collapsible="expandable"><li><div class="collapsible-header"><i class="material-icons">'+ranIcon[randInt(0, ranIcon.length-1)]+'</i> Mã Hóa Đơn : '+items[i].MaHD+'</div>'+
				'<div class="collapsible-body">'+
					'<p>'+
					"Mã Khách Hàng : "+items[i].MaKH+'<br/>'+
					"Ngày Giao Dịch : "+items[i].NgayGiaoDich+'<br/>'+
					"Ngày Giao Hàng : "+items[i].NgayGiaoHang	+'<br/>'+
					'</p>'+
					'<div align="center">'+
					'<button class="waves-effect waves-light btn" onclick="dodelete_HoaDon('+items[i].MaHD+')" style="margin-right:15px; margin-bottom:18px; border-radius:5px; text-transform: none;">Delete</button>'+
					'<a class="modal-trigger waves-effect waves-light btn"   style="margin-right:15px; margin-bottom:18px; border-radius:5px; text-transform: none; " href="#modal4">Update</a>'+
					'</div'+
					'</div>'+
				'</div>'+
			'</ul>';
		}
		$("#list_HoaDon").append(li);
		$(document).ready(function(){
		    $('.collapsible').collapsible({
		      accordion : false
		    });
		  });
		$('.modal-trigger').leanModal();

	}
	//Function random icon
	function randInt(min, max){
		return Math.floor(Math.random()*(max - min + 1)+min);
	}
}



function dodelete_HoaDon(MaHD){
	
	
	
	 var dialogtile = "Question ?";
	    var dialogtext = "Are you sure delete ! ";
	    WL.SimpleDialog.show(dialogtile, dialogtext, [
	    {
	        text: 'OK',
	        handler: function (){
	        	
	        	var invocationData = {
	        			adapter : 'ManagerStudent',
	        			procedure : 'delete_HoaDon',
	        			parameters : [MaHD]
	        			};

	        	WL.Client.invokeProcedure(invocationData,{
	        		onSuccess : loadSQLQueerySuccess, 
	        		onFailure : loadSQLQueeryFailure 
	        	});

	        	function loadSQLQueerySuccess(){
	        		Materialize.toast('Delete Successfull !!!', 2000, 'rounded');
	        		showlist_HoaDon();
	        	}
	        	function loadSQLQueeryFailure(){
	        		var dialogtile = "Question !";
                  var dialogtext = "Delete fail !";
                  WL.SimpleDialog.show(dialogtile, dialogtext, [{
                      text: 'Ok',
                  }]);
	        	}
	        }
	    },
	    {
	    	text: 'cancel',
	    	handler: function (){}
	    }]);
}

function doUpdate_HoaDon(){

	var id_HD1 = $('#Ma_HD1').val();
	var id_KH1 = $('#Ma_KH1').val();
	var Ngay_GD1 = $('#ngay_GD1').val();
	var Ngay_GH1 = $('#ngay_GH1').val();

	
	if(id_HD1 ==""){
		dialogcheck();
		$('#Ma_HD1').focus();
	}else if(id_KH1 ==""){
		dialogcheck();
		$('#Ma_KH1').focus();
	}else if(Ngay_GD1 ==""){
		dialogcheck();
		$('#ngay_GD1').focus();
	}else if(Ngay_GH1 ==""){
		dialogcheck();
		$('#ngay_GH1').focus();
	}else{

		var invocationData = {
				adapter : 'ManagerStudent',
				procedure : 'update_HoaDon',
				parameters : [id_KH1, Ngay_GD1, Ngay_GH1, id_HD1]
				};

		WL.Client.invokeProcedure(invocationData,{
			onSuccess : loadSQLQueerySuccess1, 
			onFailure : loadSQLQueeryFailure1 
		});

		function loadSQLQueerySuccess1(){

			Materialize.toast('Update Successfull !!!', 2000, 'rounded');
			showlist_HoaDon();
			$('#modal4').closeModal();
		}
		function loadSQLQueeryFailure1(){
			var dialogtile ="Question ?";
			var dialogtext ="Update fail !";
			WL.SimpleDialog.show(dialogtile, dialogtext,[
			         {
			        	 text:'Ok',
			         }
			]);
		}
	}
}
//  Hoa Don
