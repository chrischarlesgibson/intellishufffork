export class DbService {
  get Db(): any { return; }
      // @ts-ignore
  putLocal(store, data): Promise<{ rowsAffected, insertId }>{ return; }
      // @ts-ignore
  
  get<T>(store: string, key: any): Promise<T> { return; }
      // @ts-ignore

  getAll<T>(store: string): Promise<T> { return; }
      // @ts-ignore

  remove(store, id): Promise<any>{ return; }
      // @ts-ignore

  removeAll(store): Promise<any>{ return; }
      // @ts-ignore
  count(store, opts?: { key }): Promise<number> { return; }

    // @ts-ignore
  delete(): Promise<any> { return; }
}