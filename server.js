const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do Multer para lidar com o upload de arquivos PDF
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Rota para upload de arquivos PDF
app.post('/upload', upload.single('pdf'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo PDF enviado' });
  }

  res.status(200).json({ message: 'Arquivo PDF recebido com sucesso', filename: req.file.filename });
});

// Rota estática para acessar os uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
