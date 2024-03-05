// /api/tutorials: GET, POST, DELETE
// /api/tutorials/:id: GET, PUT, DELETE
// /api/tutorials/published: GET

module.exports = (app) => {
  const teachers = require("../controller/teacher.controller");

  var router = require("express").Router();

  /**
   * @swagger
   * components:
   *  schemas:
   *    Teacher:
   *      type: object
   *      properties:
   *        firstName:
   *          type: string
   *          description: first name
   *        lastName:
   *          type: string
   *          description: last name
   *        active:
   *          type: boolean
   *          description: Teacher active status either true or false.
   *        schoolId:
   *          type: integer
   *          description: SchoolId Teacher BelongsTo.
   *      required:
   *        - firstName
   *        - lastName
   *        - active
   *        - schoolId
   *      example:
   *        firstName: John
   *        lastName: Doe
   *        active: false
   *        schoolId: 1
   *
   */

  /**
   * @swagger
   *  tags:
   *    name: Teachers
   *    description: The Teacher API EndPoints.
   */

  /**
   * @swagger
   * /api/teachers/create:
   *  post:
   *      summary: Admin can add a new teacher using this EndPoint.
   *      tags: [Teachers]
   *      description: This EndPoint will allow admin to create a new teacher entry in teachers table in the database.
   *      requestBody:
   *         description: Contains teacher's info to be created in request body
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *              type: object
   *              properties:
   *                firstName:
   *                 type: string
   *                lastName:
   *                  type: string
   *                active:
   *                  type: boolean
   *                schoolId:
   *                  type: integer
   *              required:
   *                - firstName
   *                - lastName
   *                - active
   *                - schoolId
   *              example:
   *                firstName: John
   *                lastName: Doe
   *                active: false
   *                schoolId: 1
   *      responses:
   *       '201':
   *          description: Will show results of created Teacher.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Teacher'
   *
   */
  router.post("/create", teachers.create);

  /**
   * @swagger
   * /api/teachers/list:
   *  get:
   *      summary: Admin can get an array list of all teachers.
   *      tags: [Teachers]
   *      description: This EndPoint will allow admin to get an array of all the teachers in database.
   *      responses:
   *       '200':
   *          description: Will show array results of all Teachers in database.
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Teacher'
   *                example:
   *                  firstName: Mike
   *                  lastName: Jones
   *                  active: true
   *                  
   *
   */
  router.get("/list", teachers.findAll);

  /**
   * @swagger
   * /api/teachers/list/active:
   *  get:
   *      summary: Admin can get an array list of all teachers with active status.
   *      tags: [Teachers]
   *      description: This EndPoint will allow admin to get an array of all the active teachers in database.
   *      responses:
   *       '200':
   *          description: Will show array results of all active Teachers in database.
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Teacher'
   *
   *
   */
  router.get("/list/active", teachers.findAllActive);

  /**
   * @swagger
   * /api/teachers/list/inactive:
   *  get:
   *      summary: Admin can get an array list of all teachers with inactive status.
   *      tags: [Teachers]
   *      description: This EndPoint will allow admin to get an array of all the inactive teachers in database.
   *      responses:
   *       '200':
   *          description: Will show array results of all inactive Teachers in database.
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Teacher'
   *
   */
  router.get("/list/inactive", teachers.findAllInActive);

  /**
   * @swagger
   * /api/teachers/find/{id}:
   *  get:
   *      summary: Admin can get teacher by id
   *      tags: [Teachers]
   *      description: This EndPoint will allow admin to get teacher by id.
   *      parameters:
   *        - in: path
   *          name: id
   *          schema:
   *            type: string
   *          required: true
   *          description: This is the teacherId you want to find in database.
   *      responses:
   *       '200':
   *          description: Will show teacher by id if found
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Teacher'
   *       '404':
   *          description: Could not find Teacher with the provided teacherId
   *
   */
  router.get("/find/:id", teachers.findOne);

  /**
   * @swagger
   * /api/teachers/update/{id}:
   *  put:
   *      summary: Admin can put or update a teacher by teacherId.
   *      tags: [Teachers]
   *      description: This EndPoint will allow admin to make a put http request to update a teacher by teacherId
   *      parameters:
   *        - in: path
   *          name: id
   *          schema:
   *            type: string
   *          required: true
   *          description: This is the teacherId you want to find and then update the teacher details in database.
   *      requestBody:
   *         description: Contains teacher info to be updated in request body
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *              type: object
   *              properties:
   *                firstName:
   *                 type: string
   *                lastName:
   *                  type: string
   *                active:
   *                  type: boolean
   *              required:
   *                - firstName
   *                - lastName
   *                - active
   *              example:
   *                firstName: Mike
   *                lastName: Jones
   *                active: false
   *      responses:
   *       '201':
   *          description: Will show update success message
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Teacher'
   *       '404':
   *          description: Could not update this teacher
   *
   */
  router.put("/update/:id", teachers.update);

  /**
   * @swagger
   * /api/teachers/delete/{id}:
   *  delete:
   *      summary: Admin can delete a teacher by teacherId.
   *      tags: [Teachers]
   *      description: This EndPoint will allow admin to delete a teacher by teacherId.
   *      parameters:
   *        - in: path
   *          name: id
   *          schema:
   *            type: string
   *          required: true
   *          description: This is the SchoolId you want to delete in database.
   *      responses:
   *       '200':
   *          description: Success message teacher was deleted.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Teacher'
   *       '404':
   *          description: Could not find teacher with the provided teacherId to delete.
   *
   */
  router.delete("/delete/:id", teachers.delete);

  /**
   * @swagger
   * /api/teachers/delete-all:
   *  delete:
   *      summary: Admin can delete all teachers.
   *      tags: [Teachers]
   *      description: This EndPoint will allow admin to delete all teachers.
   *      responses:
   *       '200':
   *          description: Success message all Teachers were deleted ok.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Teacher'
   *       '404':
   *          description: Could not delete all the Teachers from the database.
   *
   */
  router.delete("/delete-all", teachers.deleteAll);

  app.use("/api/teachers", router);
};
