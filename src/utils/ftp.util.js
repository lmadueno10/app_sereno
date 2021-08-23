const path =require('path');
const {exec } = require('child_process');
const fs = require('fs-extra');
class FtpUtil{

    static async  onTranferVideoComplete(fileName, fecha,resp){
        let fechaBar;
        if(fecha){
            fechaBar= new Date(fecha);
        }else{
            fechaBar= new Date();
        }
        const basePath= path.join(__dirname,'../public/evidencia');
        const realName=path.join(basePath,fileName);
        const videoNameTemp='temp_'+fileName;
        const pathVideoNameTemp=path.join(basePath,videoNameTemp);
        const pathFont=path.join(__dirname,'sans.otf');
        const pathImage=path.join(basePath,'temp','bar.png');
        let font=pathFont.replace(/\\/g,"/");
        font =font.replace(":","\\:");
        console.log(font);
        console.log("Procesando video...");
        //await fs.rename(realName,pathVideoNameTemp);
        const command1 =`ffmpeg -i ${realName} -i ${pathImage} -filter_complex "overlay=(main_w-overlay_w):(main_h-overlay_h)-20" -vcodec libx264 ${pathVideoNameTemp}`;
        exec(command1,(err)=>{
            if(err){
                console.log("Ocurrio un error al crear caja texto",err);
            }else{
                const command=`ffmpeg -y -i ${pathVideoNameTemp} -vf drawtext="fontfile='${font}': \\text='Registrado por el Software SGIE el ${this.getDateString(fechaBar)}': fontcolor=white: fontsize=15: box=1:  boxcolor=black: \\boxborderw=1: x=(w-text_w): y=(h-text_h)-26" -codec:a copy ${realName}`;
                console.log("Firmando video...")
                exec(command,(err1)=>{
                    if(err1){
                        console.log("Ocurrio un error al firmar video",err1);
                    }else{
                        fs.unlink(pathVideoNameTemp);
                        console.log(`${fileName} firmado.`)
                        if(resp)
                            resp.json({"status":"video was signed"});
                    }
                })
            }
        });  
    }

    static getDateString(fecha) {

        const horas = fecha.getHours();
        const anio = fecha.getFullYear();
        const dia = fecha.getDate();
        const am_pm = horas >= 12 ? 'pm' : 'am';
        let min = fecha.getMinutes();
        let mes = (fecha.getMonth() + 1);
        let hora = horas % 12;
        mes = mes < 10 ? ('0' + mes) : mes;
        min = min < 10 ? ('0' + min) : min;
        hora = hora ? hora : 12;
        return dia + '/' + mes + '/' + anio + ' a las ' + hora + '\\:' + min + ' ' + am_pm;
    }
}

module.exports=FtpUtil;