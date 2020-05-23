const toObjectId = (string) => {
	let ObjectId = (require('mongoose').Types.ObjectId);
    return new ObjectId(string);
};

exports.toObjectId = toObjectId;