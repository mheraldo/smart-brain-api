/*const Clarifai = require('clarifai');

// You much add your own API key here from Clarifai
const app = new Clarifai.App({
  apiKey: 'c7681d39d7844fcca8df598cf5320f4b'
});

const handleApiCall = (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
}*/



const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0].entries);
	})
	.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage,
	//handleApiCall
};