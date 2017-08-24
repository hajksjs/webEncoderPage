

CREATE DATABASE Invoice

GO 

WAITFOR DELAY '00:00:10'

GO

/*
如需后台cs代码，请到
http://item.taobao.com/item.htm?id=45658612273
QQ:729513406
*/

USE Invoice

GO  

WAITFOR DELAY '00:00:10'

GO

IF OBJECT_id ('dbo.purchasedetails') IS NOT NULL
	DROP TABLE dbo.purchasedetails
GO

IF OBJECT_id ('dbo.purchases') IS NOT NULL
	DROP TABLE dbo.purchases
GO


IF OBJECT_id ('dbo.saledetails') IS NOT NULL
	DROP TABLE dbo.saledetails
GO

IF OBJECT_id ('dbo.sales') IS NOT NULL
	DROP TABLE dbo.sales
GO

IF OBJECT_id ('dbo.otherIOdetails') IS NOT NULL
	DROP TABLE dbo.otherIOdetails
GO

IF OBJECT_id ('dbo.otherIO') IS NOT NULL
	DROP TABLE dbo.otherIO
GO

IF OBJECT_id ('dbo.Log') IS NOT NULL
	DROP TABLE dbo.Log
GO


IF OBJECT_id ('dbo.Goods') IS NOT NULL
	DROP TABLE dbo.Goods
GO

IF OBJECT_id ('dbo.unit') IS NOT NULL
	DROP TABLE dbo.unit
GO

CREATE TABLE dbo.unit
	(
	id     INT IDENTITY NOT NULL,-- char(18) NOT NULL,
	name    VARCHAR (50) NULL,
	editor   VARCHAR (20) NULL,
	editDate  DATETIME DEFAULT getdate(),
	CONSTRAINT PK_unit PRIMARY KEY (id)
	)
GO

/*
INSERT INTO dbo.unit (id, name)
VALUES ('20141111121159AAAC', '吨')
GO

INSERT INTO dbo.unit (id, name)
VALUES ('20141111121159AAAD', '公斤')
GO

*/

INSERT INTO dbo.unit ( name)
VALUES ('吨')
GO

INSERT INTO dbo.unit ( name)
VALUES ( '公斤')
GO

IF OBJECT_id ('dbo.Storage') IS NOT NULL
	DROP TABLE dbo.Storage
GO

CREATE TABLE dbo.Storage
	(
	id     INT IDENTITY NOT NULL,-- char(18) NOT NULL,
	name    VARCHAR (50) NULL,
	editor   VARCHAR (20) NULL,
	editDate  DATETIME DEFAULT getdate(),
	CONSTRAINT PK_Storage PRIMARY KEY (id)
	)
GO

IF OBJECT_id ('dbo.employee') IS NOT NULL
	DROP TABLE dbo.employee
GO

CREATE TABLE dbo.employee
	(
	id     INT IDENTITY NOT NULL,-- char(18) NOT NULL,
	name    VARCHAR (50) NULL,
	editor   VARCHAR (20) NULL,
	editDate  DATETIME DEFAULT getdate(),
	CONSTRAINT PK_employee PRIMARY KEY (id)
	)
GO

/*

INSERT INTO dbo.employee (id, name)
VALUES ('20141111121255AAAC', '小李')
GO
INSERT INTO dbo.employee (id, name)
VALUES ('20141111121255AAAD', '小王')
GO


*/
INSERT INTO dbo.employee ( name)
VALUES ('小李')
GO 
INSERT INTO dbo.employee ( name)
VALUES ('小王')
GO


IF OBJECT_id ('dbo.account') IS NOT NULL
	DROP TABLE dbo.account
GO

CREATE TABLE dbo.account
	(
	id     INT IDENTITY NOT NULL,-- char(18) NOT NULL,
	name    VARCHAR (50) NULL,
	editor   VARCHAR (20) NULL,
	editDate  DATETIME DEFAULT getdate(),
	CONSTRAINT PK_account PRIMARY KEY (id)
	)
GO

/*
INSERT INTO dbo.account (id, name)
VALUES ('20141111121159AAAC', '欠款')
GO

INSERT INTO dbo.account (id, name)
VALUES ('20141111121159AAAD', '现金')
GO
*/

INSERT INTO dbo.account ( name)
VALUES ('欠款')
GO

INSERT INTO dbo.account ( name)
VALUES ('现金')
GO

IF OBJECT_id ('dbo.receipt') IS NOT NULL
	DROP TABLE dbo.receipt
GO

