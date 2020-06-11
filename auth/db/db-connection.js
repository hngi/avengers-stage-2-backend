const mongoose = require('mongoose');

const dbUrl = `${process.env.DB_PREFIX}://${process.env.DB_USERNAME}:${encodeURI(process.env.DB_PASSWORD)}@${process.env.DB_HOST}?retryWrites=true&w=majority`;

mongoose.connect(dbUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then((succ) => {
	console.log('Database Connected');
})
.catch(err => console.log(err));