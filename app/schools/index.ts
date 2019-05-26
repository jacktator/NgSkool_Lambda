import { SKSchool as School } from "../models/school";
import { DataMapper } from '@aws/dynamodb-data-mapper';

const aws = require('aws-sdk');

/**
 * Enabling Offline Development
 *
 * @author Jacktator
 * @since 1.0.0
 */
const IS_OFFLINE = process.env.IS_OFFLINE;
let DynamoDB;
if (IS_OFFLINE === 'true') {
    DynamoDB = new aws.DynamoDB.DocumentClient({
        region: 'localhost',
        endpoint: 'http://localhost:8000'
    });
    console.log(DynamoDB);
} else {
    DynamoDB = new aws.DynamoDB.DocumentClient();
}

const AWS_REGION = process.env.AWS_REGION;
// const SCHOOLS_TABLE = process.env.SCHOOLS_TABLE; // No longer in use

const mapper = new DataMapper({
    client: new DynamoDB({region: AWS_REGION}) // the SDK client used to execute operations
});

/**
 * Function that handles creating School
 * @param req
 * @param res
 */
export const createSchool = (req, res) => {

    const { name, address, numberOfStudents } = req.body;

    if (typeof name != 'string') {
        res.status(400).json({ error: 'Type Error: "name" must be a string.' });
    } else if (typeof address != 'string') {
        res.status(400).json({ error: 'Type Error: "address" must be a string.' });
    } else if (typeof numberOfStudents != 'number') {
        res.status(400).json({ error: 'Type Error: "numberOfStudents" must be a number.' });
    }

    const newSchoolData = {
        "name": name,
        "address": address,
        "numberOfStudents": numberOfStudents,
    };
    const newSchool = Object.assign(new School, newSchoolData);
    mapper.put(newSchool)
        .then(savedSchool => {
            // School successfully created
            res.status(200).json(savedSchool);
        })
        .catch(error => {
            // School failed to save
            console.log(error);
            res.status(400).json({ error: 'Failed to save School. ' + error });
        });
};

module.exports.createSchool = createSchool;
