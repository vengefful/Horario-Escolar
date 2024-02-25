const obterAulas = require("./horario.js");
const fs = require("fs");

function ordenar(a, b) {
  // Dias da semana em ordem personalizada começando com "seg"
  const diasOrdem = ["seg", "ter", "qua", "qui", "sex"];

  // Obtendo o índice de cada dia na ordem personalizada
  const indiceA = diasOrdem.indexOf(a.dia);
  const indiceB = diasOrdem.indexOf(b.dia);

  // Comparando os dias usando a ordem personalizada
  if (indiceA < indiceB) return -1;
  if (indiceA > indiceB) return 1;

  // Se os dias forem iguais, comparar pelos períodos
  const periodoA = parseInt(a.periodo);
  const periodoB = parseInt(b.periodo);
  if (periodoA < periodoB) return -1;
  if (periodoA > periodoB) return 1;

  return 0;
}

const esoEclub = [
  {
    turma: "1I01",
    disciplina: "ESO",
    professor: "",
    dia: "ter",
    periodo: "9",
    turno: "Integral",
  },
  {
    turma: "1I01",
    disciplina: "ESO",
    professor: "",
    dia: "ter",
    periodo: "10",
    turno: "Integral",
  },
  {
    turma: "1I02",
    disciplina: "ESO",
    professor: "",
    dia: "ter",
    periodo: "9",
    turno: "Integral",
  },
  {
    turma: "1I02",
    disciplina: "ESO",
    professor: "",
    dia: "ter",
    periodo: "10",
    turno: "Integral",
  },
  {
    turma: "1I03",
    disciplina: "ESO",
    professor: "",
    dia: "ter",
    periodo: "9",
    turno: "Integral",
  },
  {
    turma: "1I03",
    disciplina: "ESO",
    professor: "",
    dia: "ter",
    periodo: "10",
    turno: "Integral",
  },
  {
    turma: "2I01",
    disciplina: "ESO",
    professor: "",
    dia: "ter",
    periodo: "9",
    turno: "Integral",
  },
  {
    turma: "2I01",
    disciplina: "ESO",
    professor: "",
    dia: "ter",
    periodo: "10",
    turno: "Integral",
  },
  {
    turma: "2I02",
    disciplina: "ESO",
    professor: "",
    dia: "ter",
    periodo: "9",
    turno: "Integral",
  },
  {
    turma: "2I02",
    disciplina: "ESO",
    professor: "",
    dia: "ter",
    periodo: "10",
    turno: "Integral",
  },
  {
    turma: "3I01",
    disciplina: "ESO",
    professor: "",
    dia: "ter",
    periodo: "9",
    turno: "Integral",
  },
  {
    turma: "3I01",
    disciplina: "ESO",
    professor: "",
    dia: "ter",
    periodo: "10",
    turno: "Integral",
  },
  {
    turma: "3I02",
    disciplina: "ESO",
    professor: "",
    dia: "ter",
    periodo: "9",
    turno: "Integral",
  },
  {
    turma: "3I02",
    disciplina: "ESO",
    professor: "",
    dia: "ter",
    periodo: "10",
    turno: "Integral",
  },
  {
    turma: "1I01",
    disciplina: "Clube",
    professor: "",
    dia: "qua",
    periodo: "12",
    turno: "Integral",
  },
  {
    turma: "1I02",
    disciplina: "Clube",
    professor: "",
    dia: "qua",
    periodo: "12",
    turno: "Integral",
  },
  {
    turma: "1I03",
    disciplina: "Clube",
    professor: "",
    dia: "qua",
    periodo: "12",
    turno: "Integral",
  },
  {
    turma: "2I01",
    disciplina: "Clube",
    professor: "",
    dia: "qua",
    periodo: "12",
    turno: "Integral",
  },
  {
    turma: "2I02",
    disciplina: "Clube",
    professor: "",
    dia: "qua",
    periodo: "12",
    turno: "Integral",
  },
  {
    turma: "3I01",
    disciplina: "Clube",
    professor: "",
    dia: "qua",
    periodo: "12",
    turno: "Integral",
  },
  {
    turma: "3I02",
    disciplina: "Clube",
    professor: "",
    dia: "qua",
    periodo: "12",
    turno: "Integral",
  },
];
const aulasPorTurma = {};
const aulasPorTurmaIntegral = {};
const aulasPorTurmaNoturno = {};
const obteraulas = obterAulas();
const aulas = [...obteraulas, ...esoEclub];
const aulasMatutino = aulas.filter((aula) => aula.turno === "Matutino");
const aulasIntegral = aulas.filter((aula) => aula.turno === "Integral");
const aulasNoturno = aulas.filter((aula) => aula.turno === "Noturno");
const turmasMatutino = Array.from(
  new Set(aulasMatutino.map((aula) => aula.turma)),
).sort();
for (let turma of turmasMatutino) {
  const aulasDaTurma = aulas.filter((aula) => aula.turma === turma);
  aulasDaTurma.sort(ordenar);
  aulasPorTurma[turma] = aulasDaTurma;
}
const turmasIntegral = Array.from(
  new Set(aulasIntegral.map((aula) => aula.turma)),
).sort();
for (let turma of turmasIntegral) {
  const aulasDaTurmaIntegral = aulas.filter((aula) => aula.turma === turma);
  aulasDaTurmaIntegral.sort(ordenar);
  aulasPorTurmaIntegral[turma] = aulasDaTurmaIntegral;
}
const turmasNoturno = Array.from(
  new Set(aulasNoturno.map((aula) => aula.turma)),
).sort();
turmasNoturno.pop();
for (let turma of turmasNoturno) {
  const aulasDaTurmaNoturno = aulas.filter((aula) => aula.turma === turma);
  aulasDaTurmaNoturno.sort(ordenar);
  aulasPorTurmaNoturno[turma] = aulasDaTurmaNoturno;
}
const diasSemana = ["seg", "ter", "qua", "qui", "sex"];

