// import { SKSchool as School } from "../models/school";
// import { DataMapper } from '@aws/dynamodb-data-mapper';

import * as uuid from 'uuid'

import dynamoDB from "../dynamodb";

const SCHOOLS_TABLE = process.env.SCHOOLS_TABLE;
const QUERY_LIMIT = process.env.QUERY_LIMIT;

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

    const { name, state, address, numberOfStudents } = req.body;

    if (typeof name != 'string') {
        res.status(400).json({ error: 'Type Error: "name" must be a string.' });
        return;
    } else if (typeof address != 'string') {
        res.status(400).json({ error: 'Type Error: "address" must be a string.' });
        return;
    } else if (typeof state != 'string') {
        res.status(400).json({ error: 'Type Error: "state" must be a string.' });
        return;
    } else if (isNaN(Number(numberOfStudents))) {
        res.status(400).json({ error: 'Type Error: "numberOfStudents" must be a number.' });
        return;
    }

    const newSchoolData = {
        id: uuid.v1(),
        name: name,
        address: address,
        state: state,
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
        .then(() => {
            // School successfully created
            res.status(200).json(params.Item);
        })
        .catch((err) => {
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
        return;
    } else if (typeof address != 'string') {
        res.status(400).json({ error: 'Type Error: "address" must be a string.' });
        return;
    } else if (typeof numberOfStudents != 'number') {
        res.status(400).json({ error: 'Type Error: "numberOfStudents" must be a number.' });
        return;
    } if (id == undefined) {
        res.status(400).json({ error: 'Missing Argument: "id" is required query parameter.' })
        return;
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
        .then(() => {
            // School successfully created
            res.status(200).json(params.Item);
        })
        .catch((err) => {
            // School failed to save
            res.status(400).json({ error: 'Failed to Update School. ' + err });
        });
};

/**
 * This function handles list School
 *
 * @todo Move list function into dedicated list.ts file
 *
 * @author Jacktator
 * @since 1.0.0
 */
export const list = (_, res) => {

    const params = {
        TableName: SCHOOLS_TABLE,
        Limit: QUERY_LIMIT
    };

    // fetch all todos from the database
    dynamoDB.scan(params).promise()
        .then((result) => {
            // School successfully listed
            res.status(200).json(result.Items);
        })
        .catch((err) => {
            // School failed to list
            res.status(400).json({ error: 'Failed to List Schools. ' + err });
        });
};

/**
 * This function handles get Schools
 *
 * @todo Move get function into dedicated update.ts file
 *
 * @author Jacktator
 * @since 1.0.0
 */
export const get = (req, res) => {

    const id = req.params.id;

    if (id == undefined) {
        res.status(400).json({ error: 'Missing Argument: "id" is required query parameter.' })
        return;
    }

    const params = {
        TableName: SCHOOLS_TABLE,
        Key: {
            id: id,
        },
    };

    // fetch all todos from the database
    dynamoDB.get(params).promise()
        .then((result) => {
            // School successfully listed
            res.status(200).json(result.Item);
        })
        .catch((err) => {
            // School failed to list
            res.status(400).json({ error: 'Failed to Get Schools. ' + err });
        });
};
