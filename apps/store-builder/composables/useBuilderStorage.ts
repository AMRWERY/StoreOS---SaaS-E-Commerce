/**
 * Tiny IndexedDB key-value store for the builder (draft, published design, versions, media).
 * localStorage is far too small (≈5 MB) once merchants upload images, so everything heavy lives here.
 * Every call is safe on the server or when IndexedDB is unavailable (reads → undefined, writes → no-op).
 */

const DB_NAME = 'storeos-builder'
const STORE = 'kv'

let dbPromise: Promise<IDBDatabase> | null = null

const openDb = (): Promise<IDBDatabase> => {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1)
      req.onupgradeneeded = () => req.result.createObjectStore(STORE)
      req.onsuccess = () => resolve(req.result)
      req.onerror = () => reject(req.error)
    })
  }
  return dbPromise
}

const run = async <T,>(mode: IDBTransactionMode, fn: (store: IDBObjectStore) => IDBRequest<T>): Promise<T | undefined> => {
  if (typeof indexedDB === 'undefined') return undefined
  try {
    const db = await openDb()
    return await new Promise<T>((resolve, reject) => {
      const req = fn(db.transaction(STORE, mode).objectStore(STORE))
      req.onsuccess = () => resolve(req.result)
      req.onerror = () => reject(req.error)
    })
  }
  catch {
    return undefined
  }
}

export const idbGet = <T = unknown>(key: string) => run<T>('readonly', s => s.get(key) as IDBRequest<T>)

/** Values are structured-cloned; pass plain data (use JSON.parse(JSON.stringify(x)) for reactive objects). */
export const idbSet = (key: string, value: unknown) => run('readwrite', s => s.put(value, key))

export const idbDel = (key: string) => run('readwrite', s => s.delete(key))