CREATE TABLE dbo.receipt
	(
	id     INT IDENTITY NOT NULL,-- char(18) NOT NULL,
	name    VARCHAR (50) NULL,
	editor   VARCHAR (20) NULL,
	editDate  DATETIME DEFAULT getdate(),
	CONSTRAINT PK_receipt PRIMARY KEY (id)
	)
GO

/*
INSERT INTO dbo.storage (id, name)
VALUES ('20141111121159AAAA', '码头仓库')
GO
*/
INSERT INTO dbo.storage ( name)
VALUES ('码头仓库')
GO

INSERT INTO dbo.storage ( name)
VALUES ('总仓库')
GO

IF OBJECT_id ('dbo.contact') IS NOT NULL
	DROP TABLE dbo.contact
GO

CREATE TABLE dbo.contact
	(
	id     INT IDENTITY NOT NULL,-- char(18) NOT NULL,
	number    VARCHAR (50) NOT NULL,
	name      VARCHAR (200) NULL,
	contacter VARCHAR (200) NULL,
	mobile    VARCHAR (200) NULL,
	telephone VARCHAR (200) NULL,
	linkIm    VARCHAR (50) NULL,
	address   VARCHAR (200) NULL,
	note      VARCHAR (200) NULL,
	receivable NUMERIC (18,2) NULL,
	preReceived NUMERIC (18,2) NULL,
	editor   VARCHAR (20) NULL,
	editDate  DATETIME  NULL,
	type INT NULL,
	CONSTRAINT PK_contact PRIMARY KEY (id)
	
	)
GO
/*
INSERT INTO dbo.contact
	(
	id,
	number,
	name
	)
VALUES 
	(
	'20141111121159AAAA',
	'QZKH',
	'客户潜在'
	)
GO 

INSERT INTO dbo.contact
	(
	id,
	number,
	name
	)
VALUES 
	(
	'20141111121159BBBB',
	'KHA',
	'客户A'
	)
GO 
*/

INSERT INTO dbo.contact (number, name, contacter, mobile, telephone, linkIm, address, note, receivable, preReceived,type)
VALUES ('QZKH', '客户潜在', '王', '13312345678', '123456', 'qq:1234', '中国', '备注', 1200, 1000,1)
GO


INSERT INTO dbo.contact (number, name, contacter, mobile, telephone, linkIm, address, note, receivable, preReceived,type)
VALUES ('QZGYS', '供应商潜在', '王', '13312345678', '123456', 'qq:1234', '中国', '备注', 1200, 1000,10)
GO

INSERT INTO dbo.contact
	(
	number,name,type
	)
VALUES 
	('KHA','客户A',1)
GO 


INSERT INTO dbo.contact
	(
	number,name,type
	)
VALUES 
	('GYSA','供应商A',10)
GO 



IF OBJECT_ID ('dbo.goodsCategory') IS NOT NULL
	DROP TABLE dbo.goodsCategory
GO

CREATE TABLE dbo.goodsCategory
	(
	id      CHAR (18) NOT NULL,
	parentID  CHAR (18) NULL,
	allID  VARCHAR (60) NULL,
	sortIndex    INT  NULL,
	name VARCHAR (50) NOT NULL,
	editor    VARCHAR (20) NULL,
	editDate  DATETIME NULL,
	CONSTRAINT PK_goodsCategory PRIMARY KEY (id),
	CONSTRAINT IX_goodsCategory UNIQUE (name)
	)
GO

INSERT INTO dbo.goodsCategory (id,parentID,allID,sortIndex,name)
VALUES ('20141111121110AAAA',NULL ,'20141111121110AAAA', 1, '工具刀')
GO

INSERT INTO dbo.goodsCategory (id,parentID,allID,sortIndex,name)
VALUES ('20141111121110AAAB','20141111121110AAAA' ,'20141111121110AAAA,20141111121110AAAB', 1, '十字凸刀片')
GO

INSERT INTO dbo.goodsCategory (id,parentID,allID,sortIndex,name)
VALUES ('20141111121110AAAC','20141111121110AAAA' ,'20141111121110AAAA,20141111121110AAAC', 1, '十字刀片')
GO

IF OBJECT_id ('dbo.V_goodsCategory') IS NOT NULL
	DROP VIEW dbo.V_goodsCategory
GO

CREATE VIEW dbo.V_goodsCategory
AS
SELECT X.*,(SELECT name FROM goodsCategory WHERE id= X.parentid)AS categoryName
FROM goodsCategory X

GO 

