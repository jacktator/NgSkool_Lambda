// import { SKSchool as School } from "../models/school";
// import { DataMapper } from '@aws/dynamodb-data-mapper';

import * as uuid from 'uuid'

import dynamoDB from "../dynamodb";

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
 * @todo Move create function into dedicated create.ts file
 *
 * @author Jacktator
 * @since 1.0.0
 */
export const create = (req, res) => {

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

/**
 * This function handles update Schools
 *
 * @todo Move update function into dedicated update.ts file
 *
 * @author Jacktator
 * @since 1.0.0
 */
export const update = (req, res) => {

    const timestamp = new Date().getTime();

    const { name, address, numberOfStudents } = req.body;
    const id = req.params.id;

    if (typeof name != 'string') {
        res.status(400).json({ error: 'Type Error: "name" must be a string.' });
    } else if (typeof address != 'string') {
        res.status(400).json({ error: 'Type Error: "address" must be a string.' });
    } else if (typeof numberOfStudents != 'number') {
        res.status(400).json({ error: 'Type Error: "numberOfStudents" must be a number.' });
    } if (id == undefined) {
        res.status(400).json({ error: 'Missing Argument: "id" is required query parameter.' })
    }

    const newSchoolData = {
        id: id,
        name: name,
        address: address,
        numberOfStudents: numberOfStudents,
        checked: false,
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
            res.status(400).json({ error: 'Failed to Update School. ' + err });
        });
};




// export const list = (req, res) => {

    // TODO: String Query
    // const { name, address, numberOfStudents } = req.body;
    //
    // if (typeof name != 'string') {
    //     res.status(400).json({ error: 'Type Error: "name" must be a string.' });
    // } else if (typeof address != 'string') {
    //     res.status(400).json({ error: 'Type Error: "address" must be a string.' });
    // } else if (typeof numberOfStudents != 'number') {
    //     res.status(400).json({ error: 'Type Error: "numberOfStudents" must be a number.' });
    // }

    // var params = {
    //     RequestItems: { // map of TableName to list of Key to get from each table
    //         table_name_1: {
    //             Keys: [ // a list of primary key value maps
    //                 {
    //                     key_attribute_name: attribute_value, //(string | number | boolean | null | Binary)
    //                     // ... more key attributes, if the primary key is hash/range
    //                 },
    //                 // ... more keys to get from this table ...
    //             ],
    //             AttributesToGet: [ // option (attributes to retrieve from this table)
    //                 'attribute_name',
    //                 // ... more attribute names ...
    //             ],
    //             ConsistentRead: false, // optional (true | false)
    //         },
    //         // ... more tables and keys ...
    //     },
    //     ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)
    // };
    //
    // dynamoDB.batchGet(params, function(error, list) {
    //     if (error) {
    //         // School failed to save
    //         console.log(error);
    //         res.status(400).json({ error: 'Failed to List Schools. ' + error });
    //     } else {
    //         // School successfully created
    //         res.status(200).json(savedSchool);
    //     }
    // });
// };

// module.exports.createSchool = createSchool;
