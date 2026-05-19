// Adicione esta função ao seu projeto Apps Script existente.
// Após adicionar, reimplante o Web App (Deploy > Manage deployments > New deployment).
function doPost(e) {
  try {
    const p = JSON.parse(e.postData.contents);
    const a = p.action, g = p.args || [];
    const map = {
      getFuncionarios:           () => getFuncionarios(),
      getLmsDashboardData:       () => getLmsDashboardData(),
      salvarFuncionario:         () => salvarFuncionario(g[0]),
      excluirFuncionario:        () => excluirFuncionario(g[0]),
      getAppsData:               () => getAppsData(),
      adminManageApp:            () => adminManageApp(g[0], g[1]),
      getMeuPerfilHome:          () => getMeuPerfilHome(),
      processarBingo:            () => processarBingo(),
      syncUpdates:               () => syncUpdates(g[0]),
      salvarBingoManual:         () => salvarBingoManual(g[0], g[1]),
      salvarConfMdl:             () => salvarConfMdl(g[0], g[1]),
      atualizarQueryBQ:          () => atualizarQueryBQ(),
      getRawDataDebug:           () => getRawDataDebug(),
      buscarSugestoesDiretorio:  () => buscarSugestoesDiretorio(g[0]),
      captarTudoDoUsuario:       () => captarTudoDoUsuario(g[0]),
      captarMeuPerfil:           () => captarMeuPerfil(),
      debugBingoTabelas:         () => debugBingoTabelas(),
      uploadCsvFaltantes:        () => uploadCsvFaltantes(g[0]),
      sincronizarFaltantesBingo: () => sincronizarFaltantesBingo(),
    };
    if (!map[a]) throw new Error('Ação inválida: ' + a);
    const result = map[a]();
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, data: result }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
