const toObjectId = (inputString) => {
    let ObjectId = (require('mongoose').Types.ObjectId);    
    const res = new ObjectId(inputString);
    return res;
};

exports.toObjectId = toObjectId;