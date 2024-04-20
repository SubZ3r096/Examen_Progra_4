import { apiHandler, vacacionesRepo } from 'helpers/api';


export default apiHandler({
    get: getAll,

    post: create
});

async function create(req, res) {
    await vacacionesRepo.create(req.body);
    return res.status(200).json({});
}

async function getAll(req, res) {
    const vacacion = await vacacionesRepo.getAll();
    return res.status(200).json(vacacion);
}
