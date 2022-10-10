import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (value, id) => {
  console.info("PUT from database");
  const textDb = await openDB("text", 1);
  const text = textDb.transaction("text", "readwrite");
  const store = text.objectStore("text");
  const request = store.put({ id: id, value: value });
  const result = await request;
  console.log("Data saved to database", result);
  // console.error("putDb not implemented");
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.info("GET from database");
  const textDb = await openDB("text", 1);
  const text = textDb.transaction("text", "readwrite");
  const store = text.objectStore("text");
  const request = store.get(id);
  const result = await request;
  console.log("result.value", result);
  // console.error("getDb not implemented");
  return result;
};

initdb();