CREATE TABLE dbo.Goods
	(
	id   INT IDENTITY NOT NULL,-- char(18) NOT NULL,
	categoryid       char(18) NULL,
	number    VARCHAR (50) NOT NULL,
	--name      VARCHAR (200) NULL,
	spec      VARCHAR (200) NULL,
	unitID int NULL,
	storageID int NULL,
	unitCost   NUMERIC (18,2) NULL,
	purPrice   NUMERIC (18,2) NULL,
	salePrice NUMERIC (18,2) NULL,
	lowQty    NUMERIC (18,2) NULL,
	highQty   NUMERIC (18,2) NULL,
	editor   VARCHAR (20) NULL,
	editDate  DATETIME  NULL 
	CONSTRAINT PK_Goods PRIMARY KEY (id),
	CONSTRAINT FK_Goods_category FOREIGN KEY (categoryid) REFERENCES dbo.goodsCategory (id) NOT FOR REPLICATION,
	CONSTRAINT FK_goods_storage FOREIGN KEY (storageID) REFERENCES dbo.storage (id) NOT FOR REPLICATION,
	CONSTRAINT FK_goods_unit FOREIGN KEY (unitID) REFERENCES dbo.unit (id) NOT FOR REPLICATION
	)
GO

/*
INSERT INTO dbo.Goods (id,categoryid,number,  spec, unitCost, purPrice, salePrice)
VALUES ('20141111121159AAAA','20141111121110AAAB','C00001', 'φ2.8*9.5', 22, 33, 24)
GO
*/

INSERT INTO dbo.Goods (categoryid,number,  spec, unitID,storageID,unitCost, purPrice, salePrice,highQty)
VALUES ('20141111121110AAAB','C00001', 'φ2.8*9.5',1,1, 22, 33, 24,120)
GO

INSERT INTO dbo.Goods (categoryid,number,  spec, unitID,storageID,unitCost, purPrice, salePrice)
VALUES ('20141111121110AAAB','C00003', 'φ3.8*9.5',1,1,  25, 25, 29)
GO


IF OBJECT_id ('dbo.V_goods') IS NOT NULL
	DROP VIEW dbo.V_goods
GO

CREATE VIEW dbo.V_goods
AS
SELECT X.*,
  (Select name From unit Where id=X.unitID) as unitName,
  (Select name From Storage Where id=X.Storageid) as storageName,
  V.categoryName,V.name, V.parentID,V.allID 
FROM goods X
LEFT JOIN V_goodsCategory V ON V.id=X.categoryid

GO

IF OBJECT_id ('dbo.Users') IS NOT NULL
	DROP TABLE dbo.Users
GO

CREATE TABLE dbo.Users
	(
	id  INT IDENTITY NOT NULL,-- char(18) NOT NULL,
	name  VARCHAR (50) NOT NULL,
	pwd       VARCHAR (50) NULL,
	editor   VARCHAR (20) NULL,
	editDate  DATETIME  NULL 
	)
GO

/*
INSERT INTO dbo.Users (id,name, PWD)
VALUES ('20141111121159AAAA','admin', '1234')
GO
*/
INSERT INTO dbo.Users (name, PWD)
VALUES ('admin', '1234')
GO

INSERT INTO dbo.Users (name, PWD)
VALUES ('luan729', '1234')
GO
IF OBJECT_id ('dbo.material') IS NOT NULL
	DROP TABLE dbo.material
GO

CREATE TABLE dbo.material
	(
	id     INT IDENTITY NOT NULL,-- char(18) NOT NULL,
	name    VARCHAR (50) NULL,
	editor   VARCHAR (20) NULL,
	editDate  DATETIME DEFAULT getdate(),
	CONSTRAINT PK_material PRIMARY KEY (id)
	)
GO


IF OBJECT_id ('dbo.producer') IS NOT NULL
	DROP TABLE dbo.producer
GO

CREATE TABLE dbo.producer
	(
	id     INT IDENTITY NOT NULL,-- char(18) NOT NULL,
	name    VARCHAR (50) NULL,
	editor   VARCHAR (20) NULL,
	editDate  DATETIME DEFAULT getdate(),
	CONSTRAINT PK_producer PRIMARY KEY (id)
	)
GO

CREATE TABLE dbo.Log
	(
	id    INT IDENTITY NOT NULL,
	note   VARCHAR (2000) NULL,
	logDate DATETIME DEFAULT getdate()
	)
GO

