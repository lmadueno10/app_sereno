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
        const video=files.video[0];
        const {fecha,hora}=req.body;
        if(video){
            //console.log(video);
            let fechaBar;
            if(fecha&&hora){
                fechaBar=new Date(fecha+' '+hora);
            }else{
                fechaBar= new Date();
            }
            //console.log(video);
            const originalName=video.originalname;
            const finalName=video.filename;
            const dirPath=video.destination;
            const realName=video.path;
            const imgBarName=new Date().getTime()+'.png';
            const imageBar=path.join(dirPath,'temp','bar.png');
            const imgBarResult=path.join(dirPath,'temp',imgBarName);
            //console.log(dirPath,finalName,realName);
            await fs.rename(realName,path.join(dirPath,originalName));
            await brand(path.join(dirPath, originalName),fechaBar,imageBar,imgBarResult,realName);
            

        }
	}catch(err){
	    console.error(err);
	}
    next();
}

const brand =async (nameVideo,fecha,imageBar,nameImage,videoResult) => {
    try {
        const p = new ffmpeg(nameVideo);
        await createBrand(fecha,imageBar,nameImage);
        console.log("Procesando video...");
        p.then(function (video) {
            video.fnAddWatermark(nameImage, videoResult, {
                position : 'SE',margin_west:3
            }, function (error, file) {
                if (!error){
                    fs.unlink(nameImage);
                    fs.unlink(nameVideo);
                    console.log('New video file: ' + file);
                }else{
                    fs.rename(nameVideo,videoResult);
                }
            });
        }, function (err) {
            fs.rename(nameVideo,videoResult);
            console.log('Error: ' + err);
        });
    } catch (error) {
        fs.rename(nameVideo,videoResult);
        console.log(error);
    }
}

const createBrand=(fecha,imageBar,name)=>{
    console.log("creating bar...");
    let loadImage;
    const title='Registrado por el Software SGIE el '+getDateString(fecha);
    jimp.read(imageBar)
    .then(image=>{
       loadImage =image;
       return jimp.loadFont(jimp.FONT_SANS_16_WHITE)
    }).then(font=>{
        loadImage.print(font,35,5,title).write(name);
        console.log(`${name} file created`);
    }).catch(err=>{
        console.log(err);
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