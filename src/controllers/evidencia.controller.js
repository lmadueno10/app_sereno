const GenericController = require('./generic/generic.controller.js');
const Incidencia = require('../models/Incidencia');
const Evidencia = require('../models/Evidencia');

const fs = require('fs-extra');
const path = require('path');
const jimp = require('jimp');
const ffmpeg = require('ffmpeg');
/**
 * Class representing Controller.
 *
 * @class
 */
class EvidenciaController extends GenericController {

    async uploadEvidencia(req,res){
        res.status(201).json({status:"ok"});
    }

    /**
     * @param {object} req HttpRequest Object
     * @param {object} res HttpResponse Object
     * @returns {JSONObject} 
     */
    async create(req, res) {
        //try {
        const incidencia = req.body;
        const files = req.files;
        console.log("FILES:", files);
        let video = files?files.video ? files.video[0] ? files.video[0] : undefined : undefined:undefined;
        const audio =files? files.audio ? files.audio[0] ? files.audio[0] : undefined : undefined:undefined;
        let image =files? files.image ? files.image[0] ? files.image[0] : undefined : undefined:undefined;
        if (req.body.video) {
            video = req.body.video;
            delete incidencia.video;
        }
        if (req.body.image) {
            image = req.body.image;
            delete incidencia.image;
        }

        let objVideo, objAudio, objImage;
        const objinc = await Incidencia.create(incidencia);
        if (objinc.data.id_incidencia) {
            if (video) {
                objVideo = await Evidencia.create({ id_incidencia: objinc.data.id_incidencia, url_evidencia: video.filename ? `evidencia/${video.filename}` : `${video}`, tipo: 'video' })
                if (!video.filename) {
                    /*
                    const re=setTimeout(async ()=>{
                        const listaVideo=video.split("|");
                        listaVideo.map(async v=>{
                            if(v){
                                await this.firmarVideo(v,req.body.fecha,req.body.hora);
                            }
                        })
                        
                    },1000*60*5);
                    */
                }
            }
            if (audio) {
                objAudio = await Evidencia.create({ id_incidencia: objinc.data.id_incidencia, url_evidencia: `evidencia/${audio.filename}`, tipo: 'audio' })
            }
            if (image) {
                objImage = await Evidencia.create({ id_incidencia: objinc.data.id_incidencia, url_evidencia: image.filename ? `evidencia/${image.filename}` : `${image}`, tipo: 'image' })
            }
            res.status(201).json({ incidencia: objinc, video: objVideo, audio: objAudio, image: objImage });

        }

        //}
        //catch (err) {
        //    res.status(500).json({ code: 500, data: err });
        //}
    }

    async firmarVideo(videoName, fecha, hora) {
        try {


            if (videoName) {

                let fechaBar;
                if (fecha && hora) {
                    fechaBar = new Date(fecha + ' ' + hora);
                } else {
                    fechaBar = new Date();
                }
                const basePath = path.join(__dirname, "../public/evidencia");
                //const dirPath=video.destination;
                //const realName=video.path;
                const realName = path.join(basePath, videoName);
                const videoNameTemp = 'temp_' + videoName;
                const pathVideoNameTemp = path.join(basePath, videoNameTemp);

                const imgBarName = new Date().getTime() + '.png';
                const imageBar = path.join(basePath, 'temp', 'bar.png');
                const imgBarResult = path.join(basePath, 'temp', imgBarName);

                //console.log(dirPath,finalName,realName);
                await fs.rename(realName, pathVideoNameTemp);
                await this.createBrand(fechaBar, imageBar, imgBarResult, pathVideoNameTemp, realName);
                //await brand(path.join(dirPath, originalName),fechaBar,imageBar,imgBarResult,realName);
            }
        } catch (err) {
            console.error(err);
        }
    }

    async brand(nameVideo, nameImage, videoResult) {
        try {
            console.log("Procesando video...");
            const p = new ffmpeg(nameVideo);
            p.then(function (video) {
                video.fnAddWatermark(nameImage, videoResult, {
                    position: 'SW', margin_west: 3, margin_sud: 15
                }, function (error, file) {
                    if (!error) {
                        fs.unlink(nameImage);
                        fs.unlink(nameVideo);
                        console.log('Video was signed', file);
                    } else {
                        fs.rename(nameVideo, videoResult);
                        console.log("error al firmar video\n", error);
                    }
                });
            }, function (err) {
                fs.rename(nameVideo, videoResult);
                console.log('Error al cargar video: ' + err);
            });
        } catch (error) {
            fs.rename(nameVideo, videoResult);
            console.log('error al firmar video', error);
        }
    }

    async createBrand(fecha, imageBar, name, pathVideoNameTemp, realName) {
        console.log("creating bar...");
        let loadImage;
        const title = 'Registrado por el Software SGIE el ' + this.getDateString(fecha);
        jimp.read(imageBar)
            .then(image => {
                loadImage = image;
                return jimp.loadFont(jimp.FONT_SANS_16_WHITE)
            }).then(async font => {
                loadImage.print(font, 35, 5, title).write(name);
                console.log(`${name} file created`);
                await this.brand(pathVideoNameTemp, name, realName);
            }).catch(err => {
                console.log("Error al crear Imagen ", title, err);
            })
    }

    getDateString(fecha) {

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
        return dia + '/' + mes + '/' + anio + ' a las ' + hora + ':' + min + ' ' + am_pm;
    }
}
module.exports = EvidenciaController;