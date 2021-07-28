const GenericController = require('./generic/generic.controller.js');
const pdf= require('html-pdf');
const path= require('path');
/**
 * Class representing Controller.
 *
 * @class
 */
class IncidenciaController extends GenericController{

    /**
	 * @param {object} req HttpRequest Object
	 * @param {object} res HttpResponse Object
	 * @param {object} model (Optional)
	 * @returns {Array<JSONObject>}
	 */
	async getAllIncidenciaByIdPersonal(req,res,model){
        const {id}=req.params;
		try{
			const resp =await model.getIncidentByIdPersonalAsignado(id);
			if(resp){
				res.status(200).json({data:resp});
			}else{
				res.status(404).json({});
			}
		}catch(err){
			res.status(500).json({message:'Internal Error',data:err});
		}
	}

	    /**
	 * @param {object} req HttpRequest Object
	 * @param {object} res HttpResponse Object
	 * @param {object} model (Optional)
	 * @returns {Array<JSONObject>}
	 */
		 async getIncidentByIdIncident(req,res,model){
			const {id}=req.params;
			try{
				const resp =await model.getIncidentByIdIncident(id);
				const dir=__dirname;
				let imgPath=path.join(dir,'../public/img/');
				imgPath=path.normalize(imgPath);
				const pthArray=imgPath.toString().split("\\");
				let baseImg=``;
				pthArray.map((e,i)=>{
					if((i+1)<pthArray.length){
						baseImg+=e+'/';
					}else{
						baseImg+=e;
					}
				})
				const template=this.getHtmlTempate(resp);
				const options = {
					"format": 'A4',
					"header": {
						"height": "59px"
					},
					"footer": {
						"height": "20mm"
					},
					"border": {          // default is 0, units: mm, cm, in, px
						"right": "0.5in",
						"left": "1in"
					  },
					  "base":`file:///${baseImg}`,
					  "localUrlAccess" : true,
				   };

				pdf.create(template,options).toStream(function(err, stream){
					stream.pipe(res);
				  });
				/*
				if(resp){
					res.status(200).json({data:resp});
				}else{
					res.status(404).json({});
				}
				*/
			}catch(err){
				console.log(err);
				res.status(500).json({message:'Internal Error',data:err});
			}
		}

    /**
	 * @param {object} req HttpRequest Object
	 * @param {object} res HttpResponse Object
	 * @param {object} model (Optional)
	 * @returns {Array<JSONObject>}
	 */
	async getAllIncidenciaByIdUsuarioRep(req,res,model){
        const {id}=req.params;
		try{
			const resp =await model.getIncidentByIdUserReporter(id);
			if(resp){
				res.status(200).json({data:resp});
			}else{
				res.status(404).json({});
			}
		}catch(err){
			res.status(500).json({message:'Internal Error',data:err});
		}
	}

	/**
	 * @param {object} req HttpRequest Object
	 * @param {object} res HttpResponse Object
	 * @param {object} model (Optional)
	 * @returns {Array<JSONObject>}
	 */
	 async getAllIncidenciaByIdUsuarioRep(req,res,model){
        const {id}=req.params;
		try{
			const resp =await model.getIncidentByIdUserReporter(id);
			if(resp){
				res.status(200).json({data:resp});
			}else{
				res.status(404).json({});
			}
		}catch(err){
			res.status(500).json({message:'Internal Error',data:err});
		}
	}

	/**
	 * @param {object} req HttpRequest Object
	 * @param {object} res HttpResponse Object
	 * @param {object} model (Optional)
	 * @returns {Array<JSONObject>}
	 */
	 async getCantidadIncidenciaRegHoy(req,res,model){
		try{
			const resp =await model.getCantIncidenciaHoy();
			if(resp){
				res.status(200).json({data:resp});
			}else{
				res.status(404).json({});
			}
		}catch(err){
			res.status(500).json({message:'Internal Error',data:err});
		}
	}

	/**
	 * @param {object} req HttpRequest Object
	 * @param {object} res HttpResponse Object
	 * @param {object} model (Optional)
	 * @returns {Array<JSONObject>}
	 */
	 async getCantIncidenciaUltimaHora(req,res,model){
		try{
			const resp =await model.getCantIncidenciaUltimaHora();
			if(resp){
				res.status(200).json({data:resp});
			}else{
				res.status(404).json({});
			}
		}catch(err){
			res.status(500).json({message:'Internal Error',data:err});
		}
	}

