// const sequelize = require('./config');
// const User = require('./models/User'); // Asegúrate de que esto apunte al modelo correcto
// const Role = require('./models/Role');
// const Coupon = require('./models/Coupon');
// const Subscription = require('./models/Subscription');
// const Purchase = require('./models/Purchase');
// const Permission = require('./models/Permission');
// const RolePermission = require('./models/RolePermission');
// const Offer = require('./models/Offer');
// const { faker } = require('@faker-js/faker');

// async function seedDatabase() {
//     try {
//         console.log('Iniciando la sincronización de la base de datos...');
//         await sequelize.sync({ alter: true });

//         console.log('Limpiando tablas...');
//         await RolePermission.destroy({ where: {} });
//         await Permission.destroy({ where: {} });
//         await Purchase.destroy({ where: {} });
//         await Subscription.destroy({ where: {} });
//         await Coupon.destroy({ where: {} });
//         await User.destroy({ where: {} });
//         await Role.destroy({ where: {} });
//         await Offer.destroy({ where: {} });

//         console.log('Creando roles...');
//         const adminRole = await Role.create({ nomrol: 'Admin' });
//         const userRole = await Role.create({ nomrol: 'User' });

//         console.log('Creando permisos...');
//         const permiso1 = await Permission.create({ nompermiso: 'Crear contenido', clave: 'CREATE_CONTENT' });
//         const permiso2 = await Permission.create({ nompermiso: 'Eliminar contenido', clave: 'DELETE_CONTENT' });
//         const permiso3 = await Permission.create({ nompermiso: 'Ver estadísticas', clave: 'VIEW_STATS' });

//         console.log('Asignando permisos a los roles...');
//         await RolePermission.create({ idrol: adminRole.idrol, idpermiso: permiso1.idpermiso });
//         await RolePermission.create({ idrol: adminRole.idrol, idpermiso: permiso2.idpermiso });
//         await RolePermission.create({ idrol: adminRole.idrol, idpermiso: permiso3.idpermiso });
//         await RolePermission.create({ idrol: userRole.idrol, idpermiso: permiso1.idpermiso });

//         console.log('Creando usuarios...');
//         const usuariosPromesas = [];
//         const generos = ['Masculino', 'Femenino', 'Otro'];
//         const generosFavoritos = ['Acción', 'Comedia', 'Drama', 'Ciencia ficción', 'Terror', 'Aventura'];

//         for (let i = 0; i < 500; i++) {
//             try {
//                 const name = faker.person.fullName(); // Genera el nombre
//                 const email = faker.internet.email();
//                 const password = faker.internet.password();
//                 const age = faker.number.int({ min: 18, max: 80 }); // Cambia faker.datatype.number a faker.number.int
//                 const country = faker.location.country(); // Cambia faker.address.country() a faker.location.country()
//                 const genero = faker.helpers.arrayElement(generos); // Genera género aleatorio
//                 const favoriteGenre = faker.helpers.arrayElement(generosFavoritos); // Genera género favorito
//                 const createdAt = faker.date.between({ from: new Date(new Date().setFullYear(new Date().getFullYear() - 5)), to: new Date() });

//                 const user = await User.create({
//                     name,
//                     email,
//                     password,
//                     age,
//                     country,
//                     genero,
//                     favoriteGenre,
//                     idrol: userRole.idrol,
//                     createdAt,
//                     updatedAt: createdAt,
//                 });

//                 usuariosPromesas.push(user);
//             } catch (userError) {
//                 console.error('Error al crear usuario en iteración:', i, userError);
//             }
//         }

//         // Esperar a que todos los usuarios sean creados
//         await Promise.all(usuariosPromesas);

//         console.log('500 usuarios aleatorios creados correctamente.');
//         process.exit();
//     } catch (error) {
//         console.error('Error al poblar la base de datos:', error);
//         process.exit(1);
//     }
// }

// seedDatabase();
const sequelize = require('./config');
const User = require('./models/User'); // Asegúrate de que esto apunte al modelo correcto
const Role = require('./models/Role');
const Coupon = require('./models/Coupon');
const Subscription = require('./models/Subscription'); // Modelo de suscripciones
const Purchase = require('./models/Purchase'); // Modelo de compras
const Permission = require('./models/Permission');
const RolePermission = require('./models/RolePermission');
const Offer = require('./models/Offer');
const { faker } = require('@faker-js/faker');

