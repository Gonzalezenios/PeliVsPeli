const con = require('../lib/dbconnection');

const guardarVotos = (req, res) => {
    let idCompetencia = req.params.id; //Se obtiene el id  de la competencia que se quiere votar
    let idPelicula = req.body.idPelicula; //Se obtiene el id de la pelicula que se quiere votar

    let sql = `INSERT INTO voto (pelicula_id, competencia_id) VALUES (${idPelicula}, ${idCompetencia});`;//Query para insertar un voto

    //se realiza la consulta
    con.query(sql, (error, resultado, fields) => {
        //Se revisa que los parametros sean correctos o existan
        if (!idPelicula || isNaN(idPelicula) || !idCompetencia || isNaN(idCompetencia)) {
            return res.status(422).send("Falta ingresar un dato o uno de los datos ingresados NO es un número.")
        };
        if(error) {
            res.status(500).send("Hubo un error en la consulta!")
        };

        //Si no hubo error se envia la respuesta
        res.send(JSON.stringify(resultado));
    })
};

module.exports = {
    guardarVotos : guardarVotos
};