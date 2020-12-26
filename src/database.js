import mongoose from 'mongoose'
import config from './config'

(async () => {
    const db = await mongoose.connect(config.mongodbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    console.log('Database is connected at:', db.connection.name);
})();
