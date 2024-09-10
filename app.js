// Importar módulo express
const express = require('express');

// Importar módulo express-handlebars
const { engine } = require('express-handlebars');

// Importar módulo mysql
const mysql = require('mysql2');

// App
const app = express();

// Adicionar Bootstrap
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'));

// Adicionar CSS
app.use('/css', express.static('./css'));

// Configuração do express-handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Manipulação de dados via rotas
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Configuração de conexão
const conexao = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'admin',
    database:'projeto'
});

// Teste de conexão
conexao.connect(function(erro){
    if(erro) throw erro;
    console.log('Conexão efetuada com sucesso!')
});

// Rota principal
app.get('/', function(req, res){
    res.render('formulario');
});

//Rota de cadastro
app.post('/cadastrar', function(req, res){
    // Obter os dados que serão utilizados para o cadastro
    let nome = req.body.nome;
    let data_nascimento = req.body.data_nascimento;
    let endereco = req.body.endereco;
    let ministerios = req.body.ministerios;
    let quantidade_filhos = req.body.quantidade_filhos;
    let nome_filhos = req.body.nome_filhos;
    let sugestoes = req.body.sugestoes;

    // SQL
    let sql = `INSERT INTO minha_tabela (nome, endereco, ministerios, quantidade_filhos, nome_filhos, sugestoes) VALUES ('${nome}', '${endereco}', '${ministerios}', '${quantidade_filhos}', '${nome_filhos}', '${sugestoes}')`;

    // Executar comando SQL
    conexao.query(sql, function(erro, retorno){
        // Caso ocorra algum erro
        if(erro) throw erro;

        // Caso ocorra o cadastro
        console.log(retorno);
    });

    res.redirect('/');
});

// Servidor
app.listen(8080);
