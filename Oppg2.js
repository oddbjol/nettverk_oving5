let sequelize = require('./sequelize_with_locking.js');
let misc = require('./misc.js');

const Konto = sequelize.import('Konto');

async function main(){
    await sequelize.sync({force: true});

    await Konto.create({
        kontonr: '1',
        saldo: 12.5,
        eiernavn: 'Oddbjørn'
    });

    await Konto.create({
        kontonr: '2',
        saldo: 100,
        eiernavn: 'Kim'
    });

    await Konto.create({
        kontonr: '3',
        saldo: 5000,    // Fra TIHILDE
        eiernavn: 'Frode'
    });

    kontoer = await Konto.saldoOver(80);

    console.log("Kontoer med saldo over 80 kr:");
    for(let konto of kontoer){
        console.log(konto.toString());
    }

    kontoer[0].eiernavn = 'Donald';

    console.log("Klar til å skrive konto med endret navn, til basen:");

    console.log(kontoer[0].toString());

    await kontoer[0].save();

    await misc.pressAnyKey("Eiernavn er endret... sjekk basen og trykk enter.");

    sequelize.close();

}

main();