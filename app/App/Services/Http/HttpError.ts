// @flow

export default class HttpError extends Error {
  constructor(res: any, path?: string) {
    super(`${path} ${res.problem}`);
    Object.assign(this, res);
  }
}
