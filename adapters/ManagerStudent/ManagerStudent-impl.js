/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/*******************************************************************************
 * Implementation code for procedure - 'procedure1'
 * 
 * 
 * @return - invocationResult
 */
 
var procedure1Statement = WL.Server.createSQLStatement("select COLUMN1, COLUMN2 from TABLE1 where COLUMN3 = ?");
function procedure1(param) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure1Statement,
		parameters : [param]
	});
}


/*******************************************************************************
 * Implementation code for procedure - 'procedure2'
 * 
 * 
 * @return - invocationResult
 */
 
function procedure2(param) {
	return WL.Server.invokeSQLStoredProcedure({
		procedure : "storedProcedure2",
		parameters : [param]
	});
}


/*******************************************************************************
 * Functions that correspond to JSONStore client operations
 * 
 */

var selectStatement = WL.Server.createSQLStatement("SELECT * FROM khachhang");

function getManagerStudents() {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : selectStatement,
		parameters : []
	});
}


var addStatement = WL.Server.createSQLStatement("insert into khachhang (MaKH, TenKH, DiaChi, SoDienThoai) values (?, ?,?,?)");

function addManagerStudent(MaKH,TenKH,DiaChi,SoDienThoai) {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : addStatement,
		parameters : [MaKH,TenKH,DiaChi,SoDienThoai]
	});
}


	
var updateStatement = WL.Server.createSQLStatement("update khachhang set  TenKH=?, DiaChi=?, SoDienThoai=? WHERE MaKH=?");

function updateManagerStudent(TenKH, DiaChi,SoDienThoai, MaKH ) {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : updateStatement,
		parameters : [TenKH, DiaChi,SoDienThoai, MaKH]
	});
}



var deleteStatement = WL.Server.createSQLStatement("delete from khachhang where MaKH=?");

function deleteManagerStudent(MaKH) {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : deleteStatement,
		parameters : [MaKH]
	});
}




// Tab Loai San Pham

var selectStatementLSP = WL.Server.createSQLStatement("SELECT * FROM loaisanpham");

function getManagerLoaiSP() {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : selectStatementLSP,
		parameters : []
	});
}

var addStatementLSP = WL.Server.createSQLStatement("insert into loaisanpham (MaLSP, TenLoaiSP) values (?, ?)");

function addManagerLoaiSanPham(MaLSP, TenLoaiSP) {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : addStatementLSP,
		parameters : [MaLSP, TenLoaiSP]
	});
}

	
var updateStatementLSP = WL.Server.createSQLStatement("update loaisanpham set  TenLoaiSP=? WHERE MaLSP=?");

function updateManagerLoaiSP(TenLoaiSP, MaLSP ) {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : updateStatementLSP,
		parameters : [TenLoaiSP, MaLSP]
	});
}


var deleteStatementLSP = WL.Server.createSQLStatement("delete from loaisanpham where MaLSP=?");

function deleteManagerLoaiSanPham(MaLSP) {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : deleteStatementLSP,
		parameters : [MaLSP]
	});
}






//Tab San Pham

var selectStatementSP = WL.Server.createSQLStatement("SELECT * FROM sanpham");

function getSanPham() {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : selectStatementSP,
		parameters : []
	});
}

var addStatement_SP = WL.Server.createSQLStatement("insert into sanpham (MaSP, TenSP, DonViTinh, DonGia, MaLSP) values (?, ?, ?, ?, ?)");

function addSanPham(MaSP, TenSP, DonViTinh, DonGia, MaLSP) {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : addStatement_SP,
		parameters : [MaSP, TenSP, DonViTinh, DonGia, MaLSP]
	});
}

	
var updateStatement_SP = WL.Server.createSQLStatement("UPDATE sanpham SET MaLSP=?, TenSP=?, DonViTinh=?, DonGia=? WHERE MaSP=?");

function updateManager_SP(MaLSP, TenSP, DonViTinh,DonGia, MaSP) {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : updateStatement_SP,
		parameters : [MaLSP, TenSP, DonViTinh,DonGia, MaSP]
	});
}


var deleteStatement_SP = WL.Server.createSQLStatement("delete from sanpham where MaSP=?");

function deleteSanPham(MaSP) {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : deleteStatement_SP,
		parameters : [MaSP]
	});
}







//Tab Hoa Don

var selectStatement_HD = WL.Server.createSQLStatement("SELECT * FROM hoadon");

function getHoaDon() {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : selectStatement_HD,
		parameters : []
	});
}

var addStatement_HD = WL.Server.createSQLStatement("insert into hoadon (MaHD, MaKH, NgayGiaoDich, NgayGiaoHang) values (?, ?, ?, ?)");

function add_HD(MaHD, MaKH, NgayGiaoDich, NgayGiaoHang) {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : addStatement_HD,
		parameters : [MaHD, MaKH, NgayGiaoDich, NgayGiaoHang]
	});
}

	
var updateStatement_HD = WL.Server.createSQLStatement("update hoadon set  MaKH=? NgayGiaoDich=? NgayGiaoHang=? WHERE MaHD=?");

function update_HoaDon(MaKH, NgayGiaoDich, NgayGiaoHang, MaHD) {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : updateStatement_HD,
		parameters : [MaKH, NgayGiaoDich, NgayGiaoHang, MaHD]
	});
}


var deleteStatement_HD = WL.Server.createSQLStatement("delete from hoadon where MaHD=?");

function delete_HoaDon(MaHD) {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : deleteStatement_HD,
		parameters : [MaHD]
	});
}

