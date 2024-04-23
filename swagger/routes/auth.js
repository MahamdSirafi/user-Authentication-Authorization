/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: API to authentication users
 */

/**
 * @swagger
 *   /users/signup:
 *   post:
 *     summary: Register as user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWQ4ZDJjZjBkMmM5NWNiOTM5OTgyZSIsImlhdCI6MTcxMzIxMjcxNywiZXhwIjoxNzIwOTg4NzE3fQ.FbARIC4jDWtOb0koNJK69F2MTu8j9LeS3RaFrT-AP7c
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 */

//                                                      login

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *             example:
 *               email: fake@example.com
 *               password: password1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    exaple:
 *                      status: success
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                    type: string
 *       "401":
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               status: error
 *               message: Invalid email or password
 */

//NOTE                                                        forgotPassword
/**
 * @swagger
 *   /users/forgotPassword:
 *     post:
 *       summary: forgot password
 *       tags: [Auth]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - email
 *               properties:
 *                 email:
 *                   type: string
 *       responses:
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "200":
 *           description: reset password token has been sent
 *           contents:
 *             application/json
 */

//NOTE                                              resetpassword
/**
 * @swagger
 *   /users/resetPassword/{token}:
 *     patch:
 *       summary: forgot password
 *       tags: [Auth]
 *       parameters:
 *       - in: path
 *         name: token
 *         required: true
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - email
 *                 - token
 *               properties:
 *                 password:
 *                   type: string
 *       responses:
 *          "200":
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: string
 *                      example: success
 *                    token:
 *                      type: string
 *                      example: f2hgf3124g2hf4h12g4hg12f4hg1f2h3g12h4f1h2gg12hf41g2f4hg12fh221g4f1h
 *          "401":
 *            description: Password reset failed
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Error'
 *                example:
 *                  status: error
 *                  message: Password reset failed
 */

//NOTE                                       updateMyPassword

/**
 * @swagger
 *   /users/updateMyPassword:
 *     patch:
 *       summary: Update Current User
 *       tags: [Auth]
 *       security:
 *         - Bearer: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                  passwordCurrent:
 *                   type: string
 *                  password:
 *                   type: string
 *       responses:
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 *         "200":
 *           description: Password has been updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: Password has been updated successfully
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout
 *     tags: [Auth]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

exports.updateMe = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    email: { type: 'string' },
    photo: { type: 'string' },
  },
  example: {
    name: 'bahaa',
    email: 'bahaa@gmail.com',
    photo: './public/img/users/dafult.jpg',
  },
};
exports.signUp = {
  type: 'object',
  required: ['name', 'email', 'password'],
  properties: {
    name: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
  },
  example: {
    name: 'bahaa',
    email: 'bahaa@gmail.com',
    password: 'test1234',
  },
};