async function seedDatabase() {
    try {
        console.log('Iniciando la sincronización de la base de datos...');
        await sequelize.sync({ alter: true });

        console.log('Limpiando tablas...');
        await RolePermission.destroy({ where: {} });
        await Permission.destroy({ where: {} });
        await Purchase.destroy({ where: {} });
        await Subscription.destroy({ where: {} });
        await Coupon.destroy({ where: {} });
        await User.destroy({ where: {} });
        await Role.destroy({ where: {} });
        await Offer.destroy({ where: {} });

        console.log('Creando roles...');
        const adminRole = await Role.create({ nomrol: 'Admin' });
        const userRole = await Role.create({ nomrol: 'User' });

        console.log('Creando permisos...');
        const permiso1 = await Permission.create({ nompermiso: 'Crear contenido', clave: 'CREATE_CONTENT' });
        const permiso2 = await Permission.create({ nompermiso: 'Eliminar contenido', clave: 'DELETE_CONTENT' });
        const permiso3 = await Permission.create({ nompermiso: 'Ver estadísticas', clave: 'VIEW_STATS' });

        console.log('Asignando permisos a los roles...');
        await RolePermission.create({ idrol: adminRole.idrol, idpermiso: permiso1.idpermiso });
        await RolePermission.create({ idrol: adminRole.idrol, idpermiso: permiso2.idpermiso });
        await RolePermission.create({ idrol: adminRole.idrol, idpermiso: permiso3.idpermiso });
        await RolePermission.create({ idrol: userRole.idrol, idpermiso: permiso1.idpermiso });

        console.log('Creando usuarios...');
        const usuariosPromesas = [];
        const generos = ['Masculino', 'Femenino', 'Otro'];
        const generosFavoritos = ['Acción', 'Comedia', 'Drama', 'Ciencia ficción', 'Terror', 'Aventura'];

        for (let i = 0; i < 500; i++) {
            try {
                const name = faker.person.fullName(); // Genera el nombre
                const email = faker.internet.email();
                const password = faker.internet.password();
                const age = faker.number.int({ min: 18, max: 80 }); // Genera la edad
                const country = faker.location.country(); // Genera el país
                const genero = faker.helpers.arrayElement(generos); // Genera género aleatorio
                const favoriteGenre = faker.helpers.arrayElement(generosFavoritos); // Genera género favorito
                const createdAt = faker.date.between({ from: new Date(new Date().setFullYear(new Date().getFullYear() - 5)), to: new Date() });

                const user = await User.create({
                    name,
                    email,
                    password,
                    age,
                    country,
                    genero,
                    favoriteGenre,
                    idrol: userRole.idrol,
                    createdAt,
                    updatedAt: createdAt,
                });

                usuariosPromesas.push(user);
            } catch (userError) {
                console.error('Error al crear usuario en iteración:', i, userError);
            }
        }

        // Esperar a que todos los usuarios sean creados
        const usuarios = await Promise.all(usuariosPromesas);

        console.log('500 usuarios aleatorios creados correctamente.');

        console.log('Creando suscripciones...');
        const suscripcionesPromesas = [];

        for (let i = 0; i < 10; i++) {
            const randomUser = faker.helpers.arrayElement(usuarios);

            const startDate = faker.date.between({ from: new Date(new Date().setFullYear(new Date().getFullYear() - 5)), to: new Date() });
            const endDate = faker.date.between({ from: startDate, to: new Date(startDate).setFullYear(new Date(startDate).getFullYear() + 1) });

            // Añadimos nombre y precio para evitar los errores notNull Violation
            const subscription = await Subscription.create({
                iduser: randomUser.id, // Asigna un usuario aleatorio
                nombre: faker.commerce.productName(), // Genera un nombre para la suscripción
                precio: faker.finance.amount(5, 100, 2), // Genera un precio final
                p_final: faker.finance.amount(5, 100, 2), // Genera el precio final
                startDate, // Fecha de inicio de la suscripción
                endDate,   // Fecha de fin de la suscripción (1 año después del inicio)
            });

            suscripcionesPromesas.push(subscription);
        }

        // Esperar a que todas las suscripciones sean creadas
        const suscripciones = await Promise.all(suscripcionesPromesas);

        console.log('10 suscripciones creadas correctamente.');

        console.log('Creando 500 compras aleatorias...');

        const comprasPromesas = [];

        for (let i = 0; i < 500; i++) {
            try {
                // Seleccionar un usuario aleatorio
                const randomUser = faker.helpers.arrayElement(usuarios);

                // Seleccionar una suscripción aleatoria
                const randomSubscription = faker.helpers.arrayElement(suscripciones);

                // Generar una fecha de compra aleatoria en los últimos 5 años
                const fechaCompra = faker.date.between({ from: new Date(new Date().setFullYear(new Date().getFullYear() - 5)), to: new Date() });

                // Generar un monto de compra aleatorio
                const total = faker.finance.amount(10, 500, 2); // Entre 10 y 500 con 2 decimales

                // Crear la compra
                const compra = await Purchase.create({
                    iduser: randomUser.id, // Asignar el id del usuario
                    idsub: randomSubscription.id, // Asignar el id de la suscripción
                    total, // Asignar el total
                    fecha: fechaCompra, // Asignar la fecha de compra
                });

                comprasPromesas.push(compra);
            } catch (compraError) {
                console.error('Error al crear compra en iteración:', i, compraError);
            }
        }

        // Esperar a que todas las compras sean creadas
        await Promise.all(comprasPromesas);

        console.log('500 compras aleatorias creadas correctamente.');
        process.exit();
    } catch (error) {
        console.error('Error al poblar la base de datos:', error);
        process.exit(1);
    }
}

seedDatabase();
