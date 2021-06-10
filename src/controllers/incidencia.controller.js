const jwt= require('jsonwebtoken');
const GenericController = require('./generic/generic.controller.js');
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
 


}

module.exports=IncidenciaController;