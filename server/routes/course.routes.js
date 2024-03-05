// /api/courses: GET, POST, DELETE
// /api/courses/:id: GET, PUT, DELETE
// /api/courses/published: GET

module.exports = (app) => {
  const courses = require("../controller/course.controller.js");

  const router = require("express").Router();

  /**
   * @swagger
   * components:
   *  schemas:
   *    Course:
   *      type: object
   *      properties:
   *        title:
   *          type: string
   *          description: The title of the Course you're adding.
   *        description:
   *          type: string
   *          description: The Course Description
   *        start date:
   *          type: date
   *          description: the Course start date
   *        end date:
   *          type: date
   *          description: the Course end date
   *        active:
   *          type: boolean
   *          description: Course active status either true or false.
   *      required:
   *        - title
   *        - active
   *      example:
   *        title: Engineering Course 1
   *        description: Engineering Department
   *        start date: 09-14-2026
   *        end date: 09-14-2027
   *        active: true
   *
   */

  /**
   * @swagger
   *  tags:
   *    name: Courses
   *    description: The Course API EndPoints.
   */

  /**
   * @swagger
   * /api/courses/create:
   *  post:
   *      summary: Admin can add a new Course using this EndPoint.
   *      tags: [Courses]
   *      description: This EndPoint will allow admin to create a Course entry in the database.
   *      requestBody:
   *         description: Contains Course info to be created in request body
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *              type: object
   *              properties:
   *                title:
   *                 type: string
   *                description:
   *                  type: string
   *                start date:
   *                  type: date
   *                end date:
   *                  type: date
   *                active:
   *                  type: boolean
   *              required:
   *                - title
   *                - active
   *              example:
   *                name: Engineering Course 1
   *                description: Engineering Team Course
   *                active: true
   *
   *      responses:
   *       '201':
   *          description: Will show results of the created Course.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Course'
   *
   */
  router.post("/create", courses.create);

  /**
   * @swagger
   * /api/courses/list:
   *  get:
   *      summary: Admin can get an array list of all departments.
   *      tags: [Courses]
   *      description: This EndPoint will allow admin to get an array of all the Courses in database.
   *      responses:
   *       '200':
   *          description: Will show array results of all Courses in database.
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Course'
   *
   */
  router.get("/list", courses.findAll);

  /**
   * @swagger
   * /api/courses/list/active:
   *  get:
   *      summary: Admin can get an array list of all Courses with active status.
   *      tags: [Courses]
   *      description: This EndPoint will allow admin to get an array of all the active Courses in database.
   *      responses:
   *       '200':
   *          description: Will show array results of all active Courses in database.
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Course'
   *
   */
  router.get("/list/active", courses.findAllActive);

  /**
   * @swagger
   * /api/courses/list/inactive:
   *  get:
   *      summary: Admin can get an array list of all inactive Courses.
   *      tags: [Courses]
   *      description: This EndPoint will allow admin to get an array of all the inactive Courses in database.
   *      responses:
   *       '200':
   *          description: Will show array results of all inactive Courses in database.
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Course'
   *
   */
  router.get("/list/inactive", courses.findAllInActive);

  /**
   * @swagger
   * /api/courses/find/{id}:
   *  get:
   *      summary: Admin can get Course by courseId.
   *      tags: [Courses]
   *      description: This EndPoint will allow admin to get an array of all the inactive courses in database.
   *      parameters:
   *        - in: path
   *          name: id
   *          schema:
   *            type: string
   *          required: true
   *          description: This is the courseId you want to find in database.
   *      responses:
   *       '200':
   *          description: Will show Course matching the id if found or error if not found.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Course'
   *       '404':
   *          description: Could not find Course with the provided CourseId
   *
   */
  router.get("/find/:id", courses.findOne);

  /**
   * @swagger
   * /api/courses/update/{id}:
   *  put:
   *      summary: Admin can put or update a Course by CourseId.
   *      tags: [Courses]
   *      description: This EndPoint will allow admin to make a put http request to update a Course by CourseId
   *      parameters:
   *        - in: path
   *          name: id
   *          schema:
   *            type: string
   *          required: true
   *          description: This is the CourseId you want to find and update the Course details in database.
   *      requestBody:
   *         description: Contains Course info to be updated in request body
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *              type: object
   *              properties:
   *                title:
   *                 type: string
   *                description:
   *                  type: string
   *                start date:
   *                  type: date
   *                end date:
   *                  type: date
   *                active:
   *                  type: boolean
   *              required:
   *                - title
   *                - active
   *              example:
   *                title: Engineering Course 1
   *                description: Engineering Department
   *                start date: 09-14-2026
   *                end date: 09-14-2027
   *                active: disabled
   *      responses:
   *       '202':
   *          description: Will show update success message
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Course'
   *       '404':
   *          description: Could not update this Course
   *
   */
  router.put("/update/:id", courses.update);

  /**
   * @swagger
   * /api/courses/delete/{id}:
   *  delete:
   *      summary: Admin can delete a Course by CourseId.
   *      tags: [Courses]
   *      description: This EndPoint will allow admin to delete a Course by CourseId
   *      parameters:
   *        - in: path
   *          name: id
   *          schema:
   *            type: string
   *          required: true
   *          description: This is the CourseId you want to delete in database.
   *      responses:
   *       '200':
   *          description: Success message Course was deleted
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Course'
   *       '404':
   *          description: Could not find Course with the provided CourseId to delete
   *
   */
  router.delete("/delete/:id", courses.delete);

  /**
   * @swagger
   * /api/courses/delete-all:
   *  delete:
   *      summary: Admin can delete all courses.
   *      tags: [Courses]
   *      description: This EndPoint will allow admin to delete all courses.
   *      responses:
   *       '200':
   *          description: Success message all courses were deleted ok.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Course'
   *       '404':
   *          description: Could not delete all the Courses data from the database.
   *
   */
  router.delete("/delete-all", courses.deleteAll);

  app.use("/api/courses", router);
};
