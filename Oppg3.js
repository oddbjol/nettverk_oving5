let sequelize = require('./sequelize.js');

const Konto = sequelize.import('Konto');

async function main(){

    konto_1 = await Konto.findById('3');
    konto_2 = await Konto.findById('1');

    await konto_1.overforPengerTil(konto_2, 100);

    sequelize.close();
}

main();