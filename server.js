
import express from  'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use(express.json())


app.post('/users', async (req, res) => {

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    }) 

    res.status(201).json(req.body)

})

app.get('/users', async (req, res) => {
    let users = []

    if (req.query){
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    }else {
        users = await prisma.user.findMany()
    }
        

    res.status(200).json(users)
})                 

app.put('/users/:id', async (req, res) => {

    await prisma.user.update({
        where: {
           id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    });
     res.status(201).json({ message: 'User updated' });
    });
    

    app.delete('/users/:id', async (req, res) => {

        await prisma.user.delete({
            where: {
                id: req.params.id,
        }
})

    res.status(200).json({ message: 'User deleted!' })
}) 


app.listen(3000);

/* CRIAR API de usuários
   - criar usuário
   - listar todos os usuários
   - editar um usuário
   - deletar um usuário
    sakamoto
   SYN2Qi1eteCSY7Da
*/



