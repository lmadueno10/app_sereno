const fs=require('fs-extra');
const path=require('path');
const jimp =require('jimp');
const ffmpeg= require('ffmpeg');
/**
 * @param {object} req HttpRequest Object
 * @param {object} res HttpResponse Object
 * @param {object} next Object
 * 
 */
const signVideo=async (req,res,next)=>{
	try{
		const files=req.files;
        const video=(files&&files.video)?files.video[0]:undefined;
        const {fecha,hora}=req.body;
        if(video){
            //console.log(video);
            let fechaBar;
            if(fecha&&hora){
                fechaBar=new Date(fecha+' '+hora);
            }else{
                fechaBar= new Date();
            }
            
            const originalName=video.originalname;
            const finalName=video.filename;
            const dirPath=video.destination;
            const realName=video.path;
            const videoNameTemp='temp_'+finalName;
            const pathVideoNameTemp=path.join(dirPath,videoNameTemp);
            
            const imgBarName=new Date().getTime()+'.png';
            const imageBar=path.join(dirPath,'temp','bar.png');
            const imgBarResult=path.join(dirPath,'temp',imgBarName);

            //console.log(dirPath,finalName,realName);
            await fs.rename(realName,pathVideoNameTemp);
            await createBrand(fechaBar,imageBar,imgBarResult,pathVideoNameTemp,realName);
            //await brand(path.join(dirPath, originalName),fechaBar,imageBar,imgBarResult,realName);
           next();
            
            
        }else{
            next();
        }
	}catch(err){
	    console.error(err);
	}
}

const brand =async (nameVideo,nameImage,videoResult) => {
    try {
        console.log("Procesando video...");
        const p = new ffmpeg(nameVideo);
        p.then(function (video) {
            video.fnAddWatermark(nameImage, videoResult, {
                position : 'SW',margin_west:3,margin_sud:15
            }, function (error, file) {
                if (!error){
                    fs.unlink(nameImage);
                    fs.unlink(nameVideo);
                    console.log('Video was signed',file);
                }else{
                    fs.rename(nameVideo,videoResult);
                    console.log("error al firmar video\n",error);
                }
            });
        }, function (err) {
            fs.rename(nameVideo,videoResult);
            console.log('Error al cargar video: ' + err);
        });
    } catch (error) {
        fs.rename(nameVideo,videoResult);
        console.log('error al firmar video',error);
    }
}

const createBrand=async (fecha,imageBar,name,pathVideoNameTemp,realName)=>{
    console.log("creating bar...");
    let loadImage;
    const title='Registrado por el Software SGIE el '+getDateString(fecha);
    jimp.read(imageBar)
    .then(image=>{
       loadImage =image;
       return jimp.loadFont(jimp.FONT_SANS_16_WHITE)
    }).then(async font=>{
        loadImage.print(font,35,5,title).write(name);
        console.log(`${name} file created`);
        await brand(pathVideoNameTemp,name,realName);
    }).catch(err=>{
        console.log("Error al crear Imagen ",title,err);
    })
}

const getDateString =(fecha)=>{
    
    const horas=fecha.getHours();
    const anio=fecha.getFullYear();
    const dia=fecha.getDate();
    const am_pm=horas>=12?'pm':'am';
    let min=fecha.getMinutes();
    let mes=(fecha.getMonth()+1);
    let hora=horas%12;
    mes=mes<10?('0'+mes):mes;
    min=min<10?('0'+min):min;
    hora=hora?hora:12;
    return dia+'/'+mes+'/'+anio+' a las '+hora+':'+min+' '+am_pm;
}

module.exports=signVideo;