const con = require('../lib/dbconnection');


const crearCompetencia = (req, res) => {
    let nombreCompetencia = req.body.nombre
    let genero_id = (req.body.genero == '0') ? null : req.body.genero
    let director_id = (req.body == '0') ? null : req.body.director 
    let actor_id = (req.body.actor == '0') ? null : req.body.actor

// Query a utilizar para revisar que no exista una competencia con ese nombre
    let sql = `SELECT nombre FROM competencia WHERE nombre = ("${nombreCompetencia}");`;

    con.query(sql, (error, resultado, fields) => {
        // Revisa que no exista una competencia con el nombre ingresado
        if (resultado.length > 0){
            console.log ("Ya existe una competencia con ese nombre!!");
            return res.status (422).send ("Ya existe una competencia con ese nombre!!");
        };

        //Valida que se haya ingresado un nombre para crear la competencia.
        if(nombreCompetencia.length === 0){
            return res.status(422).send("No ingresaste el nombre de la competencias que quieres crear!!");
        }

        //Query para validar que existan al menos 2 peliculas con los criterios ingresados.
        sql2 = `SELECT COUNT(*) AS cant FROM pelicula AS p LEFT JOIN director_pelicula AS dp ON (p.id = dp.pelicula_id) LEFT JOIN actor_pelicula AS ap ON (p.id = ap.pelicula_id) WHERE 1=1`;

        //Se agregan filtros a la query segun criterios ingresados
        if(genero_id){
            sql2 += `ÀND p.genero_id = ${genero_id}`
        };
        if(director_id){
            sql2 += `AND dp.director_id = ${director_id}`
        };
        if(actor_id){
            sql2 += `AND ap.actor_id = ${actor_id}`
        };


        con.query(sql2, (error, resultado, fields) => {
            if(error){
                return res.status(500).send("Hubo un error en la consulta!")
            };
            //Valida que existan al menos dos peliculas con esos criterios para crear la competencia
            if(resultado[0].cant < 2){
                return res.status(422).send("imposible crear la competencia. No existen al menos 2 peliculas que cumplan con los criterios ingresados")
            };

            //Query para insertar la competencia en la tabla competencia
            let sql3 = `INSERT INTO competencia (nombre, genero_id, director_id, actor_id) VALUES ("${nombreCompetencia}", ${genero_id}, ${director_id}, ${actor_id});`;

            con.query(sql3, (error, resultado, fields) => {
                if(error){
                    return res.status(500).send("Hubo un error en la consulta!")
                };


                //De no encontrar error, se envia la respuesta
                res.send(JSON.stringify(resultado));
            })
        })
    })
};

module.exports = {
    crearCompetencia: crearCompetencia
};