CREATE TABLE dbo.sales
	(
	id      char(18) NOT NULL,
	number    VARCHAR (50) NOT NULL,
	customerID int NOT NULL,
	discount  NUMERIC (8,2) NULL,
	accountID int,
	--receiptID int,
	rpAmount  NUMERIC (12,4) NULL,
	shipping  VARCHAR (20) NULL,
	platenumber  VARCHAR (20) NULL,
	employeeID int,
	creator   VARCHAR (20) NULL,
	editor   VARCHAR (20) NULL,
	auditor  VARCHAR (20) NULL,
	saleDate  DATETIME  NULL ,
	editDate  DATETIME DEFAULT getdate(),
	note     VARCHAR (200) NULL,
    transType INT,
    checked INT ,
	CONSTRAINT PK_sales PRIMARY KEY (id),
	CONSTRAINT FK_sales_contact FOREIGN KEY (customerID) REFERENCES dbo.contact (id) NOT FOR REPLICATION,
	CONSTRAINT FK_sales_account FOREIGN KEY (accountID) REFERENCES dbo.account (id) NOT FOR REPLICATION,
	--CONSTRAINT FK_sales_receipt FOREIGN KEY (receiptID) REFERENCES dbo.receipt (id) NOT FOR REPLICATION,
	CONSTRAINT FK_sales_employee FOREIGN KEY (employeeID) REFERENCES dbo.employee (id) NOT FOR REPLICATION
	
	)
GO



CREATE TABLE dbo.saledetails
	(
	id       INT not NULL,
	salesID  char(18) NOT NULL,
	materialID int NULL,
	unitID int NULL,
	spec    VARCHAR (20) NULL,
	goodsID int NOT NULL,
	storageID int NULL,
	producerID int NULL,
	quantity  NUMERIC (8,2) NULL,
	weight    NUMERIC (12,4) NULL,
	price     NUMERIC (12,4) NULL,
	amount    NUMERIC (12,4) NULL,
	note     VARCHAR (200) NULL,
	CONSTRAINT PK_saledetails PRIMARY KEY (id,salesID),
	CONSTRAINT FK_saledetails_sale FOREIGN KEY (salesID) REFERENCES dbo.sales (id) ON DELETE CASCADE NOT FOR REPLICATION,
	CONSTRAINT FK_saledetails_goods FOREIGN KEY (Goodsid) REFERENCES dbo.Goods (id) NOT FOR REPLICATION,
	CONSTRAINT FK_saledetails_storage FOREIGN KEY (storageID) REFERENCES dbo.storage (id) NOT FOR REPLICATION,
	CONSTRAINT FK_saledetails_producer FOREIGN KEY (producerID) REFERENCES dbo.producer (id) NOT FOR REPLICATION,
	CONSTRAINT FK_saledetails_unit FOREIGN KEY (unitID) REFERENCES dbo.unit (id) NOT FOR REPLICATION,
	CONSTRAINT FK_saledetails_material FOREIGN KEY (materialID) REFERENCES dbo.material (id) NOT FOR REPLICATION
	
	)
GO

IF OBJECT_id ('dbo.V_sales') IS NOT NULL
	DROP VIEW dbo.V_sales
GO

CREATE VIEW dbo.V_sales
AS
SELECT *,
  (Select name From contact Where id=X.customerID) as customerName,
  --(Select name From receipt Where id=X.receiptID) as receiptName,
  (Select name From employee Where id=X.employeeID) as employeeName,
  (Select name From account Where id=X.accountID) as accountName,
  isnull((SELECT sum(amount) FROM saledetails WHERE salesID=X.id),0) AS totalAmount
FROM sales X

GO

IF OBJECT_id ('dbo.V_saledetails') IS NOT NULL
	DROP VIEW dbo.V_saledetails
GO

CREATE VIEW dbo.V_saledetails
AS
SELECT X.*,
  G.number, G.name, G.unitCost, G.purPrice, G.salePrice,G.parentID, allID,
  (Select name From producer Where id=X.producerID) as producerName,
  (Select name From material Where id=X.materialID) as materialName,
  (Select name From unit Where id=X.unitID) as unitName,
  (Select name From Storage Where id=X.Storageid) as storageName,
  B.customerName,B.employeeName,B.number AS salesNumber,B.accountName,B.saleDate,
  (CASE transType WHEN 150601 THEN '销售'
                WHEN 150602 THEN '销售退货'
                ELSE NULL END) AS transType
FROM saledetails X, V_goods G, V_sales B WHERE X.goodsID=G.id AND X.salesID=B.id

GO