	/**
	 * @param {object} req HttpRequest Object
	 * @param {object} res HttpResponse Object
	 * @param {object} model (Optional)
	 * @returns {Array<JSONObject>}
	 */
	 async getCantIncidenciaUltimosSieteDias(req,res,model){
		try{
			const resp =await model.getCantIncidenciaUltimosSieteDias();
			if(resp){
				res.status(200).json({data:resp});
			}else{
				res.status(404).json({});
			}
		}catch(err){
			res.status(500).json({message:'Internal Error',data:err});
		}
	}

	/**
	 * @param {object} req HttpRequest Object
	 * @param {object} res HttpResponse Object
	 * @param {object} model (Optional)
	 * @returns {Array<JSONObject>}
	 */
	 async getCantIncidenciasByEstado(req,res,model){
		 const estado=req.query.estado;
		try{
			const resp =await model.getCantIncidenciasByEstado(estado);
			if(resp){
				res.status(200).json({data:resp});
			}else{
				res.status(404).json({});
			}
		}catch(err){
			res.status(500).json({message:'Internal Error',data:err});
		}
	}

	/**
	 * @param {object} req HttpRequest Object
	 * @param {object} res HttpResponse Object
	 * @param {object} model (Optional)
	 * @returns {Array<JSONObject>}
	 */
	 async getCatIncidenciaMasRep(req,res,model){
	   //try{
		   const resp =await model.getCatIncidenciaMasRep();
		   if(resp){
			   res.status(200).json({data:resp});
		   }else{
			   res.status(404).json({});
		   }
	   //}catch(err){
		//   res.status(500).json({message:'Internal Error',data:err});
	   //}
   }

   /**
	 * @param {object} req HttpRequest Object
	 * @param {object} res HttpResponse Object
	 * @param {object} model (Optional)
	 * @returns {Array<JSONObject>}
	 */
	 async getCantPromIncidenciaAtendidaHora(req,res,model){
		try{
			const resp =await model.getCantPromIncidenciaAtendidaHora();
			if(resp){
				res.status(200).json({data:resp});
			}else{
				res.status(404).json({});
			}
		}catch(err){
			res.status(500).json({message:'Internal Error',data:err});
		}
	}

	/**
	 * @param {object} req HttpRequest Object
	 * @param {object} res HttpResponse Object
	 * @param {object} model (Optional)
	 * @returns {Array<JSONObject>}
	 */
	 async getDataDashboard(req,res,model){
		try{
			Promise.all([
				model.getCantIncidenciaHoy(),
				model.getCantIncidenciaUltimaHora(),
				model.getCantIncidenciaUltimosSieteDias(),
				model.getCantIncidenciasByEstado(2),
				model.getCantIncidenciasByEstado(1),
				model.getCantPromIncidenciaAtendidaHora(),
				model.getCatIncidenciaMasRep()
			]).then(value=>{
					const cantIncidenciaHoy=value[0].cant;
					const cantIncidenciaUltimaHora=value[1].count;
					const cantIncidenciaUtimosSieteDias=value[2].count;
					const cantIncidenciaAtendidas=value[3].count;
					const cantIncidenciaPendientes=value[4].count;
					const promIncidenciaAtendidaHora=value[5].prom;
					const cateIncidenciaMasReportada=value[6].clasificacion;
					const cantCateIncidenciaMasReportada=value[6].cant;
					const dashboardData={
						cantIncidenciaHoy,
						cantIncidenciaUltimaHora,
						cantIncidenciaUtimosSieteDias,
						cantIncidenciaAtendidas,
						cantIncidenciaPendientes,
						promIncidenciaAtendidaHora,
						cateIncidenciaMasReportada,
						cantCateIncidenciaMasReportada
					}
					res.status(200).json({data:dashboardData});
				}).catch(err=>{
					console.log(err);
					res.status(500).json({message:'Internal Error',data:err});
				});
		}catch(err){
			console.error(err);
			res.status(500).json({message:'Internal Error',data:err});
		}
	}
 
