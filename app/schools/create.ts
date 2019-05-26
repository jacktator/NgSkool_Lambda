// import { SKSchool as School } from "../models/school";
// import { DataMapper } from '@aws/dynamodb-data-mapper';

import dynamoDB from "../dynamodb";
import * as uuid from 'uuid'

const SCHOOLS_TABLE = process.env.SCHOOLS_TABLE;

/**
 * The following mapper could better wrap json data in to Data Model.
 *
 * It's temporarily disabled due to conflict with serverless-local package.
 *
 * @todo    Wait for the fix, and enable Data Model with mapper.
 *
 * @see https://github.com/awslabs/dynamodb-data-mapper-js
 *
 * @author Jack
 * @since 1.0.0
 */
// const mapper = new DataMapper({
//     client: dynamoDB // the SDK client used to execute operations
// });

/**
 * This function handles Creating School
 *
 * @author Jacktator
 * @since 1.0.0
 */
export default function create(req, res) {

    const timestamp = new Date().getTime();

    const { name, address, numberOfStudents } = req.body;

    if (typeof name != 'string') {
        res.status(400).json({ error: 'Type Error: "name" must be a string.' });
    } else if (typeof address != 'string') {
        res.status(400).json({ error: 'Type Error: "address" must be a string.' });
    } else if (typeof numberOfStudents != 'number') {
        res.status(400).json({ error: 'Type Error: "numberOfStudents" must be a number.' });
    }

    const newSchoolData = {
        id: uuid.v1(),
        name: name,
        address: address,
        numberOfStudents: numberOfStudents,
        checked: false,
        createdAt: timestamp,
        updatedAt: timestamp,
    };

    const params = {
        TableName: SCHOOLS_TABLE,
        Item: newSchoolData,
    };

    /**
     * The following commented out code is for Mapper & Data Model usage.
     *
     * DO NOT REMOVE!
     *
     * @todo Debug
     *
     * @author Jacktator
     * @since 1.0.0
     */
    // const newSchool = Object.assign(new School, newSchoolData);
    // mapper.put(newSchool)
    //     .then(savedSchool => {
    //         // School successfully created[
    //         res.status(200).json(savedSchool);
    //     })
    //     .catch(error => {
    //         // School failed to save
    //         console.log(error);
    //         res.status(400).json({ error: 'Failed to save School. ' + error });
    //     });

    dynamoDB.put(params).promise()
        .then(function() {
            // School successfully created
            res.status(200).json(params.Item);
        })
        .catch(function(err) {
            // School failed to save
            res.status(400).json({ error: 'Failed to Create School. ' + err });
        });
};
