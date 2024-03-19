const express = require('express');
const cors = require ('cors');
const {Pool} = require('pg');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const port = 3001;

app.get("/", (req,res)=>{
    const pool = openDb();

    pool.query('SELECT * FROM TASK' , (error, result) => {
        if (error) {
            res.status(500).json({error : error.message});
        }
        res.status(200).json({result : result.rows});

    })
    
});


const openDb = () => {
    const pool = new Pool({
        user: 'postgres', 
        host: 'localhost',
        database: 'todo',      
        password: 'test',
        port: 5432,
    });
    return pool;

}

app.post("/new",(req,res) => {
    const pool = openDb();

    pool.query('insert into task (description) values ($1) returning *',
    [req.body.description],
    (error, result) => {
        if (error) {
            res.status(500).json({error: error.message})
        } else {
            res.status(200).json({id: result.rows[0].id});
        }
    });   
});

/*Start by implementing deletion functionality to the backend. Create delete method, that
receives id as query parameter (e.g., http://localhost:3001/delete/1).*/
app.delete("/delete/:id", async(req, res) => {
    const pool = openDb();
    const id = parseInt(req.params.id);
    pool.query('DELETE FROM task WHERE id = $1', [id], 
    (error, result) => {
        if (error) {
            res.status(500).json({error: error.message});
        } else {
            res.status(200).json({id: id});
        }
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});






