let institutionName = "";
let studentName = "";
let phase = 0;

const phases = [
    {
        title: "1️⃣ Conceito de SQL",
        question: "O que significa SQL?",
        options: [
            "Structured Query Language",
            "Simple Query List",
            "System Quick Language",
            "Standard Question Logic"
        ],
        correct: 0
    },
    {
        title: "2️⃣ CREATE DATABASE",
        question: "Qual comando cria o banco 'escola'?",
        options: [
            "CREATE escola;",
            "CREATE DATABASE escola;",
            "NEW DATABASE escola;",
            "MAKE escola;"
        ],
        correct: 1
    },
    {
        title: "3️⃣ CREATE TABLE",
        question: "Criar tabela alunos com id INT e nome VARCHAR(100):",
        options: [
            "CREATE TABLE alunos (id INT, nome VARCHAR(100));",
            "NEW TABLE alunos;",
            "TABLE alunos CREATE;",
            "ADD TABLE alunos;"
        ],
        correct: 0
    },
    {
        title: "4️⃣ INSERT",
        question: "Inserir aluno id 1 nome Ana:",
        options: [
            "INSERT alunos VALUES (1,'Ana');",
            "INSERT INTO alunos VALUES (1,'Ana');",
            "ADD INTO alunos (1,'Ana');",
            "NEW aluno (1,'Ana');"
        ],
        correct: 1
    },
    {
        title: "5️⃣ SELECT",
        question: "Selecionar todos os alunos:",
        options: [
            "GET alunos;",
            "SELECT alunos;",
            "SELECT * FROM alunos;",
            "SHOW alunos;"
        ],
        correct: 2
    },
    {
        title: "6️⃣ WHERE",
        question: "Selecionar alunos com id = 1:",
        options: [
            "SELECT * FROM alunos WHERE id=1;",
            "SELECT alunos id=1;",
            "GET alunos id=1;",
            "SELECT id=1 FROM alunos;"
        ],
        correct: 0
    },
    {
        title: "7️⃣ UPDATE",
        question: "Atualizar nome para Maria onde id=1:",
        options: [
            "UPDATE alunos SET nome='Maria' WHERE id=1;",
            "CHANGE alunos nome Maria;",
            "SET nome='Maria';",
            "MODIFY alunos;"
        ],
        correct: 0
    },
    {
        title: "8️⃣ DELETE",
        question: "Excluir aluno id=1:",
        options: [
            "REMOVE alunos id=1;",
            "DELETE alunos WHERE id=1;",
            "DELETE FROM alunos WHERE id=1;",
            "DROP alunos id=1;"
        ],
        correct: 2
    },
    {
        title: "9️⃣ DROP",
        question: "Apagar tabela alunos:",
        options: [
            "DELETE TABLE alunos;",
            "DROP alunos;",
            "DROP TABLE alunos;",
            "REMOVE TABLE alunos;"
        ],
        correct: 2
    },
    {
        title: "🔟 ORDER BY",
        question: "Ordenar alunos por nome:",
        options: [
            "SELECT * FROM alunos ORDER BY nome;",
            "ORDER alunos nome;",
            "SORT alunos;",
            "SELECT nome ORDER alunos;"
        ],
        correct: 0
    },
    {
        title: "1️⃣1️⃣ COUNT",
        question: "Contar alunos:",
        options: [
            "SELECT COUNT(*) FROM alunos;",
            "COUNT alunos;",
            "TOTAL alunos;",
            "SELECT SUM(alunos);"
        ],
        correct: 0
    },
    {
        title: "1️⃣2️⃣ GROUP BY",
        question: "Contar alunos por cidade:",
        options: [
            "SELECT COUNT(*) FROM alunos GROUP BY cidade;",
            "GROUP alunos cidade;",
            "SELECT cidade FROM alunos;",
            "COUNT alunos cidade;"
        ],
        correct: 0
    },
    {
        title: "1️⃣3️⃣ JOIN",
        question: "INNER JOIN alunos e cursos:",
        options: [
            "SELECT * FROM alunos INNER JOIN cursos ON alunos.curso_id=cursos.id;",
            "JOIN alunos cursos;",
            "CONNECT alunos cursos;",
            "SELECT alunos,cursos;"
        ],
        correct: 0
    },
    {
        title: "1️⃣4️⃣ ALTER TABLE",
        question: "Adicionar coluna idade INT:",
        options: [
            "ALTER TABLE alunos ADD idade INT;",
            "ADD idade TO alunos;",
            "MODIFY alunos idade;",
            "UPDATE alunos idade;"
        ],
        correct: 0
    },
    {
        title: "1️⃣5️⃣ Intermediário",
        question: "Selecionar alunos com idade > 18 ordenando por nome:",
        options: [
            "SELECT * FROM alunos WHERE idade>18 ORDER BY nome;",
            "SELECT idade>18 FROM alunos;",
            "ORDER alunos idade;",
            "SELECT alunos idade;"
        ],
        correct: 0
    }
];

function startGame() {
    institutionName = document.getElementById("institution").value;
    studentName = document.getElementById("studentName").value;

    if (institutionName === "" || studentName === "") {
        alert("Preencha todos os campos!");
        return;
    }

    document.getElementById("setup").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");

    loadPhase();
}

function loadPhase() {
    let p = phases[phase];

    document.getElementById("phaseTitle").innerText = p.title;
    document.getElementById("question").innerText = p.question;
    document.getElementById("phaseNumber").innerText = phase + 1;
    document.getElementById("feedback").innerText = "";

    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    p.options.forEach((opt, index) => {
        let btn = document.createElement("button");
        btn.className = "option";
        btn.innerText = opt;
        btn.onclick = function () {
            checkAnswer(index);
        };
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(selected) {
    let p = phases[phase];

    if (selected === p.correct) {
        document.getElementById("feedback").innerHTML =
            "<span class='correct'>✅ Correto!</span>";

        phase++;

        if (phase === phases.length) {
            generateCertificate();
        } else {
            setTimeout(loadPhase, 1000);
        }
    } else {
        document.getElementById("feedback").innerHTML =
            "<span class='wrong'>❌ Errado! Tente novamente.</span>";
    }
}

function generateCertificate() {
    document.getElementById("game").classList.add("hidden");
    document.getElementById("certificate").classList.remove("hidden");

    let certNumber = "SQL-" + Date.now();

    let certData = {
        student: studentName,
        institution: institutionName,
        professor: "Jeff Nascimento",
        date: new Date().toLocaleDateString()
    };

    localStorage.setItem(certNumber, JSON.stringify(certData));

    document.getElementById("certText").innerHTML =
        "Certificamos que <strong>" +
        studentName +
        "</strong> concluiu com sucesso o Mini-Curso de SQL da instituição <strong>" +
        institutionName +
        "</strong>.";

    document.getElementById("certNumber").innerText = certNumber;
}

function validateCert() {
    let num = document.getElementById("validateInput").value;
    let data = localStorage.getItem(num);

    if (data) {
        let cert = JSON.parse(data);

        document.getElementById("validationResult").innerHTML =
            "<span class='correct'>✅ Certificado VÁLIDO</span><br>" +
            "Aluno: " + cert.student + "<br>" +
            "Instituição: " + cert.institution + "<br>" +
            "Professor: " + cert.professor + "<br>" +
            "Data: " + cert.date;
    } else {
        document.getElementById("validationResult").innerHTML =
            "<span class='wrong'>❌ Certificado inválido</span>";
    }
}
