import alertController from '../controller/alert-controller';

async function check(idRegistry, label, risk) {
  let errorType = 'Disk' + label;
  let description = 'Disco ' + label + ' com risco ' + risk;

  if (risk < 60) return;

  if (await alertController.findIgnoredAlerts(idRegistry, errorType) > 0) return;

  alertController.create(idRegistry, errorType, description);
}

async function checkRepository(idRegistry, description, qtdBase) {
  let errorType = 'Repo' + description;
  let newDesc = 'Repositório ' + description + ' contem ' + qtdBase + ' backups base';

  if (qtdBase < 3) return;

  alertController.create(idRegistry, errorType, newDesc);
}

module.exports = {
  check: check,
  checkRepository: checkRepository
}
