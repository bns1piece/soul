import lowdb from 'lowdb';
import FileAsync from 'lowdb/adapters/FileAsync';

import BaseAccessor from '../../src/database/base-accessor';

jest.mock('lowdb', () => jest.fn());
jest.mock('lowdb/adapters/FileAsync', () => jest.fn());

describe('database/base-accessor', () => {
  const mockLowdbInstance = jest.fn();
  const mockWrite = jest.fn();
  let baseAccessor;

  lowdb.mockResolvedValue(mockLowdbInstance);
  mockLowdbInstance.defaults = jest.fn();
  mockLowdbInstance.defaults.mockReturnValue({
    write: mockWrite,
  });

  beforeEach(() => {
    baseAccessor = new BaseAccessor('test-filename', 'test-default-value');
  });

  afterEach(() => {
    mockLowdbInstance.mockReset();
    FileAsync.mockClear();
    mockWrite.mockClear();
  });

  describe('constructor', () => {
    it('call defaults with default value and write', () => {
      expect(mockLowdbInstance.defaults).toBeCalledWith('test-default-value');
      expect(mockWrite).toBeCalled();
    });

    it('call FileAsync with file path', () => {
      expect(FileAsync).toBeCalledWith('data/test-filename.json');
    });

    it('has instance as lowdb instance', () => {
      expect(baseAccessor.instance).toEqual(mockLowdbInstance);
    });
  });

  describe('find', () => {
    it('return instance when path is empty array', () => {
      const result = baseAccessor.find([]);
      expect(result).toEqual(mockLowdbInstance);
    });

  });
});
