import Page from './../models/page';

async function authorizePages(idCredential) {
  let page = new Page();

  try {
    let result = await page.findAuthorizationsByCredential(idCredential);
    return result
  } catch (err) {
    return err.message || 'Failed to Authorize Pages'
  }
}

module.exports = {
  authorizePages: authorizePages
}
