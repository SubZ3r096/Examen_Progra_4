import getConfig from 'next/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from 'helpers/api';

const { serverRuntimeConfig } = getConfig();
const Cita = db.Cita;

export const citasRepo = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

//hola mundo
async function getAll() {
    return await Cita.find();
}

async function getById(id) {
    return await Cita.findById(id);
}

async function create(params) {
    // validate
    if (await Cita.findOne({ username: params.username })) {
        throw 'Cita "' + params.username + '" is already taken';
    }

    const cita = new Cita(params);

    // hash password
    if (params.password) {
        cita.hash = bcrypt.hashSync(params.password, 10);
    }

    // save user
    await cita.save();
}

async function update(id, params) {
    const cita = await Cita.findById(id);

    // validate
    if (!cita) throw 'Cita not found';
    if (cita.username !== params.username && await Cita.findOne({ username: params.username })) {
        throw 'Cita "' + params.username + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.hash = bcrypt.hashSync(params.password, 10);
    }

    // copy params properties to user
    Object.assign(cita, params);

    await cita.save();
}

async function _delete(id) {
    await Cita.findByIdAndRemove(id);
}
