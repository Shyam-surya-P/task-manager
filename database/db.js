const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://pshyamsurya8:Shyam%408883@taskmanager.rqlnjfo.mongodb.net/task-manager'
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose
        .connect(mongoURI,options)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.log('Error connecting to MongoDB :', error);
        });

        