import alertController from '../controller/alert-controller';

async function check(idRegistry, label, risk) {
  let errorType = 'Disk' + label;
  let description = 'Disco ' + label + ' com risco ' + risk;

  if (risk < 60) return;

  if (await alertController.findIgnoredAlerts(idRegistry, errorType) > 0) return;

  alertController.create(idRegistry, errorType, description);
}

module.exports = {
  check: check
}
