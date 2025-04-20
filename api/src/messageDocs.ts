/**
 * @swagger
 * /addMessage:
 *   post:
 *     summary: Adiciona uma nova mensagem
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               name:
 *                 type: string
 *               targets:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Mensagem adicionada
 */
