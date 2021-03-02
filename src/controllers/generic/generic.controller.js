class GenericController{
	async create(req,res,model,name){
		try{
			res.status(201).json({message:`${name} created`,data:'Data is empty'})
		}catch(err){	
			res.status(500).json({message:'Internal Error try again.'})
		}

	}

	async getAll(req,res,model){
		try{
			res.status(200).json({message:'Wellcome to app_sereno'})
		}catch(err){
			res.status(500).json({message:'Internal Error',data:err});
		}
	}

	async getById(req,res,model){
		try{
			res.status(200).json({data:'data is empty'});
		}catch(err){
			res.status(500).json({message:'Internal Error',data:err});
		}
	}

	async update(req,res,model,name){
		try{
			res.status(200).json({message:`${name} Updated`,code:200,data:updateModel})
		}catch(err){
			res.status(500).json({message:'Internal error',data:err});
		}
	}

	async delete(req,res,model,name){
		try{
			
			res.json({message:`${name} Eliminado`,code:200});
		}catch(err){
			res.status(500).json({message:'Internal Error',data:err});
		}
	}
}

module.exports=GenericController;