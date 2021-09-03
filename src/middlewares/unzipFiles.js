const fs=require('fs-extra');
const path=require('path');
const {exec } = require('child_process');
const FtpUtil = require('../utils/ftp.util');
/**
 * @param {object} req HttpRequest Object
 * @param {object} res HttpResponse Object
 * @param {object} next Object
 * 
 */
const unzipFiles=async (req,res,next)=>{
	try{
		const files=req.files;
        const file=(files&&files.fileZip)?files.fileZip[0]:undefined;
        const {fecha,hora,imageNames,videoNames,idPersonal}=req.body;
        if(file){
            console.log("FILE ZIP ",file);
            console.log("FECHA_HORA:",fecha,hora);
            console.log("FILES_NAMES",imageNames,videoNames);
            const listVideoNames=videoNames.split("|");
            const destinationPath=path.join(__dirname,'../public','evidencia','temp/');
            console.log("Extraenedo archivos.")
            const command1 =`"%ProgramFiles%\\WinRAR\\winrar.exe" x -ibck ${file.path} *.* ${destinationPath} -y`;
            exec(command1,(err)=>{
                if(err){
                    console.log("Ocurrio un error al Extraer archivos",err);
                }else{
                    console.log("Archivos extraidos");
                    listVideoNames.forEach(video=>{
                        if(video)
                            FtpUtil.singVideoFromPostRequest(video,`${fecha} ${hora}`,idPersonal);
                    })
                }
            });  


           next();
            
        }else{
            next();
        }
	}catch(err){
	    console.error(err);
	}
}
module.exports=unzipFiles;