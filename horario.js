const fs = require("fs");
const xml2js = require("xml2js");

function binarioParaDias(binario) {
  const diasSemana = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];

  const diasSelecionados = binario
    .split("")
    .map((bit, index) => {
      if (bit === "1") {
        return diasSemana[index + 1];
      }
      return null;
    })
    .filter((dia) => dia !== null);

  return diasSelecionados.join(", ");
}

function obterAulas() {
  // Ler o conteúdo do arquivo XML
  const xmlData = fs.readFileSync("horario.xml", "utf-8");

  let aulas;

  // Converter XML para objeto JavaScript
  xml2js.parseString(xmlData, (err, result) => {
    if (err) {
      console.error("Erro ao ler o XML:", err);
      return;
    }

    // A variável 'result' agora contém o objeto JavaScript representando o XML
    // console.log("Conteúdo do XML convertido para objeto JavaScript:", result);

    const teachers = result.timetable.teachers[0].teacher.reduce(
      (dict, teacher) => {
        dict[teacher["$"].id] = teacher["$"].short;
        return dict;
      },
      {},
    );

    const turmas = result.timetable.classes[0].class.reduce((dict, turma) => {
      dict[turma["$"].id] = turma["$"].short;
      return dict;
    }, {});

    const disciplinas = result.timetable.subjects[0].subject.reduce(
      (dict, disciplina) => {
        dict[disciplina["$"].id] = disciplina["$"].short;
        return dict;
      },
      {},
    );

    const dias = result.timetable.daysdefs[0].daysdef.reduce((dict, dia) => {
      dict[dia["$"].id] = dia["$"].short;
      return dict;
    }, {});

    const periodos = result.timetable.periods[0].period.reduce(
      (dict, periodo) => {
        dict[periodo["$"].id] = periodo["$"].short;
        return dict;
      },
      {},
    );

    const licoes = result.timetable.lessons[0].lesson.reduce((dict, licao) => {
      dict[licao["$"].id] = {
        turma: turmas[licao["$"].classids],
        disciplina: disciplinas[licao["$"].subjectid],
        professor: teachers[licao["$"].teacherids],
      };
      return dict;
    }, {});

    aulas = result.timetable.cards[0].card.map((aula) => ({
      turma: licoes[aula["$"].lessonid].turma,
      disciplina: licoes[aula["$"].lessonid].disciplina,
      professor: licoes[aula["$"].lessonid].professor,
      dia: binarioParaDias(aula["$"].days),
      periodo: aula["$"].period,
      turno:
        licoes[aula["$"].lessonid].turma &&
        licoes[aula["$"].lessonid].turma[1] == "M"
          ? "Matutino"
          : licoes[aula["$"].lessonid].turma &&
              licoes[aula["$"].lessonid].turma[1] == "I"
            ? "Integral"
            : "Noturno",
    }));
  });

  return aulas || [];
}

module.exports = obterAulas;