CREATE TABLE dbo.purchases
	(
	id      char(18) NOT NULL,
	number    VARCHAR (50) NOT NULL,
	supplierID int NOT NULL,
	discount  NUMERIC (8,2) NULL,
	accountID int,
	--receiptID int,
	rpAmount  NUMERIC (12,4) NULL,
	shipping  VARCHAR (20) NULL,
	platenumber  VARCHAR (20) NULL,
	employeeID int,
	creator   VARCHAR (20) NULL,
	editor   VARCHAR (20) NULL,
	auditor  VARCHAR (20) NULL,
	purchaseDate  DATETIME  NULL ,
	editDate  DATETIME DEFAULT getdate(),
	note     VARCHAR (200) NULL,
    transType INT,
    checked INT ,
	CONSTRAINT PK_purchases PRIMARY KEY (id),
	CONSTRAINT FK_purchases_contact FOREIGN KEY (supplierID) REFERENCES dbo.contact (id) NOT FOR REPLICATION,
	CONSTRAINT FK_purchases_account FOREIGN KEY (accountID) REFERENCES dbo.account (id) NOT FOR REPLICATION,
	--CONSTRAINT FK_purchases_receipt FOREIGN KEY (receiptID) REFERENCES dbo.receipt (id) NOT FOR REPLICATION,
	CONSTRAINT FK_purchases_employee FOREIGN KEY (employeeID) REFERENCES dbo.employee (id) NOT FOR REPLICATION
	
	)
GO



CREATE TABLE dbo.purchasedetails
	(
	id       INT not NULL,
	purchasesID  char(18) NOT NULL,
	materialID int NULL,
	unitID int NULL,
	spec    VARCHAR (20) NULL,
	goodsID int NOT NULL,
	storageID int NULL,
	producerID int NULL,
	quantity  NUMERIC (8,2) NULL,
	weight    NUMERIC (12,4) NULL,
	price     NUMERIC (12,4) NULL,
	amount    NUMERIC (12,4) NULL,
	note     VARCHAR (200) NULL,
	CONSTRAINT PK_purchasedetails PRIMARY KEY (id,purchasesID),
	CONSTRAINT FK_purchasedetails_purchase FOREIGN KEY (purchasesID) REFERENCES dbo.purchases (id) ON DELETE CASCADE NOT FOR REPLICATION,
	CONSTRAINT FK_purchasedetails_goods FOREIGN KEY (Goodsid) REFERENCES dbo.Goods (id) NOT FOR REPLICATION,
	CONSTRAINT FK_purchasedetails_storage FOREIGN KEY (storageID) REFERENCES dbo.storage (id) NOT FOR REPLICATION,
	CONSTRAINT FK_purchasedetails_producer FOREIGN KEY (producerID) REFERENCES dbo.producer (id) NOT FOR REPLICATION,
	CONSTRAINT FK_purchasedetails_unit FOREIGN KEY (unitID) REFERENCES dbo.unit (id) NOT FOR REPLICATION,
	CONSTRAINT FK_purchasedetails_material FOREIGN KEY (materialID) REFERENCES dbo.material (id) NOT FOR REPLICATION
	
	)
GO

IF OBJECT_id ('dbo.V_purchases') IS NOT NULL
	DROP VIEW dbo.V_purchases
GO

CREATE VIEW dbo.V_purchases
AS
SELECT *,
  (Select name From contact Where id=X.supplierID) as supplierName,
  --(Select name From receipt Where id=X.receiptID) as receiptName,
  (Select name From employee Where id=X.employeeID) as employeeName,
  (Select name From account Where id=X.accountID) as accountName,
  isnull((SELECT sum(amount) FROM purchasedetails WHERE purchasesID=X.id),0) AS totalAmount
FROM purchases X

GO

IF OBJECT_id ('dbo.V_purchasedetails') IS NOT NULL
	DROP VIEW dbo.V_purchasedetails
GO

CREATE VIEW dbo.V_purchasedetails
AS
SELECT X.*,
  G.number, G.name, G.unitCost, G.purPrice, G.salePrice,G.parentID, allID,
  (Select name From producer Where id=X.producerID) as producerName,
  (Select name From material Where id=X.materialID) as materialName,
  (Select name From unit Where id=X.unitID) as unitName,
  (Select name From Storage Where id=X.Storageid) as storageName,
  B.supplierName,B.employeeName,B.number AS purchasesNumber,B.accountName,B.purchaseDate,
  (CASE transType WHEN 150601 THEN '采购'
                WHEN 150602 THEN '采购退货'
                ELSE NULL END) AS transType
FROM purchasedetails X, V_goods G, V_purchases B WHERE X.goodsID=G.id AND X.purchasesID=B.id

GO


IF OBJECT_id ('dbo.fnGet_No') IS NOT NULL
	DROP FUNCTION dbo.fnGet_No
GO

CREATE FUNCTION fnGet_No
(@TbName varchar(50), @billDate varchar(50))
     returns  varchar(50)
