const express = require('express');
const schoolRoutes = require('./routes');
const cors=require('cors');
const setupSwagger = require('./swagger');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', schoolRoutes);
setupSwagger(app); 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
