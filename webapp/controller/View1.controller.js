sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/Filter"
], function (Controller, Mt, Filter) {
	"use strict";
	var url = "/sap/opu/odata/sap/ZSAPUI5_USERS_SRV/";

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

		if (data.Estado === "01") {
			vista.byId("estadoTransporte").setState("Success");
		} else if (data.Estado === "02") {
			vista.byId("estadoTransporte").setState("Warning");
		} else if (data.Estado === "03") {
			vista.byId("estadoTransporte").setState("Error");
		}
		vista.byId("estadoTransporte").setInverted(true);
	}

	return Controller.extend("app.AppTest.controller.View1", {
		onInit: function () {},

		onSearch: function () {
			var view = this.getView();
			view.byId("selectEstados").setValue(null);

			var vTransporte = this.byId("buscarTransporte").getValue();

			var oModel = new sap.ui.model.odata.ODataModel(url, {
				json: true,
				loadMetadataAsync: true
			});

			var oNuevoEstadoTransporte = {};

			oNuevoEstadoTransporte.Transporte = vTransporte;

			oModel.read("/estadoSet(Transporte='" + vTransporte + "')", {
				success: function (res) {
					if (res.Error === "X") {
						sinTransporte(view, res);
					} else {
						conTransporte(view, res);
					}
				},
				error: function (err) {
					Mt.show("Error obteniendo los datos");
				}
			});
		},
		onPress: function () {

			var oModel = new sap.ui.model.odata.ODataModel(url, {
				json: true,
				loadMetadataAsync: true
			});

			var view = this.getView();
			var vTransporte = this.byId("buscarTransporte").getValue();
			var vEstado = this.byId("selectEstados").getSelectedItem().getKey();

			var oNuevoEstadoTransporte = {};

			oNuevoEstadoTransporte.Transporte = vTransporte;
			oNuevoEstadoTransporte.Estado = vEstado;
			var vEntidad = "/updEstadoSet";

			oModel.create(vEntidad, oNuevoEstadoTransporte, {
				success: function (res) {
					if (res.Error === "X") {
						Mt.show(res.Descripcion);
					} else {
						Mt.show("Transporte actualizado correctamente");
						conTransporte(view, res);
					}
				},
				error: function (err) {
					Mt.show("Error actualizando transporte");
				}
			});

		}
	});
});