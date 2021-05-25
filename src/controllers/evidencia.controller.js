const GenericController = require('./generic/generic.controller.js');
const Incidencia = require('../models/Incidencia');
const Evidencia = require('../models/Evidencia');
/**
 * Class representing Controller.
 *
 * @class
 */
class EvidenciaController extends GenericController {

    /**
     * @param {object} req HttpRequest Object
     * @param {object} res HttpResponse Object
     * @returns {JSONObject} 
     */
    async create(req, res) {
        //try {
            const incidencia=req.body;
            const files=req.files;
            console.log("FILES:",files);
            const video =files.video?files.video[0]?files.video[0]:undefined:undefined;
            const audio=files.audio?files.audio[0]?files.audio[0]:undefined:undefined;
            const image=files.image?files.image[0]?files.image[0]:undefined:undefined;
            let objVideo,objAudio,objImage;
            const objinc=await Incidencia.create(incidencia);
            if(objinc.data.id_incidencia){
                if(video){
                    objVideo=await Evidencia.create({id_incidencia:objinc.data.id_incidencia,url_evidencia:`evidencia/${video.filename}`,tipo:'video'})
                }
                if(audio){
                    objAudio=await Evidencia.create({id_incidencia:objinc.data.id_incidencia,url_evidencia:`evidencia/${audio.filename}`,tipo:'audio'})
                }
                if(image){
                    objImage=await Evidencia.create({id_incidencia:objinc.data.id_incidencia,url_evidencia:`evidencia/${image.filename}`,tipo:'image'})
                }
                res.status(201).json({incidencia:objinc,video:objVideo,audio:objAudio,image:objImage});

            }
            
        //}
        //catch (err) {
        //    res.status(500).json({ code: 500, data: err });
        //}
    }
}

module.exports = EvidenciaController;