	getHtmlTempate(data){
		//if(data.length==1){
			const tmpIncident=data[0];
			const datePrint= new Date();
			const dir=__dirname;
			let indexImage=1;
			let imgPath=path.join(dir,'../public/img/logo_brand.png');
			imgPath=path.normalize(imgPath);
			const pthArray=imgPath.toString().split("\\");
			let baseImg=``;
			pthArray.map((e,i)=>{
				if((i+1)<pthArray.length){
					baseImg+=e+'/';
				}else{
					baseImg+=e;
				}
			})
			
			console.log("PATH",imgPath);
			const tmp1=`<!DOCTYPE html>
			<html lang="es">
			<head>
				<meta charset="UTF-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Reporte Incidencia</title>
				<style>
					body{
						margin: 0 auto;
						padding: 0;
					}
					main {
						min-height: 260mm;
						font-family: sans-serif;
					}
					.brand {
						display: block;
						height: auto;
						margin: 20px auto;
						width: 300px;
						margin-bottom:550px;
			
					}
					.info div:nth-child(2) {
						border-left: 4px solid black;
						border-right: 4px solid black;
					}
					.info div {
						display: inline-block;
						padding: 20px 5px;
						width: 30%;
					}
					footer {
						width: 100%;
					}
			
					footer * {
						text-align: center;
					}
					h4 {
						text-align: center;
					}
					table *{
						font-size:.8rem;
					}
					table {
						width: 100%;
						border-collapse: collapse;
					}
					td {
						border: 1px solid black;
						padding: 5px 0 10px 5px;
					}
					.brand-header{
						background-image: url('logo_brand.png');
						background-position: center;
						background-size: contain;
						background-repeat: no-repeat;
					}
				</style>
			</head>
			<body>
				<div>
					<main>
						<img class="brand" src="logo_brand.png" alt="Logo">
						<footer>
							<hgroup>
								<h5>INFORME CIERRE INCIDENCIA</h5>
								<h5>N° ${tmpIncident.id_incidencia}</h5>
							</hgroup>
							<div class="info">
								<div>
									<h5>CREADO POR</h5>
									<p>Municipalidad Metropolitana de Lima</p>
								</div>
								<div>
									<h5>FECHA DE IMPRESION</h5>
									<p>${datePrint.getDate()<9?'0'+datePrint.getDate():datePrint.getDate()}/${(datePrint.getMonth()+1)<9?'0'+(datePrint.getMonth()+1):(datePrint.getMonth()+1)}/${datePrint.getFullYear()}  ${datePrint.getHours()<9?'0'+datePrint.getHours():datePrint.getHours()}:${datePrint.getMinutes()<9?'0'+datePrint.getMinutes():datePrint.getMinutes()}</p>
								</div>
								<div>
									<h5>VERSION</h5>
									<p>1</p>
								</div>
							</div>
						</footer>
					</main>
					<main>
                    <h4 style="margin-top: 0;padding-top: 0;text-decoration: underline;">INFORME N° ${tmpIncident.id_incidencia}</h4>
                    <h5>DATOS GENERALES</h5>
                    <table>
                        <tr>
                            <td colspan="2">
                                <b>Fecha y hora de registro de incidencia<b>
                            </td>
                            <td colspan="2">${tmpIncident.fecha_hora_reg_inc}</td>
                        </tr>
                        <tr>
                            <td><b> Apellidos y nombres</b></td>
                            <td style="height:40px;">${tmpIncident.nombre_ciudadano?tmpIncident.nombre_ciudadano:tmpIncident.nomb_ap_perso_rep}</td>
                            <td><b>Nro Teléfono</b></td>
                            <td>${tmpIncident.telefono_ciudadano?tmpIncident.telefono_ciudadano:tmpIncident.celular_perso_rep}</td>
                        </tr>
                        <tr>
                            <td><b>Clasificacion</b></td>
                            <td>${tmpIncident.clasificacion}</td>
                            <td><b>Tipo</b></td>
                            <td>${tmpIncident.tipo}</td>
                        </tr>
                        <tr>
                            <td><b>Subtipo</b></td>
                            <td>${tmpIncident.subtipo?tmpIncident.subtipo:''}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td colspan="4"><b>Descripción de la incidencia</b></td>
                        </tr>
                        <tr style="height:90px;vertical-align:top">
                            <td colspan="4">
							${tmpIncident.descripcion}
							</td>
                        </tr>
                        <tr>
                            <td colspan="4"><b>Dirección</b></td>
                        </tr>
                        <tr style="height:70px;vertical-align:top">
                            <td colspan="4">
								${tmpIncident.direccion}
                            </td>
                        </tr>
                        <tr>
                            <td><b>Nro</b></td>
                            <td><b>Interior</b></td>
                            <td><b>Lote</b></td>
                            <td rowspan="2"></td>
                        </tr>
                        <tr>
                            <td>${tmpIncident.nro_direccion?tmpIncident.nro_direccion:'-'}</td>
                            <td>${tmpIncident.interior?tmpIncident.interior:'-'}</td>
                            <td>${tmpIncident.lote?tmpIncident.lote:'-'}</td>
                        </tr>
                        <tr><td colspan="4"><b>Referencia</b></td></tr>
                        <tr style="height:70px;vertical-align:top">
                            <td colspan="4">
                                ${tmpIncident.referencia?tmpIncident.referencia:'-'}
                            </td>
                        </tr>
                    </table>
                    <h5>DATOS DE LA ATENCIÓN DE LA INCIDENCIA</h5>
                    <table>
                        <tr>
                            <td colspan="2"><b>Fecha de asignación de sereno</b></td>
                            <td colspan="2">${tmpIncident.fecha_hora_reg_inc}</td>
                        </tr>
                        <tr>
                            <td colspan="4"><b>
                                    USUARIO QUE REGISTRO LA INCIDENCIA:</b></td>
                        </tr>
                        <tr>
                            <td><b>Código</b></td>
                            <td><b>Nombres y apellidos</b></td>
                            <td><b>DNI</b></td>
                            <td><b>Celular</b></td>
                        </tr>
                        <tr>
                            <td>${tmpIncident.codigo_usu_reg!=null?tmpIncident.codigo_usu_reg:tmpIncident.codigo_perso_rep?tmpIncident.codigo_perso_rep:'-'}</td>
                            <td>${tmpIncident.nomb_ap_usu_reg!=null?tmpIncident.nomb_ap_usu_reg:tmpIncident.nomb_ap_perso_rep?tmpIncident.nomb_ap_perso_rep:'-'}</td>
                            <td>${tmpIncident.dni_usu_reg!=null?tmpIncident.dni_usu_reg:tmpIncident.dni_perso_rep?tmpIncident.dni_perso_rep:'-'}</td>
                            <td>${tmpIncident.celular_usu_reg!=null?tmpIncident.celular_usu_reg:tmpIncident.celular_perso_rep?tmpIncident.celular_perso_rep:'-'}</td>
                        </tr>
                        <tr>
                            <td colspan="4"><b>USUARIO QUE ASIGNÓ LA INCIDENCIA</b></td>
                        </tr>
                        <tr>
                            <td><b>Código</b></td>
                            <td><b>Nombres y apellidos</b></td>
                            <td><b>DNI</b></td>
                            <td><b>Celular</b></td>
                        </tr>
                        <tr>
						<td>${tmpIncident.codigo_usu_reg!=null?tmpIncident.codigo_usu_reg:tmpIncident.codigo_perso_rep?tmpIncident.codigo_perso_rep:'-'}</td>
						<td>${tmpIncident.nomb_ap_usu_reg!=null?tmpIncident.nomb_ap_usu_reg:tmpIncident.nomb_ap_perso_rep?tmpIncident.nomb_ap_perso_rep:'-'}</td>
						<td>${tmpIncident.dni_usu_reg!=null?tmpIncident.dni_usu_reg:tmpIncident.dni_perso_rep?tmpIncident.dni_perso_rep:'-'}</td>
						<td>${tmpIncident.celular_usu_reg!=null?tmpIncident.celular_usu_reg:tmpIncident.celular_perso_rep?tmpIncident.celular_perso_rep:'-'}</td>
                        </tr>
                        <tr>
                            <td colspan="4"><b>PERSONAL DE CAMPO ASIGNADO A LA INCIDENCIA</b></td>
                        </tr>
                        <tr>
                            <td><b>Código</b></td>
                            <td><b>Nombres y apellidos</b></td>
                            <td><b>DNI</b></td>
                            <td><b>Celular</b></td>
                        </tr>`;
					let tmp2=``;
					if(data.length>1){
						data.map(inc=>{
							tmp2+=`
						<tr>
						<td>${inc.codigo_usu_grup}</td>
						<td>${inc.nomb_ap_usu_grup}</td>
						<td>${inc.dni_usu_grup}</td>
						<td>${inc.celular_usu_grup}</td>
						</tr>
							`;
						});
					}else{
						tmp2=`
						<tr>
						<td>${tmpIncident.codigo}</td>
						<td>${tmpIncident.nombres_apellidos}</td>
						<td>${tmpIncident.dni}</td>
						<td>${tmpIncident.celular}</td>
						</tr>
						`;
					}
					const tmp3=`
					<tr>
						<td colspan="4"><b>ESTADO DE ATENCIÓN DE LA INCIDENCIA</b></td>
					</tr>
					<tr>
						<td><b>Estado</b></td>
						<td colspan="2"><b>Descripción</b></td>
						<td><b>Fecha</b></td>
					</tr>
					<tr>
						<td>Pendiente</td>
						<td colspan="2">La incidencia se encuentra registrada, pero aún no está
							asignada a un personal de campo</td>
						<td>${tmpIncident.fecha_hora_reg_inc}</td>
					</tr>
					<tr>
						<td>En proceso</td>
						<td colspan="2">La incidencia ya tiene asignado personal de
							campo(serenos), pero aún no ha sido atendida</td>
						<td>${tmpIncident.fecha_hora_reg_inc}</td>
					</tr>
					<tr>
						<td>atendido</td>
						<td colspan="2">El personal de campo asignado acudió al lugar de los
							hechos para verificar, brindar una solución y cerrar el
							caso</td>
						<td>${tmpIncident.fecha_cc}</td>
					</tr>
					<tr>
						<td colspan="4"><B>PERSONAL DE CAMPO QUE CERRÓ LA INCIDENCIA</B></td>
					</tr>
					<tr>
						<td><b>Código</b></td>
						<td><b>Nombres y apellidos</b></td>
						<td><b>DNI</b></td>
						<td><b>Celular</b></td>
					</tr>
					<tr>
						<td>${tmpIncident.codigo_per_cc?tmpIncident.codigo_per_cc:''}</td>
						<td>${tmpIncident.nomb_ap_per_cc?tmpIncident.nomb_ap_per_cc:''}</td>
						<td>${tmpIncident.dni_per_cc?tmpIncident.dni_per_cc:''}</td>
						<td>${tmpIncident.celular_per_cc?tmpIncident.celular_per_cc:''}</td>
					</tr>
				</table>
			</main>
			<main>
				<h5><b>GEOREFERENCIACIÓN DE LA INCIDENCIA</b></h5>
				<h5><b>REGISTRO DE INCIDENCIA</B></h5>
				<img src="http://localhost:${process.env.PORT}/img/map.jpg" style="width:500px;height:350px;display:block;margin:0 auto"/>
				<h6 style="text-align:center;margin-top:0"><b>Img 01 Ubicación de la incidencia</b></h6>
				`;
			let tmp4=``;
			if(tmpIncident.image){
				indexImage++;
				tmp4=`
				<h5><b>EVIDENCIAS MULTIMEDIA REPORTADA EN EL REGISTRO DE LA INCIDENCIA</b></h5>
				<img style="height:400px;width:auto;margin:0 auto; display:block;" src="http://localhost:${process.env.PORT}/${tmpIncident.image}"/>
				<h6 style="text-align:center;margin-top:0;"><b>Img 0${indexImage} Evidencia reportada nro. 1</b></h6>
				`;
			}
			if(tmpIncident.video||tmpIncident.audio){
				tmp4+=`
				<h5><b>Otros:</b></h5>
				<ul>
				`;
				if(tmpIncident.video){
				tmp4+=`
					<li>1 video</li>
				`
				}
				if(tmpIncident.audio){
					tmp4+=`
					<li>1 audio</li>
					`
				}
				tmp4+=`
				</ul>
				`
			}
			if(tmpIncident.ev_image){
				indexImage++;
				tmp4+=`
				<h5><b>EVIDENCIAS MULTIMEDIA REPORTADA EN EL CIERRE DE LA INCIDENCIA</b></h5>
				<img style="height:400px;width:auto;margin:0 auto; display:block;" src="http://localhost:${process.env.PORT}/${tmpIncident.ev_image}"/>
				<h6 style="text-align:center;margin-top:0"><b>Img 0${indexImage} Evidencia de cierre nro. 1</b></h6>
				`;
			}
			const tmp5=
				`
			</main>
			
			<div id="pageHeader-first"></div>
		<div id="pageFooter" style="text-align:right">{{page}}</div>
		<div id="pageFooter-first"></div>
		</div>
		</body>
		</html>
		<div id="pageHeader" style="padding-bottom: 5px;">
            <p style="display: inline-block; margin: 0; padding-top: 12px; padding-bottom: 5px; text-align: left; font-family: sans-serif; font-size: .85em;width: 30%;">
                Informe de Incidencia N° <b>${tmpIncident.id_incidencia}</b>
            </p>
            <p class="brand-header" style="margin:0;padding:0;width: 33%;height:55px;text-align: center; display: inline-block;">
				<img src="file:///${baseImg}" style="height:55px;margin:0;padding:0; width:auto" alt="logo"/>
            </p>
            <p
                style="display: inline-block; margin: 0; padding-top: 12px; padding-bottom: 5px; text-align: right; font-family: sans-serif; font-size: .85em;width: 30%;">
                ${datePrint.getDate()<9?'0'+datePrint.getDate():datePrint.getDate()}/${(datePrint.getMonth()+1)<9?'0'+(datePrint.getMonth()+1):(datePrint.getMonth()+1)}/${datePrint.getFullYear()}
            </p>
        </div>
		`;
		return tmp1+tmp2+tmp3+tmp4+tmp5;
	}

}

module.exports=IncidenciaController;