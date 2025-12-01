// GERAR PDF DOS REGISTROS DE FÉRIAS
document.getElementById("gerar-pdf").addEventListener("click", () => {
    const { jsPDF } = window.jspdf; // importa jsPDF
    const doc = new jsPDF(); // cria novo documento

    // CABEÇALHO
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Relatório de Férias", 20, 20);

    doc.setFontSize(12);
    doc.setFont("Helvetica", "normal");

    let y = 40; // posição inicial no PDF

    // VERIFICA SE HÁ REGISTROS
    if (ferias.length === 0) {
        doc.text("Nenhum registro encontrado.", 20, y);
    } else {
        ferias.forEach((item, i) => {
            // INFORMAÇÕES DO REGISTRO
            doc.text(`Registro ${i + 1}:`, 20, y);
            y += 8;
            doc.text(`Nome: ${item.nome}`, 25, y);
            y += 6;
            doc.text(`Início: ${item.inicio}`, 25, y);
            y += 6;
            doc.text(`Fim: ${item.fim}`, 25, y);
            y += 6;
            doc.text(`Dias Solicitados: ${item.diasSolicitados}`, 25, y);
            y += 6;
            doc.text(`Situação: ${item.situacao}`, 25, y);
            y += 6;
            doc.text(`Saldo Restante: ${item.saldo}`, 25, y);
            y += 10;

            // QUEBRA DE PÁGINA AUTOMÁTICA
            if (y > 270) {
                doc.addPage();
                y = 20;
            }
        });
    }

    // SALVAR PDF
    doc.save("relatorio-ferias.pdf");
});