BEGIN 
     Declare @strKind varchar(50),@intCount int,  @strData varchar(12), @strLastNo varchar(50), @intNo int  
     
     
     
     if UPPER(@TbName)='XS'        
     begin             
       Select @strKind='XS'       
       Select Top 1 @intCount=count(*)+1 From sales WHERE saleDate=@billDate
     end 
     ELSE if UPPER(@TbName)='CG'        
     begin             
       Select @strKind='CG'       
       Select Top 1 @intCount=count(*)+1 From purchases WHERE purchaseDate=@billDate
     end 
     else RETURN ''    
     
                     

     SELECT @strData = CONVERT(varchar(12),convert(DATETIME,@billDate),112)
     return @strKind + @strData +Replicate('0',3-Len(Convert(char,@intCount))) + Convert(char,@intCount)

END 

/*
GO

IF OBJECT_id ('dbo.spInsertsale') IS NOT NULL
	DROP PROCEDURE dbo.spInsertsale
GO

CREATE PROCEDURE spInsertsale
@saleno varchar(50),@id INT,@discount NUMERIC (8,2),@userAdd VARCHAR(20), @saleDate varchar(50),@note VARCHAR (200) ,@salesid INT  OUTPUT
AS 
BEGIN 
    Insert Into sales(saleNo,id,discount,userAdd ,saleDate,note) 
    Values(@saleno,@id,@discount,@userAdd ,@saledate,@note) 
    --SELECT @salesid= @@idENTITY
    SET @salesid = Scope_identity()

END 

*/
GO

IF OBJECT_id ('dbo.Params') IS NOT NULL
IF not Exists(Select * from Params)
	DROP TABLE dbo.Params
GO

IF OBJECT_id ('dbo.Params') IS NULL
CREATE TABLE dbo.Params
	(
	id       INT IDENTITY NOT NULL,-- char(18) NOT NULL,
	type     VARCHAR (50) NOT NULL,
	name   VARCHAR (50) NOT NULL,
	note VARCHAR (50) NULL,
	value  VARCHAR (200) NULL,
	summary     VARCHAR (200) NULL,
	isStop        SMALLINT NULL,
	CONSTRAINT PK_Params PRIMARY KEY (id),
	CONSTRAINT IX_Params UNIQUE (name)
	)
GO

IF OBJECT_id ('dbo.Menus') IS NOT NULL
	DROP TABLE dbo.Menus
GO

CREATE TABLE dbo.Menus
	(
	id     INT idENTITY NOT NULL,
	name    VARCHAR (100) NULL,
	href       VARCHAR (100) NULL,
	category     VARCHAR (50) NULL,
	categoryName     VARCHAR (50) NULL,
	caption    VARCHAR (50) NULL,
	fileName    VARCHAR (100) NULL,
	sortid       INT NULL,
	isVisible   SMALLINT NULL,
	isAdmin     SMALLINT NULL,
	isEveryOne  SMALLINT NULL,
	rightsType    VARCHAR (50) NULL,
	isRightExt    SMALLINT NULL,
	CONSTRAINT PK_Menus PRIMARY KEY (id)
	)
GO

INSERT INTO dbo.Menus
	(
	name,href,category,categoryName,Caption,fileName,sortid,isVisible,isAdmin,isEveryOne,rightsType,isRightExt)
VALUES 
    ('sales','./scm/invSa.aspx?action=initSale','sales','销货','销货单','invSa',1,1,0,0,'QAEDCP',0)

GO

INSERT INTO dbo.Menus
	(
	name,href,category,categoryName,Caption,fileName,sortid,isVisible,isAdmin,isEveryOne,rightsType,isRightExt)
VALUES 
    ('salesList','./scm/invSaList.aspx?action=initSaleList','sales','销货','销货记录','invSaList',1,1,0,0,'QAEDCP',0)
    
GO 
INSERT INTO dbo.Menus
	(
	name,href,category,categoryName,Caption,fileName,sortid,isVisible,isAdmin,isEveryOne,rightsType,isRightExt)
VALUES 
    ('storagelist','./settings/storagelist.aspx','setting-base','设置-基础资料','仓库管理','storagelist',1,1,0,0,'QAEDCP',0)
    
GO 
    
INSERT INTO dbo.Menus
	(
	name,href,category,categoryName,Caption,fileName,sortid,isVisible,isAdmin,isEveryOne,rightsType,isRightExt)
VALUES 
    ('authority','./settings/authority.aspx','setting-advancedSetting','设置-高级设置','权限设置','authority',1,1,0,0,'QAEDCP',0)
    
GO 

INSERT INTO dbo.Menus (name, href, category, categoryName, caption, fileName, sortid, isVisible, isAdmin, isEveryOne, rightsType, isRightExt)
VALUES ('categorylist', './settings/categorylist.aspx', 'setting-base', '设置-基础资料', '商品类别管理', 'categorylist', 1, 1, 0, 0, 'QAEDCP', 0)
GO


