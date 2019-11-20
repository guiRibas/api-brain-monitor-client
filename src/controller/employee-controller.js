import Employee from './../models/employee';

async function findByIdCredential(req, res) {
  let employee = new Employee();
  employee.idCredential = req.params.id;

  try {
    let result = await employee.findByIdCredential();
    return res.status(200).json({
      message: result
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Failed to find by id credential'
    })
  }
}

module.exports = {
  findByIdCredential: findByIdCredential
}
