const express = require('express');
const cors = require('cors'); // Importa cors
const sequelize = require('./config');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const videoRoutes = require('./routes/videoRoutes');
const commentRoutes = require('./routes/commentRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const couponRoutes = require('./routes/couponRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const offerRoutes = require('./routes/offerRoutes');
const roleRoutes = require('./routes/roleRoutes'); // Importar rutas de roles
const permissionRoutes = require('./routes/permissionRoutes'); // Importar rutas de permisos
const rolePermissionRoutes = require('./routes/rolePermissionRoutes'); // Importar rutas de Role-Permiso

const app = express();
const PORT = process.env.PORT || 5000;


// Habilitar CORS para aceptar solicitudes desde cualquier origen
app.use(cors({
  origin: '*', // Permitir cualquier origen
  credentials: true, // Si necesitas manejar cookies/autenticación
}));

// Middlewares
app.use(express.json());

// Rutas
app.use('/users', userRoutes);
app.use('/videos', videoRoutes);
app.use('/comments', commentRoutes);
app.use('/ratings', ratingRoutes);
app.use('/subscriptions', subscriptionRoutes);
app.use('/coupons', couponRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/offers', offerRoutes);
app.use('/roles', roleRoutes); // Usa las rutas de roles
app.use('/permissions', permissionRoutes); // Usa las rutas de permisos
app.use('/role-permission', rolePermissionRoutes); // Usa las rutas de Role-Permiso



// Verifica la conexión con la base de datos y arranca el servidor
sequelize.authenticate()
  .then(() => {
    console.log('Conexión con la base de datos establecida.');
    return sequelize.sync({ force: false }); // Sincroniza los modelos sin borrar los datos
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('Error al conectar con la base de datos:', err));
 
  