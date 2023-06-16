import mongoose from 'mongoose';

/**
 * 0 = disconected
 * 1 = conected
 * 2 = connecting
 * 3 = disconnecting
 */ 



const mongoConecttion = {
    isConected: 0
}
export const connect = async () => {
    if(mongoConecttion.isConected){ 
        console.log('Ya estas conectado');        
        return;
    }
    if(mongoose.connections.length > 0){
        mongoConecttion.isConected = mongoose.connections[0].readyState;
        if(mongoConecttion.isConected === 1){
            console.log('Usando conexion anterior');
            
            return;
        }
        await mongoose.disconnect();
    }
    await mongoose.connect(process.env.MONGO_URL || '');
    console.log('Conectado a la base de datos');
    
}
export const disconnect = async () => {
    if(process.env.NODE_ENV === 'development') return;
    if (mongoConecttion.isConected !== 0) return;
    await mongoose.disconnect();
    mongoConecttion.isConected = 0;
    if(mongoose.connections.length === 0){        
    console.log('Desconectado de la base de datos');
    }
}
