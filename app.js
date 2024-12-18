const express = require('express');
const apiRoutes = require('./src/routes/apiRoutes');

const app = express();
app.use(express.json());
app.use('/api', apiRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


module.exports = app;
