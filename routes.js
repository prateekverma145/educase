// const exp=ress = require('express');
const router=require('express').Router();
const {addSchool, listSchools} = require('./controller');
/**
 * @swagger
 * /addSchool:
 *   post:
 *     summary: Add a new school
 *     description: |
 *       Creates a new school entry in the database.  
 *       Validates that `name`, `address`, `latitude`, and `longitude` are present and correct.  
 *       Returns `409 Conflict` if an identical school already exists.
 *     tags:
 *       - Schools
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - latitude
 *               - longitude
 *             properties:
 *               name:
 *                 type: string
 *                 description: Full name of the school
 *               address:
 *                 type: string
 *                 description: Street address of the school
 *               latitude:
 *                 type: number
 *                 format: float
 *                 description: GPS latitude, between -90 and 90
 *               longitude:
 *                 type: number
 *                 format: float
 *                 description: GPS longitude, between -180 and 180
 *           example:
 *             name: "Greenwood High"
 *             address: "123 Maple Street, Springfield"
 *             latitude: 37.208957
 *             longitude: -93.292299
 *     responses:
 *       201:
 *         description: School added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 id:
 *                   type: integer
 *             example:
 *               message: "School added successfully"
 *               id: 42
 *       400:
 *         description: Bad Request — missing or invalid fields
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid input data or coordinates"
 *       409:
 *         description: Conflict — duplicate school
 *         content:
 *           application/json:
 *             example:
 *               error: "School already exists"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal DB error"
 */
router.post('/addSchool', addSchool);


/**
 * @swagger
 * /listSchools:
 *   get:
 *     summary: List schools sorted by proximity
 *     description: |
 *       Returns all schools in the database, sorted from nearest to farthest  
 *       relative to the provided `lat` and `lng` query parameters.
 *     tags:
 *       - Schools
 *     parameters:
 *       - in: query
 *         name: lat
 *         schema:
 *           type: number
 *           format: float
 *         required: true
 *         description: User’s latitude coordinate
 *       - in: query
 *         name: lng
 *         schema:
 *           type: number
 *           format: float
 *         required: true
 *         description: User’s longitude coordinate
 *     responses:
 *       200:
 *         description: An array of schools with calculated distances
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   address:
 *                     type: string
 *                   latitude:
 *                     type: number
 *                   longitude:
 *                     type: number
 *                   distance:
 *                     type: number
 *                     description: Distance in kilometers from the query point
 *             example:
 *               - id: 1
 *                 name: "Greenwood High"
 *                 address: "123 Maple Street, Springfield"
 *                 latitude: 37.208957
 *                 longitude: -93.292299
 *                 distance: 0.00
 *               - id: 2
 *                 name: "Lakeside Academy"
 *                 address: "789 Oak Lane, Lake Town"
 *                 latitude: 40.712776
 *                 longitude: -74.005974
 *                 distance: 1574.85
 *       400:
 *         description: Bad Request — missing or invalid coordinates
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid coordinates"
 *       404:
 *         description: No schools found
 *         content:
 *           application/json:
 *             example:
 *               message: "No schools found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Error fetching schools"
 */
router.post('/addSchool', addSchool);
router.get('/listSchools', listSchools);
module.exports = router;
