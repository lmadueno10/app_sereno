const GenericController=require('./generic/generic.controller');
const {pool} = require('../database.js');
class SeguridadController extends GenericController{
	async getAll(req,res,model){
		try{
			res.status(200).json({message:'Wellcome to app_sereno',data:'data is empty'})
		}catch(err){
			console.error(err);
			res.status(500).json({message:'Internal Error',data:err});
		}
	}

	async testingDB(req,res,model){
		try{
			const temp = await pool.query("SELECT ST_AsGeoJSON(ST_MakePolygon( ST_GeomFromText('LINESTRING(75 29,77 29,77 29, 75 29)')));");
			res.status(200).json({data:temp.rows});
		}catch(err){
			console.error(err);
			res.status(500).json({message:'Internal Error',data:err});
		}

	}
}

module.exports=SeguridadController;