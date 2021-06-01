const Video = require('../models/Video.js');
const GenericController = require('./generic/generic.controller.js');
/**
 * Class representing Controller.
 *
 * @class
 */
class VideoController extends GenericController {

	/**
	 * @param {object} req HttpRequest Object
	 * @param {object} res HttpResponse Object
	 * @returns {JSONObject} 
	 */
	async create(req, res) {
		//try {
		const fields = req.body;
		const files = req.files;
		console.log("FILES:", files);
		const video = files.video ? files.video[0] ? files.video[0] : undefined : undefined;
		let objVideo
		if (video) {
			objVideo = await Video.create({ id_personal: fields.id_personal, nombre_video: `evidencia/${video.filename}`, fecha: fields.fecha, hora: fields.hora })
		}
		res.status(201).json(objVideo);
		//}
		//catch (err) {
		//    res.status(500).json({ code: 500, data: err });
		//}
	}

	/**
	 * @param {object} req HttpRequest Object
	 * @param {object} res HttpResponse Object
	 * @param {object} model (Optional)
	 * @returns {Array<JSONObject>}
	 */
	async getAll(req, res, model) {
		//try{
		console.log("filter", req.query);
		const resp = await model.getAll(req.query);
		if (resp) {
			res.status(200).json({ data: resp });
		} else {
			res.status(404).json({});
		}
		//}catch(err){
		//	res.status(500).json({message:'Internal Error',data:err});
		//}
	}
}

module.exports = VideoController;