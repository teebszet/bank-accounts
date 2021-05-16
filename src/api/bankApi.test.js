import { listAccounts, listTransactions } from './bankApi';

describe('bankApi', () => {
  describe('listAccounts', () => {
    it('should resolve to an array', () => {
      return expect(listAccounts()).resolves.toBeInstanceOf(Array);
    });
  });

  describe('listTransactions', () => {
    it('should resolve an array, if accountId exists', () => {
      return expect(listTransactions('02001')).resolves.toBeInstanceOf(Array);
    });

    it('should reject with a message, if accountId is not provided', () => {
      return expect(listTransactions()).rejects.toThrow();
    });

    it('should reject with a message, if accountId is not found', () => {
      return expect(listTransactions('this does not exist')).rejects.toThrow();
    });
  });
});