const tableContent = `
  <html>
    <head>
      <meta charset="utf-8" />
      <link rel="stylesheet" type="text/css" href="style.css">
      <script src="script.js" defer></script>
    </head>
    <body>
      <h2>Tabela de Aulas - Turno Matutino</h2>
      <table>
        <thead>
          <tr>
            <th rowspan="2"></th>
            ${diasSemana
              .map((dia) => `<th class="semana-row" colspan="5">${dia}</th>`)
              .join("")}
          </tr>
          <tr>
            ${Array.from({ length: 25 })
              .map((_, index) => `<th>${(index % 5) + 1}</th>`)
              .join("")}
          </tr>
        </thead>
        <tbody>
          ${turmasMatutino
            .map((turma) => {
              return `<tr class="turma-row">
                        <td>${turma}</td>
                        ${aulasPorTurma[turma]
                          .map(
                            (aula) =>
                              `<th class="professor-cell" onclick="changeColor(this)">${aula.disciplina}<br>${aula.professor}</th>`,
                          )
                          .join("")}
                      </tr>`;
            })
            .join("")}  
        </tbody>
      </table>
      <h2>Tabela de Aulas - Turno Integral</h2>
      <table>
        <thead>
          <tr>
            <th rowspan="2"></th>
            ${diasSemana
              .map((dia) => `<th class="semana-row" colspan="7">${dia}</th>`)
              .join("")}
          </tr>
          <tr>
            ${Array.from({ length: 35 })
              .map((_, index) => `<th>${(index % 7) + 1}</th>`)
              .join("")}
          </tr>
        </thead>
        <tbody>
          ${turmasIntegral
            .map((turma) => {
              return `<tr class="turma-row">
                        <td>${turma}</td>
                        ${aulasPorTurmaIntegral[turma]
                          .map(
                            (aula) =>
                              `<th class="professor-cell" onclick="changeColor(this)">${aula.disciplina}<br>${aula.professor}</th>`,
                          )
                          .join("")}
                      </tr>`;
            })
            .join("")}  
        </tbody>
      </table>
      <h2>Tabela de Aulas - Turno Noturno</h2>
      <table>
        <thead>
          <tr>
            <th rowspan="2"></th>
            ${diasSemana
              .map((dia) => `<th class="semana-row" colspan="3">${dia}</th>`)
              .join("")}
          </tr>
          <tr>
            ${Array.from({ length: 15 })
              .map((_, index) => `<th>${(index % 3) + 1}</th>`)
              .join("")}
          </tr>
        </thead>
        <tbody>
          ${turmasNoturno
            .map((turma) => {
              return `<tr class="turma-row">
                        <td>${turma}</td>
                        ${aulasPorTurmaNoturno[turma]
                          .map(
                            (aula) =>
                              `<th class="professor-cell" onclick="changeColor(this)">${aula.disciplina}<br>${aula.professor}</th>`,
                          )
                          .join("")}
                      </tr>`;
            })
            .join("")}  
        </tbody>
      </table>
    </body>
  </html>
`;

fs.writeFileSync("index.html", tableContent, "utf-8");
console.log('Arquivo "index.html" salvo com sucesso!');
