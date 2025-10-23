import Cuenta from "../models/Cuenta.js"

export const createAccount = async(req, res)=>{
    const {titular, saldo} = req.body;

    if(!titular || !saldo){
        return res.status(400).json({message: "Todos los campos son requeridos"})
    }
    try{
    const newAccount =  await Cuenta.create({titular, saldo})
    res.json(newAccount)
    res.status(200).json("Cuenta creada con éxito")
    }
    catch(error){
        res.status(500).json({error: message.error})
    }
}

export const getAccounts = async (req, res)=>{
    try{
        const cuentas = await Cuenta.findAll()
        res.json(cuentas)
        res.status(200).json("Cuenta creada con éxito")
    }
    catch(error){
        res.status(500).json({error: message.error})
    }
}
