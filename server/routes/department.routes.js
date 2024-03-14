// /api/tutorials: GET, POST, DELETE
// /api/tutorials/:id: GET, PUT, DELETE
// /api/tutorials/published: GET

module.exports = (app) => {
  const departments = require("../controller/department.controller.js");

  const router = require("express").Router();

  /**
   * @swagger
   * components:
   *  schemas:
   *    Department:
   *      type: object
   *      properties:
   *        name:
   *          type: string
   *          description: The name of the Department.
   *        description:
   *          type: string
   *          description: The Department Description.
   *        active:
   *          type: boolean
   *          description: department active status either true or false.
   *        schoolId:
   *          type: integer
   *          description: department SchoolId.
   *      required:
   *        - name
   *        - schoolId
   *        - active
   *      example:
   *        name: Engineering
   *        description: Engineering Department
   *        active: true
   *        schoolId: 1
   *
   */

  /**
   * @swagger
   *  tags:
   *    name: Departments
   *    description: The Department API EndPoints.
   */

  /**
   * @swagger
   * /api/departments/create:
   *  post:
   *      summary: Admin can add a new Department using this EndPoint.
   *      tags: [Departments]
   *      description: This EndPoint will allow admin to create a Department entry in the database.
   *      requestBody:
   *         description: Contains Department info to be created in request body
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *              type: object
   *              properties:
   *                name:
   *                 type: string
   *                 description: name of the Department.
   *                description:
   *                 type: string
   *                 description: Description of the department
   *                active:
   *                  type: boolean
   *                schoolId:
   *                  type: integer
   *              required:
   *                - name
   *                - active
   *                - schoolId
   *              example:
   *                name: Engineering Department
   *                description: Engineering Faculty Classiciation.
   *                active: true
   *                schoolId: 1
   *      responses:
   *       '201':
   *          description: Will show results of created department.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Department'
   *
   */
  router.post("/create", departments.create);

  /**
   * @swagger
   * /api/departments/list:
   *  get:
   *      summary: Admin can get an array list of all Departments.
   *      tags: [Departments]
   *      description: This EndPoint will allow admin to get an array of all the Departments in database.
   *      responses:
   *       '200':
   *          description: Will show array results of all Departments in database.
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Department'
   *
   */
  router.get("/list", departments.findAll);

  /**
   * @swagger
   * /api/departments/list/active:
   *  get:
   *      summary: Admin can get an array list of all Departments with active status.
   *      tags: [Departments]
   *      description: This EndPoint will allow admin to get an array of all the active Departments in database.
   *      responses:
   *       '200':
   *          description: Will show array results of all Departments in database.
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Department'
   *
   */
  router.get("/list/active", departments.findAllActive);

  /**
   * @swagger
   * /api/departments/list/inactive:
   *  get:
   *      summary: Admin can get an array list of all inactive Departments.
   *      tags: [Departments]
   *      description: This EndPoint will allow admin to get an array of all the inactive Departments in database.
   *      responses:
   *       '200':
   *          description: Will show array results of all disabled Departments in database.
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Department'
   *
   */
  router.get("/list/inactive", departments.findAllInActive);

  /**
   * @swagger
   * /api/departments/find/{id}:
   *  get:
   *      summary: Admin can department by DepartmentId.
   *      tags: [Departments]
   *      description: This EndPoint will allow admin to search and find department by DepartmentId
   *      parameters:
   *        - in: path
   *          name: id
   *          schema:
   *            type: string
   *          required: true
   *          description: This is the DepartmentId you want to find in database.
   *      responses:
   *       '200':
   *          description: if results found will show the found Department object.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Department'
   *       '404':
   *          description: Could not find Department with the provided DepartmentId
   *
   */
  router.get("/find/:id", departments.findOne);

  /**
   * @swagger
   * /api/departments/update/{id}:
   *  put:
   *      summary: Admin can put or update a Department by DepartmentId.
   *      tags: [Departments]
   *      description: This EndPoint will allow admin to make a put http request to update a Department by DepartmentId
   *      parameters:
   *        - in: path
   *          name: id
   *          schema:
   *            type: string
   *          required: true
   *          description: This is the DepartmentId you want to find and update the Department details in database.
   *      requestBody:
   *         description: Contains Department info to be updated in request body
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
   *                schoolId:
   *                  type: integer
   *              required:
   *                - name
   *                - active
   *                - schoolId
   *              example:
   *                name: New Engineering Department
   *                description: The New Department Description
   *                active: false
   *                schoolId: 1
   *      responses:
   *       '201':
   *          description: Will show update success message
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Department'
   *       '404':
   *          description: Could not update this Department details.
   *
   */
  router.put("/update/:id", departments.update);

  /**
   * @swagger
   * /api/departments/delete/{id}:
   *  delete:
   *      summary: Admin can delete a Department by DepartmentId.
   *      tags: [Departments]
   *      description: This EndPoint will allow admin to delete a department by departmentId
   *      parameters:
   *        - in: path
   *          name: id
   *          schema:
   *            type: string
   *          required: true
   *          description: This is the DepartmentId you want to delete in database.
   *      responses:
   *       '200':
   *          description: Success message Department was deleted
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Department'
   *       '404':
   *          description: Could not find Department with the provided DepartmentId to delete
   *
   */
  router.delete("/delete/:id", departments.delete);

  /**
   * @swagger
   * /api/departments/delete-all:
   *  delete:
   *      summary: Admin can delete all Departmens
   *      tags: [Departments]
   *      description: This EndPoint will allow admin to delete all departments data.
   *      responses:
   *       '200':
   *          description: Success message all departments were deleted ok.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Department'
   *       '404':
   *          description: Could not delete all the Departments from the database.
   *
   */
  router.delete("/delete-all", departments.deleteAll);

  app.use("/api/schools", router);
};


