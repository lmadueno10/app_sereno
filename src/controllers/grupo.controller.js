const GenericController = require('./generic/generic.controller.js');
/**
 * Class representing Controller.
 *
 * @class
 */
class GrupoController extends GenericController{

    /**
	 * @param {object} req HttpRequest Object
	 * @param {object} res HttpResponse Object
	 * @param {object} model (Optional)
	 * @returns {Array<JSONObject>}
	 */
	 async getPersonalDisponibleByIdgrupo(req,res,model){
        const {id}=req.params;
		try{
			const resp =await model.getPersonalDisponibleByIdgrupo(id);
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
	 async getPersonalAsignadoByIdgrupo(req,res,model){
        const {id}=req.params;
		try{
			const resp =await model.getPersonalAsignadoByIdgrupo(id);
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
	 * @param {String} name (Optional)
	 * @returns {JSONObject}
	 */
	async asignarPersonalGrupo(req,res,model){
		try{
			console.log(req.body);
			const resp=await model.asignarPersonal(req.body);
			if(resp.data){
				res.status(201).json({code:201,data:resp.data});
			}else{
				res.status(200).json({code:400,data:resp.data});
			}
			
		}catch(err){	
			console.error(err);
			res.status(500).json({code:500,data:err});
		}

	}

    /**
	 * @param {object} req HttpRequest Object
	 * @param {object} res HttpResponse Object
	 * @param {object} model (Optional)
	 * @param {String} name (Optional)
	 * @returns {JSONObject}
	 */
	async removePersonalGrupo(req,res,model){
		try{
			console.log(req.body);
			const resp=await model.deletePersonalGrupo(req.params.idGrupo,req.params.idPersonal);
			if(resp.data){
				res.status(201).json({code:201,data:resp.data});
			}else{
				res.status(200).json({code:400,data:resp.data});
			}
			
		}catch(err){	
			console.error(err);
			res.status(500).json({code:500,data:err});
		}
	}
}

module.exports=GrupoController;