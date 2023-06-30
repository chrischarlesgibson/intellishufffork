import { Subject } from "rxjs";

export class DbService {
  get Db(): any {
    return;
  }

  putLocal(store, data): Promise<{ rowsAffected: any; insertId: any }> {
    return Promise.resolve({ rowsAffected: null, insertId: null });
  }

  get<T>(store: string, key: any): Promise<T | null> {
    return Promise.resolve(null);
  }

  getAll<T>(store: string): Promise<T | null> {
    return Promise.resolve(null);
  }

  remove(store, id): Promise<any> {
    return Promise.resolve(null);
  }

  removeAll(store): Promise<any> {
    return Promise.resolve(null);
  }

  count(store, opts?: { key }): Promise<number> {
    return Promise.resolve(0);
  }

  deleteDb(): Promise<any> {
    return Promise.resolve(null);
  }
}
