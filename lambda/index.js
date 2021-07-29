const faker = require('faker');

const hello = faker.lorem.paragraph(); 

exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
        body:hello,
    };
    return response;
};
