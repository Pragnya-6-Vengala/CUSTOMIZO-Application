const database = require("../../database");
const { collections } = require("../../database");
const utilities = require("../../utilities")
const {requirements} = require('./constants');

const read = module.exports;

const validStatus = ['approved', 'pending', 'cancelled'];

read.logic = async (req) => {
    
    const limit = parseInt(req.query.limit) || 5;
    const page = parseInt(req.query.page) || 0;
    const status = req.query.status;
    const offset = page*limit;
    const key = {};

    if (status) {
        if (!validStatus.includes(status)) {
            throw new Error('Invalid status ' + status);
        }
        key.status = status;
    }

    const [count, requests] = await Promise.all([
        database.client.collection(collections.CUSTOMIZO).countDocuments(key),
        database.client.collection(collections.CUSTOMIZO).find(key).sort({_id: -1}).skip(offset).limit(limit).toArray()
    ]);

    const collection = await Promise.all(requests.map(async item => {
        const {uid, requirement} = item;
        const user = await database.client.collection(collections.USERS).findOne({userId: uid});
        
        if (user) {
        item.user = utilities.filterObjectByKeys(user, ['username', 'email']);
        } else {
        item.user = {};
        }
        item.image = getImageUrlFromRequirement(requirement);
        

        return item;
    }));

    return utilities.paginate(`/api/app${req.url}`, collection, count, limit, page);
};

function getImageUrlFromRequirement(requirement) {
    let item = requirements.find(e => e.value == String(requirement).toLowerCase().split(' ').join(''));
    return item && item.image;
}