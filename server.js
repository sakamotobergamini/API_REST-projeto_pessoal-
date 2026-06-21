import express from 'express';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import { fileURLToPath } from 'url';

// 2. SEGUNDO: configurações e inicializações
const prisma = new PrismaClient();
const app = express();

// 3. TERCEIRO: middlewares
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'views')));

// ROTA PARA SERVIR O INDEX.HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

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

    // ROTA DE LOGIN (valida email/senha)
    app.post('/login', async (req, res) => {
        const { email, password } = req.body;
        
        try {
            // Busca usuário pelo email
            const user = await prisma.user.findUnique({
                where: { email: email }
            });
            
            // Verifica se usuário existe e senha corresponde
            if (user && user.password === password) {
                res.status(200).json({ 
                    success: true, 
                    message: 'Login bem-sucedido!',
                    user: { id: user.id, name: user.name, email: user.email }
                });
            } else {
                res.status(401).json({ 
                    success: false, 
                    message: 'Email ou senha inválidos' 
                });
            }
        } catch (error) {
            res.status(500).json({ 
                success: false, 
                message: 'Erro no servidor' 
            });
        }
    });

/* CRIAR API de usuários
    sakamoto
   SYN2Qi1eteCSY7Da
*/



