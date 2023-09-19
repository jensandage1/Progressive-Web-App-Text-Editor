import { openDB } from 'idb';

const initdb = async () =>{
  try {
    console.log('Getting the database');
    openDB('jate', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('jate')) {
          db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
          console.log('jate database created');
        } else {
          console.log('jate database already exists');
        }
      },
    });
  } catch (error) {
    console.error('Error initializing the database:', error);
  }
};

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
  console.log('updating database');
  const jateDb = await openDB('jate', 1);
  console.log("hello", content);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({id: 1, value: content});
  const result = await request;
  console.log('content added to database', result);
} catch (error) {
  console.error('error updating database:', error);
}
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => { 
try {
  console.log('getting data from the jate database');
const jateDb = await openDB('jate', 1);
const tx = jateDb.transaction('jate', 'readonly');
const store = tx.objectStore('jate');
const request = store.getAll();
const result = await request;
console.log('retreived data from database', result);
return result?.value;
} catch (error) {
  console.error('error gettting data from database:', error);
}
};

initdb();
