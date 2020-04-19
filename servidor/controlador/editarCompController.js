const con = require('../lib/dbconnection');

const editarCompetencia = (req, res) => {
    let sql = `SELECT * FROM competencia WHERE nombre =?`;
    con.query(sql, [req.body.nombre], (error, resultado, fields) => {
        if(error) {
            return res.status(500).send ("Huboun error en la consulta!")
        };
        //Verifica que no exista una competencia con el nombre que se quiera ingresar
        if(resultado.length !== 0) {
            return res.status(422).send("Ya existe una competencia con ese nombre")
        };
    })


        let idCompetencia = req.params.id; //Se obtiene el ide de la competencia que se quiere modificar el nombre
        let nuevoNombreCompetencia = req.body.nombre; //Se obtiene el nuevo nombre que se quiere colocar a la competencia

        let sql3 = `UPDATE competencia SET nombre = "${nuevoNombreCompetencia}" WHERE id = ${idCompetencia};`; //Query para modificar el nombre de la tabla competencia

        con.query(sql3, (error, resultadoNuevoNombre, fields) => {
            if(error) {
                return res.status(500).send("Hubo un error en la consulta!")
            }
            //De no existir error, se envia la respuesta
            res.send(JSON.stringify(resultadoNuevoNombre));
        })
};

module.exports = {
    editarCompetencia: editarCompetencia
}