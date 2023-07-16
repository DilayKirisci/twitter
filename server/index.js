require("dotenv").config();
const { PORT } = require("./config/config");
const server = require("./api/server");
server.listen(PORT, () => {
	console.log(`Server is listening on ${PORT}`);
});
