const fetch = require('node-fetch');
const https = require('https');
const fs = require('fs');
const { promisify } = require('util');
const writeFilePromise = promisify(fs.writeFile);

// async function download(url) {
// 	const response = await fetch(url);
// 	const buffer = await response.buffer();
// 	const imageName = `Img-${Date.now}`;

// 	fs.writeFile(`./imagenesPrueba/${imageName}`, buffer, () => console.log('Finished downloading!'));
// 	return imageName;
// }

// const downloadFile = (async (url, path) => {
// 	const res = await fetch(url);
// 	const fileStream = fs.createWriteStream(path);
// 	await new Promise((resolve, reject) => {
// 		res.body.pipe(fileStream);
// 		res.body.on('error', reject);
// 		fileStream.on('finish', resolve);
// 	});
// });

function downloadFile(url, outputPath) {
	return fetch(url)
		.then(x => x.arrayBuffer())
		.then(x => writeFilePromise(outputPath, Buffer.from(x)));
}

module.exports = {
	name: 'ocr',
	description: 'Test ocr',
	execute(msg) {

		if (msg.attachments.size == 1) {

			// TODO Probar si con esto me ahorro el for
			// const attachment = message.attachments.first();
			// const url = attachment ? attachment.url : null;

			// const [attachments] = message.attachments.values();
			// const url = attachment ? attachment.url : null;

			const attachments = msg.attachments;
			for (const file of attachments) {
				const imageUrl = file[1].url;

				downloadFile(imageUrl, 'imagenesPrueba\\1.tiff');

				// Para que no me joda probando en localhost creo mi propio agente que no rechaza nada
				const httpsAgent = new https.Agent({
					rejectUnauthorized: false,
				});

				try {
					fetch('https://localhost:7082/api/Ocr', {
						method: 'POST',
						body: JSON.stringify('F:\\testBotDiscord\\imagenesPrueba\\1.tiff'),
						headers: { 'Content-Type': 'application/json' },
						agent: httpsAgent,
					}).then(res => res.json())
						.then(json => msg.channel.send(json.response));
				}
				catch (error) {
					console.log('Hubo un error en la llamada a la api', error);
				}
			}
		}
		else {
			console.log('No recibi nada / Recibi mas de una imagen / No es una imagen valida');
		}

		// msg.channel.send('No me rompi, sigo aca');
	},
};