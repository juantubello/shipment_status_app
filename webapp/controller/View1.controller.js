sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageToast",
		"sap/ui/model/Filter"
	], function (Controller, Mt, Filter) {
		"use strict";

		function sinTransporte(vista, data) {
			Mt.show("No existe el transporte " + data.Transporte);
			vista.byId("numeroTransporte").setText("");
			vista.byId("estadoTransporte").setText("");
			vista.byId("selectEstados").setEnabled(false);
			vista.byId("selectEstados").setSelectedItem(null);
			vista.byId("botonActualizar").setEnabled(false);
		}

		function conTransporte(vista, data) {
			vista.byId("botonActualizar").setEnabled(true);
			vista.byId("numeroTransporte").setInverted(true);
			vista.byId("selectEstados").setEnabled(true);
			vista.byId("numeroTransporte").setText(data.Transporte);
			vista.byId("estadoTransporte").setText(data.Descripcion.toUpperCase());

			if (oData.Estado === "01") {
				vista.byId("estadoTransporte").setState("Success");
			} else if (oData.Estado === "02") {
				vista.byId("estadoTransporte").setState("Warning");
			} else if (oData.Estado === "03") {
				vista.byId("estadoTransporte").setState("Error");
			}
			vista.byId("estadoTransporte").setInverted(true);

		}

		return Controller.extend("app.AppTest.controller.View1", {
			onInit: function () {

			},

			onSearch: function () {
				var view = this.getView();

				view.byId("selectEstados").setValue(null);
				var vTransporte = this.byId("buscarTransporte").getValue();
				// eslint-disable-next-line no-console
				console.log(vTransporte);

				var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZSAPUI5_USERS_SRV/", {
					json: true,
					loadMetadataAsync: true
				});

				oModel.read("/estadoSet(Transporte='" + vTransporte + "')", {
					success: function (oData) {
						// eslint-disable-next-line no-console
						console.log(oData.Estado);
						if (oData.Error === "X") {
							sinTransporte(view, oData);
						} else {
							conTransporte(view, oData);
						}
					},
					error: function (err) {
						// eslint-disable-next-line no-console
						console.log(err);
					}
				});
			}

		});
	}

);