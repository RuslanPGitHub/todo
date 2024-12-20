// Database connection
const db = require('./db_connect');

// Function for executing queries using promises
function runQuery(query, params = []) {
    return new Promise((resolve, reject) => {
        db.run(query, params, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this);
            }
        });
    });
}

// Function for inserting test data
async function insertTestData() {
    try {
        // Creating the books table
        await runQuery(`CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            user_id INTEGER NOT NULL,
            due_date DATE,
            status VARCHAR(13)
        )`);

        console.log('Data basecreated successfully');
    } catch (err) {
        console.error('Error creating data base:', err);
    } finally {
        // Closing the database
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err);
            } else {
                console.log('Database closed successfully');
            }
        });
    }
}

// Calling the function to create the database
insertTestData();
