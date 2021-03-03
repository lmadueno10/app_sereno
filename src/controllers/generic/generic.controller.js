/**
 *Class to create generic controller for simple crud
 *@class
*/
class GenericController{
	/**
	 * @param {object} req HttpRequest Object
	 * @param {object} res HttpResponse Object
	 * @param {object} model (Optional)
	 * @param {String} name (Optional)
	 * @returns {JSONObject}
	 */
	async create(req,res,model,name){
		try{
			res.status(201).json({message:`${name} created`,data:'Data is empty'})
		}catch(err){	
			res.status(500).json({message:'Internal Error try again.'})
		}

	}
	/**
	 * @param {object} req HttpRequest Object
	 * @param {object} res HttpResponse Object
	 * @param {object} model (Optional)
	 * @returns {Array<JSONObject>}
	 */
	async getAll(req,res,model){
		try{
			res.status(200).json({message:'Wellcome to app_sereno'})
		}catch(err){
			res.status(500).json({message:'Internal Error',data:err});
		}
	}
	/**
	 * @param {object} req HttpRequest Object
	 * @param {object} res HttpResponse Object
	 * @param {object} model (Optional)
	 * @returns {JSONObject}
	 */
	async getById(req,res,model){
		try{
			res.status(200).json({data:'data is empty'});
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
	async update(req,res,model,name){
		try{
			res.status(200).json({message:`${name} Updated`,code:200,data:updateModel})
		}catch(err){
			res.status(500).json({message:'Internal error',data:err});
		}
	}
	/**
	 * @param {object} req HttpRequest Object
	 * @param {object} res HttpResponse Object
	 * @param {object} model (Optional)
	 * @param {String} name (Optional)
	 * @returns {JSONObject}
	 */
	async delete(req,res,model,name){
		try{
			
			res.json({message:`${name} Eliminado`,code:200});
		}catch(err){
			res.status(500).json({message:'Internal Error',data:err});
		}
	}
}

module.exports=GenericController;