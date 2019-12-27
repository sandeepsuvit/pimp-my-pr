import { RepositoriesLoaded } from './repositories.actions';
import { RepositoriesState, Entity, initialState, reducer } from './repositories.reducer';

describe('Repositories Reducer', () => {
  const getRepositoriesId = it => it['id'];
  let createRepositories;

  beforeEach(() => {
    createRepositories = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid Repositories actions ', () => {
    it('should return set the list of known Repositories', () => {
      const repositoriess = [createRepositories('PRODUCT-AAA'), createRepositories('PRODUCT-zzz')];
      const action = new RepositoriesLoaded(repositoriess);
      const result: RepositoriesState = reducer(initialState, action);
      const selId: string = getRepositoriesId(result.list[1]);

      expect(result.loaded).toBe(true);
      expect(result.list.length).toBe(2);
      expect(selId).toBe('PRODUCT-zzz');
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;
      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
