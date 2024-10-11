const sequelize = require('./config');
const User = require('./models/User');
const Role = require('./models/Role');
const Coupon = require('./models/Coupon');
const Subscription = require('./models/Subscription');
const Purchase = require('./models/Purchase');
const Permission = require('./models/Permission');
const RolePermission = require('./models/RolePermission');
const Offer = require('./models/Offer');
const { faker } = require('@faker-js/faker');

async function seedDatabase() {
    try {
        console.log('Iniciando la sincronización de la base de datos...');
        await sequelize.sync({ alter: true });

        console.log('No se eliminarán registros de la tabla Purchase...');
        
        // Aquí puedes seguir con la creación de otros registros, si es necesario.
        
        console.log('Asignando idsub 26 a 100 compras...');

        // Obtener todas las compras
        const compras = await Purchase.findAll();

        // Seleccionar aleatoriamente 100 compras
        const comprasSeleccionadas = faker.helpers.shuffle(compras).slice(0, 100);

        const updatePromises = comprasSeleccionadas.map(async (compra) => {
            // Actualizar el campo idsub para las 100 compras seleccionadas
            await compra.update({ idsub: 26 });
        });

        // Esperar a que todas las compras se actualicen
        await Promise.all(updatePromises);

        console.log('idsub actualizado a 26 en 100 compras seleccionadas.');

        console.log('Finalizado el proceso de actualización.');
        process.exit();
    } catch (error) {
        console.error('Error al poblar la base de datos:', error);
        process.exit(1);
    }
}

seedDatabase();
