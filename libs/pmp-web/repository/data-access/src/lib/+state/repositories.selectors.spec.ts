import { Entity, RepositoriesState } from './repositories.reducer';
import { repositoriesQuery } from './repositories.selectors';

describe('Repositories Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getRepositoriesId = it => it['id'];

  let storeState;

  beforeEach(() => {
    const createRepositories = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
    storeState = {
      repositories: {
        list: [
          createRepositories('PRODUCT-AAA'),
          createRepositories('PRODUCT-BBB'),
          createRepositories('PRODUCT-CCC')
        ],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true
      }
    };
  });

  describe('Repositories Selectors', () => {
    it('getAllRepositories() should return the list of Repositories', () => {
      const results = repositoriesQuery.getAllRepositories(storeState);
      const selId = getRepositoriesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelectedRepositories() should return the selected Entity', () => {
      const result = repositoriesQuery.getSelectedRepositories(storeState);
      const selId = getRepositoriesId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = repositoriesQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = repositoriesQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
