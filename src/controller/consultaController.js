import { salvarConsulta, listarConsultas, alterarConsulta, deletarConsulta } from "../repository/consultaRepository.js";

import { Router } from "express";
let consultaServidor = Router();

consultaServidor.get('/consultas', async (req, resp) => {
    let listaConsultas = await listarConsultas();
    resp.send(listaConsultas);
})

consultaServidor.post('/consultas', async (req, resp) => {
    let consulta = req.body;

    let consultaInserida = await salvarConsulta(consulta);
    resp.send(consultaInserida);
})

consultaServidor.put('/consultas/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const consulta = req.body;

        await alterarConsulta(id, consulta);

        res.status(200).json({ message: 'Consulta alterada com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao alterar consulta', error: error.message });
    }
});

consultaServidor.delete('/consultas/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await deletarConsulta(id);
        res.status(200).json({ message: 'Consulta excluída com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir consulta', error: error.message });
    }
});

export default consultaServidor;