INSERT INTO dbo.Menus (name, href, category, categoryName, caption, fileName, sortid, isVisible, isAdmin, isEveryOne, rightsType, isRightExt)
VALUES ('unitlist', './settings/unitlist.aspx', 'setting-auxiliary', '设置-辅助资料', '计量单位管理', 'unitlist', 1, 1, 0, 0, 'QAEDCP', 0)
GO

INSERT INTO dbo.Menus (name, href, category, categoryName, caption, fileName, sortid, isVisible, isAdmin, isEveryOne, rightsType, isRightExt)
VALUES ('customerlist', './settings/customerlist.aspx', 'setting-base', '设置-基础资料', '客户管理', 'customerlist', 1, 1, 0, 0, 'QAEDCP', 0)
GO

INSERT INTO dbo.Menus (name, href, category, categoryName, caption, fileName, sortid, isVisible, isAdmin, isEveryOne, rightsType, isRightExt)
VALUES ('salesdetail', './report/salesdetail.aspx', 'report-sales', '报表-销售明细表', '销售明细表', 'salesdetail', 1, 1, 0, 0, 'QP', 0)
GO

INSERT INTO dbo.Menus (name, href, category, categoryName, caption, fileName, sortid, isVisible, isAdmin, isEveryOne, rightsType, isRightExt)
VALUES ('purchasedetail', './report/purchasedetail.aspx', 'report-purchase', '报表-采购明细表', '采购明细表', 'purchasedetail', 1, 1, 0, 0, 'QP', 0)
GO

INSERT INTO dbo.Menus (name, href, category, categoryName, caption, fileName, sortid, isVisible, isAdmin, isEveryOne, rightsType)
VALUES ('Purchases', './scm/invPur.aspx?action=initPurchase', 'purchase', '购货', '购货单', 'invPur', 1, 1, 0, 0, 'QAEDCP')
GO

INSERT INTO dbo.Menus (name, href, category, categoryName, caption, fileName, sortid, isVisible, isAdmin, isEveryOne, rightsType)
VALUES ('PurchasesList', './scm/invPurList.aspx?action=initPurchaseList', 'purchase', '购货', '购货记录', 'invPurList', 1, 1, 0, 0, 'QP')
GO


INSERT INTO dbo.Menus (name, href, category, categoryName, caption, fileName, sortid, isVisible, isAdmin, isEveryOne, rightsType, isRightExt)
VALUES ('supplierlist', './settings/supplierlist.aspx', 'setting-base', '设置-基础资料', '供应商管理', 'supplierlist', 1, 1, 0, 0, 'QAEDCP', 0)
GO

INSERT INTO dbo.Menus (name, href, category, categoryName, caption, fileName, sortid, isVisible, isAdmin, isEveryOne, rightsType, isRightExt)
VALUES ('goodslist', './settings/goodslist.aspx', 'setting-base', '设置-基础资料', '商品管理', 'goodslist', 1, 1, 0, 0, 'QAEDCP', 0)
GO

IF OBJECT_id ('dbo.userRights') IS NOT NULL
	DROP TABLE dbo.userRights
GO

CREATE TABLE dbo.userRights
	(
	id   INT idENTITY NOT NULL,
	userName VARCHAR (50) NOT NULL,
	menuName VARCHAR (50) NOT NULL,
	rights   VARCHAR (20) NULL,
	CONSTRAINT IX_userRights UNIQUE (UserName,MenuName),
	CONSTRAINT PK_userRights PRIMARY KEY (id)
	)
GO



/*
CREATE TABLE dbo.userRights
	(
	name VARCHAR (50) NOT NULL,
	name VARCHAR (50) NOT NULL,
 	rightQ   SMALLINT NULL,
	rightA   SMALLINT NULL,
	rightE   SMALLINT NULL,
	rightD   SMALLINT NULL,
	rightC   SMALLINT NULL,
	rightP   SMALLINT NULL,
	CONSTRAINT PK_userRights PRIMARY KEY (name,name)
	)
GO
*/


/*

INSERT INTO dbo.userRights
	(
	name,
	name,
	rightQ,
	rightA,
	rightE,
	rightD,
	rightC,
	rightP
	)

VALUES ('demo', 'salesList', 1,1,1,1,1,1)
GO
*/
IF OBJECT_id ('dbo.V_UserRights') IS NOT NULL
	DROP VIEW dbo.V_UserRights
