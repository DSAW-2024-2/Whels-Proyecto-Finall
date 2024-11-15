require('dotenv').config();
const helmet = require('helmet');
const app = require('./app');

const PORT = process.env.PORT || 3000;

// Usar helmet para mejorar la seguridad de encabezados HTTP
app.use(helmet());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
