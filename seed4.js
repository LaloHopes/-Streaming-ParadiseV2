const sequelize = require('./config'); // Asegúrate de que el archivo config.js esté configurado correctamente
const User = require('./models/User'); // Modelo de usuario
const { faker } = require('@faker-js/faker'); // Faker.js para generar datos aleatorios

async function createUsers() {
    try {
        console.log('Iniciando la creación de 100 usuarios aleatorios...');

        const users = [];

        // Crear 100 usuarios aleatorios
        for (let i = 0; i < 100; i++) {
            users.push({
                name: faker.person.fullName(),  // Generar nombre completo aleatorio (actualizado a faker.person)
                email: faker.internet.email(),  // Generar correo electrónico aleatorio
                password: faker.internet.password(),  // Generar contraseña aleatoria
                age: faker.number.int({ min: 18, max: 70 }),  // Generar edad aleatoria entre 18 y 70 (actualizado a faker.number.int)
                country: faker.location.country(),  // Generar país aleatorio (actualizado a faker.location.country)
                favoriteGenre: faker.music.genre(),  // Generar género musical aleatorio
                genero: faker.person.sex(),  // Generar género (actualizado a faker.person.sex)
                idrol: 34,  // Asignar rol "User" (puedes cambiarlo si lo deseas)
                createdAt: faker.date.past(),  // Fecha de creación aleatoria en el pasado
                updatedAt: new Date(),  // Fecha actual
                idsub: 26  // ID de suscripción fija (26)
            });
        }

        // Insertar usuarios en la base de datos
        await User.bulkCreate(users);

        console.log('100 usuarios aleatorios creados exitosamente.');
        process.exit();
    } catch (error) {
        console.error('Error al crear usuarios:', error);
        process.exit(1);
    }
}

// Llamar a la función para crear los usuarios
createUsers();
