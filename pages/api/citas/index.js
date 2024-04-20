import { apiHandler, citasRepo } from 'helpers/api';

export default apiHandler({
    get: getAll,
    post: create
});

async function getAll(req, res) {
    const cita = await citasRepo.getAll();
    return res.status(200).json(cita);
}

async function create(req, res) {
    await citasRepo.create(req.body);
    return res.status(200).json({});
}
