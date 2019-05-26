import dynamoDB from "../dynamodb";

const SCHOOLS_TABLE = process.env.SCHOOLS_TABLE;

/**
 * This function handles update Schools
 *
 * @author Jacktator
 * @since 1.0.0
 */
export default function update(req, res) {

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
