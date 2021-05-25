const AccionIncidencia = require('../models/AccionIncidencia.js');
const GenericController = require('./generic/generic.controller.js');

/**
 * Class representing Controller.
 *
 * @class
 */
class AccionIncidenciaController extends GenericController {

    /**
     * @param {object} req HttpRequest Object
     * @param {object} res HttpResponse Object
     * @returns {JSONObject} 
     */
    async create(req, res) {
        //try {
            console.log("accion",req.body)
            const accionIncidencia = req.body;
            const files = req.files;
            console.log("FILES:", files);
            const video = files.video ? files.video[0] ? files.video[0] : undefined : undefined;
            const audio = files.audio ? files.audio[0] ? files.audio[0] : undefined : undefined;
            const image = files.image ? files.image[0] ? files.image[0] : undefined : undefined;

            const result = await AccionIncidencia.create({
                id_incidencia: accionIncidencia.id_incidencia,
                id_tipo_accion: accionIncidencia.id_tipo_accion,
                descripcion: accionIncidencia.descripcion,
                fecha:accionIncidencia.fecha,
                hora:accionIncidencia.hora,
                ev_video: video ? `evidencia/${video.filename}` : undefined,
                ev_audio: audio ? `evidencia/${audio.filename}` : undefined,
                ev_image: image ? `evidencia/${image.filename}` : undefined
            });

            if (result.data) {
                res.status(201).json({ code: 201, data: result.data });
            } else {
                res.status(200).json({ code: 400, data: result.data });
            }
        //}
        //catch (err) {
        //    console.error(err);
        //    res.status(500).json({ code: 500, data: err });
        //}
    }
}

module.exports = AccionIncidenciaController;