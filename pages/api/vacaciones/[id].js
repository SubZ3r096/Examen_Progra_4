import { apiHandler, vacacionesRepo } from 'helpers/api';

export default apiHandler({
    get: getById,
    put: update,
    delete: _delete
});

async function getById(req, res) {
    const vacacion = await vacacionesRepo.getById(req.query.id);

    if (!vacacion) throw 'Vacaciones Not Found';

    return res.status(200).json(vacacion);
}

async function update(req, res) {
    await vacacionesRepo.update(req.query.id, req.body);
    return res.status(200).json({});
}

async function _delete(req, res) {
    await vacacionesRepo.delete(req.query.id);
    return res.status(200).json({});
}
