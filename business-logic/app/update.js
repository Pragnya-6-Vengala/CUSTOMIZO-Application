const database = require("../../database");
const { collections } = require("../../database");
const { ObjectId } = require("mongodb");
const utilities = require("../../utilities")



const update = module.exports;
const validStatus = ['approved', 'pending', 'cancelled'];


//This declares an function named logic within the update object. 
//It takes an req parameter, representing an HTTP request.
update.logic = async (req) => {

//These lines extract the userId from the req.user object, 
//the status from the req.body object, and the id from the req.params object. 
    const { userId } = req.user;
    const { status } = req.body;
    const id = req.params.id;



//It initializes two objects, searchKeys and payload. searchKeys is an object, 
//and payload is an empty object that will be used to update the document.
    const searchKeys = { };
    const payload = {}


//These lines check if the provided status is in the validStatus array 
//and if the id is a valid ObjectId. If not, it throws an error. 
    if (!validStatus.includes(status)) throw new Error("Invalid status supplied!");
    if (!ObjectId.isValid(id)) throw new Error("Invalid request ID!")
    
    
//Here, it adds the _id field to the searchKeys object, 
//converting the id to a MongoDB ObjectId. 
//It then logs the searchKeys object to the console.  
    searchKeys._id = new ObjectId(id);

//It sets the status and updatedAt fields in the payload object.
    payload.status = status;
    payload.updatedAt = utilities.getISOTimestamp();

// This line uses findOneAndUpdate to update a document in the REQUESTS collection 
//that matches the searchKeys. It sets the document with the values in the payload object.

    console.log(await database.client.collection(collections.CUSTOMIZO).updateOne(searchKeys, { $set: payload }));
};