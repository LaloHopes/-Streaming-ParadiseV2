const sequelize = require('./config');
const User = require('./models/User'); 
const { faker } = require('@faker-js/faker');

async function updateCountries() {
    try {
        console.log('Iniciando la actualización de los países de los usuarios...');

        // Lista de países aleatorios con sus abreviaturas
        const paisesAleatorios = [
            'IN', // India
            'CN', // China
            'ID', // Indonesia
            'PK', // Pakistán
            'NG', // Nigeria
            'BD', // Bangladesh
            'RU', // Rusia
            'ET', // Etiopía
            'JP', // Japón
            'PH', // Filipinas
            'EG', // Egipto
            'CD', // Congo (Rep. Democr.)
            'VN', // Vietnam
            'IR', // Irán
            'TR', // Turquía
            'DE', // Alemania
            'TH', // Tailandia
            'GB', // Reino Unido
            'FR', // Francia
            'TZ', // Tanzania
            'ZA', // Sudáfrica
            'IT', // Italia
            'KE', // Kenia
            'MM', // Myanmar
            'CO', // Colombia
            'KR', // Corea del Sur
            'UG', // Uganda
        ];

        // Obtener todos los usuarios existentes
        const usuarios = await User.findAll();
        const totalUsuarios = usuarios.length;

        // Asignar países específicos con abreviaturas
        let contador = 0;

        // Asignar 100 usuarios a México (abreviatura MX)
        for (let i = 0; i < 100 && contador < totalUsuarios; i++, contador++) {
            await usuarios[contador].update({ country: 'MX' });
        }

        // Asignar 50 usuarios a Estados Unidos (abreviatura US)
        for (let i = 0; i < 50 && contador < totalUsuarios; i++, contador++) {
            await usuarios[contador].update({ country: 'US' });
        }

        // Asignar 25 usuarios a Brasil (abreviatura BR)
        for (let i = 0; i < 25 && contador < totalUsuarios; i++, contador++) {
            await usuarios[contador].update({ country: 'BR' });
        }

        // Asignar 30 usuarios a Canadá (abreviatura CA)
        for (let i = 0; i < 30 && contador < totalUsuarios; i++, contador++) {
            await usuarios[contador].update({ country: 'CA' });
        }

        // Asignar el resto de los usuarios con países aleatorios utilizando sus abreviaturas
        for (; contador < totalUsuarios; contador++) {
            const paisAleatorio = faker.helpers.arrayElement(paisesAleatorios);
            await usuarios[contador].update({ country: paisAleatorio });
        }

        console.log('Países actualizados correctamente en todos los usuarios.');
        process.exit();
    } catch (error) {
        console.error('Error al actualizar los países:', error);
        process.exit(1);
    }
}

updateCountries();
