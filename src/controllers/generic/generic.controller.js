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
	async create(req,res,model){
		try{
			const resp=await model.create(req.body);
			if(resp.data){
				res.status(201).json({code:201,data:resp.data});
			}else{
				res.status(200).json({code:400,data:resp.data});
			}
			
		}catch(err){	
			res.status(500).json({code:500,data:err});
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
			const resp =await model.getAll();
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
	 * @returns {JSONObject}
	 */
	async getById(req,res,model){
		try{
			const resp=await model.getById(req.params.id);
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
	async update(req,res,model){
		try{
			const resp=await model.update(req.body,req.params.id);
			if(resp.data){
				res.status(201).json({code:201,data:resp.data});
			}else{
				res.status(200).json({code:400,data:resp.data});
			}
			
		}catch(err){	
			res.status(500).json({code:500,data:err});
		}
	}
	/**
	 * @param {object} req HttpRequest Object
	 * @param {object} res HttpResponse Object
	 * @param {object} model (Optional)
	 * @param {String} name (Optional)
	 * @returns {Object}
	 */
	async delete(req,res,model,name){
		try{
			const resp=await model.delete(req.params.id);
			if(res.data){
				res.json({message:`${name} Eliminado`,code:200});
			}else{
				res.status(204).json({});
			}
		}catch(err){
			res.status(500).json({message:'Internal Error',data:err});
		}
	}
}

module.exports=GenericController;