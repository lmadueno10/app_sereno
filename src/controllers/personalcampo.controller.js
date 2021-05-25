const GenericController = require('./generic/generic.controller.js');
/**
 * Class representing Controller.
 *
 * @class
 */
class PersonalCampoController extends GenericController{

    async create(req,res,usuarioModel,personalModel){
		try{
            const {
                nombres_apellidos,
                dni,
                celular,
                codigo,
                id_supervisor,
                sector ,
                usuario,
                contrasenia,
                EMEI}=req.body;

			const resp=await usuarioModel.create({codigo, dni, nombres_apellidos, celular, sector, usuario, contrasenia, id_supervisor});
            const id_usuario=resp.data.id_usuario;
            const result=await personalModel.create({id_usuario:id_usuario,EMEI:EMEI});

			if(result.data){
				res.status(201).json({code:201,data:result.data});
			}else{
				res.status(200).json({code:400,data:result.data});
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
	 * @returns {JSONObject}
	 */
	async update(req,res,usuarioModel,personalModel){
		try{
            const {
                id_usuario,
                nombres_apellidos,
                dni,
                celular,
                codigo,
                id_supervisor,
                sector ,
                usuario,
                contrasenia,
                emei}=req.body;
			console.log("Body",req.body);
			const resp=await usuarioModel.update({nombres_apellidos,dni,celular,codigo,id_supervisor,sector ,usuario,contrasenia},id_usuario);
            console.log("Usu updated",resp)
			const result =await personalModel.update({emei},req.params.id)
			if(result.data){
				res.status(201).json({code:201,data:result.data});
			}else{
				res.status(200).json({code:400,data:result.data});
			}
			
	}catch(err){	
			res.status(500).json({code:500,data:err});
	}
	}

}

module.exports=PersonalCampoController;