const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware para analisar o corpo das solicitações como JSON
app.use(bodyParser.json());

// Dados armazenados em memória
let users = [];

// Criar um novo usuário
app.post('/users', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Nome de usuário e senha são obrigatórios.' });
  }

  const newUser = { id: users.length, username, password }; // Armazenar a senha como texto simples
  users.push(newUser);
  return res.status(201).json(newUser);
});

// Obter todos os usuários
app.get('/users', (req, res) => {
  return res.json(users);
});

// Obter um usuário por ID
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado.' });
  }
  return res.json(user);
});

// Atualizar um usuário por ID
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Nome de usuário e senha são obrigatórios.' });
  }

  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuário não encontrado.' });
  }

  users[userIndex] = { id, username, password }; // Atualizar o usuário com a senha como texto simples
  return res.json(users[userIndex]);
});

// Excluir um usuário por ID
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuário não encontrado.' });
  }
  users.splice(userIndex, 1);
  return res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://192.168.29.76:${PORT}`);
});
