const con = require('../lib/dbconnection');

const eliminarCompetencia = (req, res) => {
    let idCompetencia =     req.params.id; //Se tiene el id de la competencia

    let sql = `SELECT * FROM competencia  WHERE id = ${idCompetencia};` // Query para obtener la competencia al id pasadpo por parametro

    con.query(sql,  (error, ResultadoCompetencia, fields) => {
        if(error) {
            return res.status(500).send("Hubo un error en la consulta!");
        }
        // Verifica que exista una competencia con el id pasado por parametro
        if(ResultadoCompetencia.length === 0){
            res.status(404).send("La competencia indicada no existe!");
        } else {
            //Se crea query para eliminar los votos de dicha competencia de la tabla voto
            let sql2 = `DELETE FROM voto WHERE competencia_id = ${idCompetencia};`;

            con.query(sql2, (error, resultado, fields) => {
                if(error) {
                    return res.status(404).send("Ha ocurrido un error en la consulta!");
                };
                //Si no hubo error se crea la query para eliminar la competencia 
                let sql3 = `DELETE  FROM competencia WHERE id = ${idCompetencia};`;

                con.query(sql3, (error, resultado, fields) => {
                    if(error){
                        return res.status(404).send("Hubo un error en la consulta!");
                    };

                    //Si no hubo error se envia la respuesta
                    res.send(JSON.stringify(resultado));
                });
            });
        }
    });
};

module.exports = {
    eliminarCompetencia : eliminarCompetencia
};