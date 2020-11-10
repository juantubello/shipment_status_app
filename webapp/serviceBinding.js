function initModel() {
	var sUrl = "/sap/opu/odata/sap/ZSAPUI5_USERS_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}