// Google Apps Script - Copie este código para Google Apps Script Editor
// 1. Acesse: https://script.google.com/
// 2. Crie um novo projeto
// 3. Cole este código
// 4. Salve e clique em "Deploy" > "New deployment" > "Web app"
// 5. Selecione "Execute as: Me" e "Who has access: Anyone"
// 6. Copie a URL de deployment

const SHEET_ID = "1f77X4VD6UzVO-dQpRXp37sS0v0ghVJZ3U-fdNwrHf3c";
const SHEET_NAME = "Leads"; // Nome da aba na planilha

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Validar dados
    if (!data.name || !data.email || !data.phone) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: "Campos obrigatórios faltando" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // Abrir planilha
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);

    // Se a aba não existe, criar
    if (!sheet) {
      const newSheet = spreadsheet.insertSheet(SHEET_NAME);
      newSheet.appendRow(["Timestamp", "Nome", "Email", "Telefone", "Status", "ROI Estimado"]);
      sheet = newSheet;
    }

    // Adicionar dados
    const timestamp = new Date().toLocaleString("pt-BR");
    const roiEstimado = data.roiEstimado || "Não calculado";
    const status = "Novo Lead";

    sheet.appendRow([timestamp, data.name, data.email, data.phone, status, roiEstimado]);

    // Responder com sucesso
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Dados salvos com sucesso!",
        timestamp: timestamp
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString()
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "Google Apps Script está funcionando!",
      spreadsheetId: SHEET_ID,
      sheetName: SHEET_NAME
    })
  ).setMimeType(ContentService.MimeType.JSON);
}
