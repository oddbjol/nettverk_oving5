let Sequelize = require('sequelize');
let sequelize = require('./sequelize_with_locking.js');

const Konto = sequelize.import('Konto');

async function main(){

    konto_1 = await Konto.findById('3');
    konto_2 = await Konto.findById('1');

    try{
        await konto_1.overforPengerTil(konto_2, 100);
    }
    catch(e){
        console.log("FEIL!!! ");
        console.log(e);
    }


    sequelize.close();
}

main();