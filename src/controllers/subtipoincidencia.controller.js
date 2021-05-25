const GenericController = require('./generic/generic.controller.js');
/**
 * Class representing Controller.
 *
 * @class
 */
class SubtipoIncidenciaController extends GenericController{

    /**
	 * @param {object} req HttpRequest Object
	 * @param {object} res HttpResponse Object
	 * @param {object} model (Optional)
	 * @returns {Array<JSONObject>}
	 */
	async getAllSubtipoByIdTipo(req,res,model){
		try{
            const {id}=req.params;
			const resp =await model.getAllSubtipoByIdTipo(id);
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

module.exports=SubtipoIncidenciaController;