GO
/*
CREATE VIEW dbo.V_UserRights
AS
SELECT Menus.* ,UserRights.name ,rights
FROM UserRights ,Menus 
WHERE UserRights.name=Menus.name


GO



CREATE VIEW dbo.V_UserRights
AS
SELECT Menus.* ,UserRights.name ,rightQ, rightA, rightE, rightD, rightC, rightP
FROM UserRights ,Menus 
WHERE UserRights.name=Menus.name

GO
*/
IF OBJECT_id ('dbo.V_UserRights') IS NOT NULL
	DROP VIEW dbo.V_UserRights
GO
CREATE VIEW dbo.V_UserRights
AS
SELECT Menus.* ,UserRights.MenuName,UserRights.UserName ,rights,
(CASE WHEN CHARINDEX('Q',rights)>0 THEN 1  
    ELSE 0 END)AS rightQ,
(CASE WHEN CHARINDEX('A',rights)>0 THEN 1  
    ELSE 0 END)AS rightA,
(CASE WHEN CHARINDEX('E',rights)>0 THEN 1  
    ELSE 0 END)AS rightE,
(CASE WHEN CHARINDEX('D',rights)>0 THEN 1  
    ELSE 0 END)AS rightD,
(CASE WHEN CHARINDEX('C',rights)>0 THEN 1  
    ELSE 0 END)AS rightC,
(CASE WHEN CHARINDEX('P',rights)>0 THEN 1  
    ELSE 0 END)AS rightP
FROM Menus 
JOIN UserRights
on UserRights.MenuName=Menus.name


GO 

IF OBJECT_id ('dbo.V_SetRights') IS NOT NULL
	DROP VIEW dbo.V_SetRights
GO
CREATE VIEW dbo.V_SetRights
AS
SELECT Menus.* ,UserRights.UserName ,rights,
(CASE WHEN CHARINDEX('Q',rights)>0 THEN 1  
    ELSE 0 END)AS rightQ,
(CASE WHEN CHARINDEX('A',rights)>0 THEN 1  
    ELSE 0 END)AS rightA,
(CASE WHEN CHARINDEX('E',rights)>0 THEN 1  
    ELSE 0 END)AS rightE,
(CASE WHEN CHARINDEX('D',rights)>0 THEN 1  
    ELSE 0 END)AS rightD,
(CASE WHEN CHARINDEX('C',rights)>0 THEN 1  
    ELSE 0 END)AS rightC,
(CASE WHEN CHARINDEX('P',rights)>0 THEN 1  
    ELSE 0 END)AS rightP
FROM Menus 
JOIN  UserRights ON UserRights.MenuName=Menus.name

GO 

IF OBJECT_id ('dbo.V_AdminRights') IS NOT NULL
	DROP VIEW dbo.V_AdminRights
GO
CREATE VIEW dbo.V_AdminRights
AS
SELECT Menus.* ,'admin' AS UserName ,'Q,A,E,D,C,P' AS rights,
1 AS rightQ,
1 AS rightA,
1 AS rightE,
1 AS rightD,
1 AS rightC,
1 AS rightP
FROM Menus 

GO 

IF OBJECT_id ('dbo.spGetUserRightsEx') IS NOT NULL
	DROP PROCEDURE dbo.spGetUserRightsEx
GO

CREATE PROCEDURE spGetUserRightsEx
@UserName varchar(50)
AS 
BEGIN 


SELECT name, href, category, categoryName, caption, fileName, sortid, isVisible, isAdmin, isEveryOne, rightsType,@UserName ,'' AS rights,
0 AS rightQ,
0 AS rightA,
0 AS rightE,
0 AS rightD,
0 AS rightC,
0 AS rightP
FROM Menus WHERE name NOT IN (SELECT MenuName FROM dbo.userRights WHERE UserName = @UserName)
UNION ALL 

SELECT MenuName, href, category, categoryName, caption, fileName, sortid, isVisible, isAdmin, isEveryOne, rightsType ,UserName ,rights,
rightQ,
rightA,
rightE,
rightD,
rightC,
rightP
FROM V_UserRights
WHERE UserName = @UserName

ORDER BY category
END 

GO

IF OBJECT_id ('dbo.V_baseData') IS NOT NULL
	DROP VIEW dbo.V_baseData
GO

CREATE VIEW dbo.V_baseData
AS
SELECT *,'employee'AS baseTable FROM employee 

UNION 

SELECT *,'material' FROM material 

UNION 

SELECT *,'account' FROM account 

UNION 

SELECT *,'producer' FROM producer

UNION 

SELECT *,'receipt' FROM receipt

UNION 

SELECT *,'storage' FROM Storage   

UNION 

SELECT *,'unit' FROM unit 
GO