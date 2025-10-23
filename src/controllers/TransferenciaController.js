import sequelize from "../config/database.js";
import Cuenta from "../models/Cuenta.js";
import Transaccion from "../models/Transaccion.js";

export const realizarTransferencia = async(req,res)=>{

    const {cuentaOrigenId, cuentaDestinoId, monto}= req.body;

    if(!cuentaOrigenId || !cuentaDestinoId || !monto){
        return res.status(400).json({message: "Datos incompletos"})
    }

    const transaction = await sequelize.transaction();

    try{
        const cuentaOrigen = await Cuenta.findByPk(cuentaOrigenId)
        const cuentaDestino = await Cuenta.findByPk(cuentaDestinoId)

        if(!cuentaOrigen || !cuentaDestino){
            throw new Error("Alguna de las cuentas no existe")
        }

        if(parseFloat(cuentaOrigen.saldo)< parseFloat(monto)){
            throw new Error("Saldo insuficiente")
        }

        
        cuentaOrigen.saldo = parseFloat(cuentaOrigen.saldo)- parseFloat(monto)
        cuentaDestino.saldo = parseFloat(cuentaDestino.saldo)+ parseFloat(monto)

        await cuentaOrigen.save({transaction});
        await cuentaDestino.save({transaction});

        await Transaccion.create({
            monto,
            tipo: "transferencia",
            cuentaOrigenId,
            cuentaDestinoId
        },
        {transaction}
    )

    await transaction.commit();

    res.status(200).json({
        message: "Transferencia rwalizada con exito",
        nuevaCuentaOrigen: cuentaOrigen,
        nuevaCuentaDestino: cuentaDestino,
    })

    }catch(error){

        await transaction.rollback();

        res.status(500).json({
            message: "Error en la transferencia",
            error: error.message

        })
    }
}