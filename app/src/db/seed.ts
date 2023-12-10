import { db } from "./conn";
import { taskStatuses } from "./schema";

function seed() {
    return db.insert(taskStatuses).values([{
        name: 'open'
    }, {
        name: 'in progress'
    }, {
        name: 'done'
    }])
}

seed().then(() => {
    console.log('done'); 
    process.exit(0);
});