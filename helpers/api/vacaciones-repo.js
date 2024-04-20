import getConfig from 'next/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from 'helpers/api';

const { serverRuntimeConfig } = getConfig();
const Vacacion = db.Vacacion;

export const vacacionesRepo = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll() {
    return await Vacacion.find();
}
//hola
async function getById(id) {
    return await Vacacion.findById(id);
}

async function create(params) {
    // validate
    if (await Vacacion.findOne({ username: params.username })) {
        throw 'Vacaciones "' + params.username + '" is already taken';
    }

    const vacacion = new Vacacion(params);

    // hash password
    if (params.password) {
        vacacion.hash = bcrypt.hashSync(params.password, 10);
    }

    // save user
    await vacacion.save();
}

async function update(id, params) {
    const vacacion = await Vacacion.findById(id);

    // validate
    if (!vacacion) throw 'Vacaciones not found';
    if (vacacion.username !== params.username && await Vacacion.findOne({ username: params.username })) {
        throw 'Vacaciones "' + params.username + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.hash = bcrypt.hashSync(params.password, 10);
    }

    // copy params properties to user
    Object.assign(vacacion, params);

    await vacacion.save();
}

async function _delete(id) {
    await Vacacion.findByIdAndRemove(id);
}