const Base = require('./base');

class FetchService extends Base {
  request (options, params) {
    let fetchOptions = Object.assign({}, options, params.connection);

    fetchOptions.headers = Object.assign({
      Accept: 'application/json'
    }, this.options.headers, fetchOptions.headers);

    if (options.body) {
      fetchOptions.body = JSON.stringify(options.body);
    }

    const fetch = this.connection;

    return fetch(options.url, fetchOptions)
      .then(this.checkStatus)
      .then(response => {
        if (response.status === 204) {
          return null;
        }

        return response.json();
      });
  }

  checkStatus (response) {
    if (response.ok) {
      return response;
    }

    return response.json().then(error => {
      error.response = response;
      throw error;
    });
  }
}

module.exports = FetchService;
