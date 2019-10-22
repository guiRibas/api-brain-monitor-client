import alertController from '../controller/alert-controller';

async function check(idRegistry, label, risk) {
  let errorType = 'Disk' + label;
  let description = 'Disco ' + label + ' com risco ' + risk;

  if (risk < 60) return;

  if (await alertController.findIgnoredAlerts(idRegistry, errorType) > 0) return;

  alertController.create(idRegistry, errorType, description);
}

async function checkBackup(idRegistry, description, qtdBase) {
  let errorType = 'Backup' + description;
  let newDesc = 'Backup do Disco ' + description + ' contém ' + qtdBase + ' repositórios base';

  if (qtdBase < 3) return;

  if (await alertController.findIgnoredAlerts(idRegistry, errorType) > 0) return;

  alertController.create(idRegistry, errorType, newDesc);
}

module.exports = {
  check: check,
  checkBackup: checkBackup
}
