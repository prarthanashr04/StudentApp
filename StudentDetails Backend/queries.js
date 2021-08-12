const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'students',
    password: 'password',
    port: 5432 , 
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
    const { name, additional_subject, branch, email_id, phone_no, average_percentage } = request.body;

    pool.query('INSERT INTO details (name, additional_subject, branch, email_id, phone_no, average_percentage) VALUES ($1, $2, $3, $4, $5, $6)', [name, additional_subject, branch, email_id, phone_no, average_percentage], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send('Detail added with ID: ${result.insertId}')
    })
}

const updateDetail = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, additional_subject, branch, email_id, phone_no, average_percentage } = request.body
    console.log(id);
    pool.query(
        'UPDATE details SET name = $1, additional_subject = $2, branch = $3, email_id = $4, phone_no = $5, average_percentage = $6 WHERE id = $7',
        [ name, additional_subject, branch, email_id, phone_no, average_percentage , id],
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

module.exports = {
    getDetails,
    getDetailById,
    createDetail,
    updateDetail,
    deleteDetail,
}