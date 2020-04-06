const con = require('../lib/dbconnection');

const eliminarVotos = (req, res) => {
    let idCompetencia = req.params.id; //se obtiene el id de la competencia que se quiere eliminar

    let sql = `SELECT * FROM competencia WHERE id = ${idCompetencia};`; //Query para obtener la competencia que corresponda con le id

    con.query(sql, (error, resultado, fields) => {
        //Se revisa que exista una competencia  con el id pasado por parametro
        if(resultado.lenght === 0){
            return res.status(404).send("La competencia indicada no existe")
        } else {
            //si la competencia existe, se crea la query para eliminar los votos de esa competencia 
            let sqlReiniciar = `DELETE FROM voto  WHERE competencia_id = ${idCompetencia};`;

            //Se realiza la consulta
            con.query(sqlReiniciar, (error, resultadoReiniciar, fields) => {
                if(error){
                    return res.status(500).send("Hubo un error en la consulta!")
                };
                //si no hubo error, enviar la respuesta
                res.send(JSON.stringify(resultadoReiniciar));
            })
        }
    })
};

module.exports = {
    eliminarVotos = eliminarVotos
};