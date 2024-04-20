import { apiHandler, citasRepo } from 'helpers/api';

export default apiHandler({
    get: getById,
    put: update,
    delete: _delete
});

async function getById(req, res) {
    const cita = await citasRepo.getById(req.query.id);

    if (!cita) throw 'Cita Not Found';

    return res.status(200).json(cita);
}

async function update(req, res) {
    await citasRepo.update(req.query.id, req.body);
    return res.status(200).json({});
}

async function _delete(req, res) {
    await citasRepo.delete(req.query.id);
    return res.status(200).json({});
}
