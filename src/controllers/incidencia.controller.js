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
}

module.exports=IncidenciaController;