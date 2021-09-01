const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'students',
    password: 'password',
    port: 5432,
});

const getDetails = (request, response) => {
    pool.query('SELECT * FROM details ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};

const getDetailById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM details WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
};

const createDetail = (request, response) => {
    const { name, additional_subject, branch, email_id, phone_no, average_percentage, password } = request.body;

    pool.query('INSERT INTO details (name, additional_subject, branch, email_id, phone_no, average_percentage, password) VALUES ($1, $2, $3, $4, $5, $6, $7)', [name, additional_subject, branch, email_id, phone_no, average_percentage, password], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Detail added with ID: ${results.id}`)
    })
}

const updateDetail = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, additional_subject, branch, email_id, phone_no, average_percentage, password } = request.body
    console.log(id);
    pool.query(
        'UPDATE details SET name = $1, additional_subject = $2, branch = $3, email_id = $4, phone_no = $5, average_percentage = $6, password = $7 WHERE id = $8',
        [name, additional_subject, branch, email_id, phone_no, average_percentage, password, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Detail modified with ID: ${id}`)
        }
    )
};

const deleteDetail = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM details WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Detail deleted with ID: ${id}`)
    })
}

const validateEmailAndPassword = (email, password) => {


    return new Promise((resolve, reject) => {
        pool.query('SELECT password,email_id FROM details WHERE email_id = $1', [email], (error, results) => {
            console.log(results.rows)
            if(results.rows.length == 0 ) {
                return reject(false);
            }
            if ((email == (results.rows[0].email_id)) && (password == (results.rows[0].password))) {
                return resolve(true);
            }else{
                return reject(false);
            }
        })
        
    });

};


const getIdByEmail = (email) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT id,email_id FROM details WHERE email_id = $1', [email], (error, results) => {
            
            if (email == results.rows[0].email_id) {
                return resolve(results.rows[0].id);
            } else{
                return reject(error)
            }
            
        });
    })
    
    
};

module.exports = {
    getDetails,
    getDetailById,
    createDetail,
    updateDetail,
    deleteDetail,
    validateEmailAndPassword,
    getIdByEmail
}