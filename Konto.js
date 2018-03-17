let Sequelize = require("sequelize");
let misc = require('./misc.js');

const Op = Sequelize.Op;

module.exports = (sequelize, DataTypes) => {

    const Konto = sequelize.define('Konto',{
        kontonr: {
            type: Sequelize.Sequelize.STRING,
            primaryKey: true,
            validate:{
                isNumeric: true
            }
        },
        saldo: DataTypes.DOUBLE,
        eiernavn: DataTypes.STRING
    });

    Konto.prototype.trekk = function(belop){
        if(this.saldo >= belop)
            this.saldo -= belop;
        else
            throw "Kan ikke trekke beløp, saldo ville blitt negativ."
    };

    Konto.prototype.toString = function(){
        return "{" + this.kontonr + " (" + this.eiernavn + ") : " + this.saldo + " kr }";
    };

    Konto.saldoOver = function(saldo){
        return Konto.findAll({
            where: {
                saldo: {
                    [Op.gt]: saldo
                }
            }
        });
    };

    Konto.prototype.overforPengerTil = async function(til_konto, belop){
        this.trekk(belop);
        til_konto.saldo += belop;

        console.log("lokal fra_konto: " + this.toString());
        console.log("lokal til_konto: " + til_konto.toString());

        await misc.pressAnyKey("Trykk enter for å lagre endringer i basen.");

        return this.save()
            .then(() => til_konto.save());

    };

    return Konto;
};