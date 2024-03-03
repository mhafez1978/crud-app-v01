// /api/tutorials: GET, POST, DELETE
// /api/tutorials/:id: GET, PUT, DELETE
// /api/tutorials/published: GET

module.exports = (app) => {
  const schools = require("../controller/school.controller");

  const router = require("express").Router();

  /**
   * @swagger
   * components:
   *  schemas:
   *    School:
   *      type: object
   *      properties:
   *        name:
   *          type: string
   *          description: The name of the school you're adding.
   *        description:
   *          type: string
   *          description: The School Description
   *        active:
   *          type: boolean
   *          description: School active status either true or false.
   *      required:
   *        - name
   *        - active
   *      example:
   *        name: Contoso.com
   *        description: Business School
   *        active: true
   *
   */

  /**
   * @swagger
   *  tags:
   *    name: Schools
   *    description: The School API EndPoints.
   */

  /**
   * @swagger
   * /api/schools/create:
   *  post:
   *      summary: Admin can add a new school using this EndPoint.
   *      tags: [Schools]
   *      description: This EndPoint will allow admin to create a school entry in schools table in the database.
   *      requestBody:
   *         description: Contains school info to be created in request body
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *              type: object
   *              properties:
   *                name:
   *                 type: string
   *                description:
   *                  type: string
   *                active:
   *                  type: boolean
   *              required:
   *                - name
   *                - active
   *              example:
   *                name: Contoso.com
   *                description: Business School
   *                active: true
   *      responses:
   *       '201':
   *          description: Will show results of created school.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/School'
   *
   */
  router.post("/create", schools.create);

  /**
   * @swagger
   * /api/schools/list:
   *  get:
   *      summary: Admin can get an array list of all schools.
   *      tags: [Schools]
   *      description: This EndPoint will allow admin to get an array of all the schools in database.
   *      responses:
   *       '200':
   *          description: Will show array results of all schools in database.
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/School'
   *
   */
  router.get("/list", schools.findAll);

  /**
   * @swagger
   * /api/schools/list/active:
   *  get:
   *      summary: Admin can get an array list of all schools with active status.
   *      tags: [Schools]
   *      description: This EndPoint will allow admin to get an array of all the active schools in database.
   *      responses:
   *       '200':
   *          description: Will show array results of all schools in database.
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/School'
   *
   */
  router.get("/list/active", schools.findAllActive);

  /**
   * @swagger
   * /api/schools/list/inactive:
   *  get:
   *      summary: Admin can get an array list of all inactive schools.
   *      tags: [Schools]
   *      description: This EndPoint will allow admin to get an array of all the inactive schools in database.
   *      responses:
   *       '200':
   *          description: Will show array results of all disabled schools in database.
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/School'
   *
   */
  router.get("/list/inactive", schools.findAllInActive);

  /**
   * @swagger
   * /api/schools/find/{id}:
   *  get:
   *      summary: Admin can get an array list of all inactive schools.
   *      tags: [Schools]
   *      description: This EndPoint will allow admin to get an array of all the inactive schools in database.
   *      parameters:
   *        - in: path
   *          name: id
   *          schema:
   *            type: string
   *          required: true
   *          description: This is the SchoolId you want to find in database.
   *      responses:
   *       '200':
   *          description: Will show array the school if found or error if not found.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/School'
   *       '404':
   *          description: Could not find school with the provided SchoolId
   *
   */
  router.get("/find/:id", schools.findOne);

  /**
   * @swagger
   * /api/schools/update/{id}:
   *  put:
   *      summary: Admin can put or update a school by schoolId.
   *      tags: [Schools]
   *      description: This EndPoint will allow admin to make a put http request to update a shool by SchoolId
   *      parameters:
   *        - in: path
   *          name: id
   *          schema:
   *            type: string
   *          required: true
   *          description: This is the SchoolId you want to find and update the school details in database.
   *      requestBody:
   *         description: Contains school info to be updated in request body
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *              type: object
   *              properties:
   *                name:
   *                 type: string
   *                description:
   *                  type: string
   *                active:
   *                  type: boolean
   *              required:
   *                - name
   *                - active
   *              example:
   *                name: NewContoso.com
   *                description: The New Business School
   *                active: false
   *      responses:
   *       '201':
   *          description: Will show update success message
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/School'
   *       '404':
   *          description: Could not update this school
   *
   */
  router.put("/update/:id", schools.update);

  /**
   * @swagger
   * /api/schools/delete/{id}:
   *  delete:
   *      summary: Admin can delete a school by SchoolId.
   *      tags: [Schools]
   *      description: This EndPoint will allow admin to delete a school by SchoolId
   *      parameters:
   *        - in: path
   *          name: id
   *          schema:
   *            type: string
   *          required: true
   *          description: This is the SchoolId you want to delete in database.
   *      responses:
   *       '200':
   *          description: Success message school was deleted
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/School'
   *       '404':
   *          description: Could not find school with the provided SchoolId to delete
   *
   */
  router.delete("/delete/:id", schools.delete);

  /**
   * @swagger
   * /api/schools/delete-all:
   *  delete:
   *      summary: Admin can delete a school by SchoolId.
   *      tags: [Schools]
   *      description: This EndPoint will allow admin to delete a school by SchoolId
   *      responses:
   *       '200':
   *          description: Success message all schools were deleted ok.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/School'
   *       '404':
   *          description: Could not delete all the Schools from the database.
   *
   */
  router.delete("/delete-all", schools.deleteAll);

  app.use("/api/schools", router);
};
