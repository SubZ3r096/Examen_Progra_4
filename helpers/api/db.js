import getConfig from 'next/config';
import mongoose from 'mongoose';

const { serverRuntimeConfig } = getConfig();
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI || serverRuntimeConfig.connectionString);
mongoose.Promise = global.Promise;

export const db = {
    User: userModel(),
    Cita: citaModel(),
    Vacacion: vacacionModel()

};

// mongoose models with schema definitions

function userModel() {
    const schema = new Schema({
        nomUsuario: { type: String, unique: true, required: true },
        nombre: { type: String, required: true },
        email: { type: String, required: true },
        contrasena: { type: String, required: true },
        rol: { type: String, required: true },
        fechaderegistro: { type: Date, required: true }
    }, {
        // add createdAt and updatedAt timestamps
        timestamps: true
    });

    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.hash;
        }
    });

    return mongoose.models.User || mongoose.model('User', schema);
}


function citaModel() {
    const schema = new Schema({
        fechayhoradelacita: { type: Date, required: true },
        iddeusuario: { type: String, required: true },
        descripciondelacita: { type: String, required: true },
        estadodelacita: {type: String, required: true}
    }, {
        // add createdAt and updatedAt timestamps
        timestamps: true
    });

    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.hash;
        }
    });

    return mongoose.models.Cita || mongoose.model('Cita', schema);
}


function vacacionModel() {
    const schema = new Schema({
        fechainicio: { type: Date, required: true },
        fechafin: { type: Date, required: true },
        iddeusuario: { type: String, required: true },
        estado: { type: String, required: true },
        comentarios: {type: String, required: true}
    }, {
        // add createdAt and updatedAt timestamps
        timestamps: true
    });

    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.hash;
        }
    });

    return mongoose.models.Vacacion || mongoose.model('Vacacion', schema);
}