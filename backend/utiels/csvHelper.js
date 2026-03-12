import csv from "csv-parser";
import { Readable } from "stream";

export function readCsvBuffer(buffer) {
  
  const results = []
  
  const stream = Readable.from(buffer);

  return new Promise((resolve, reject) => {
    stream
      .pipe(csv({
       
      }))
      .on("data", (data) => {
        results.push(data);
      })
      .on("error", (error) => reject(results))
      .on("end", () => {
        resolve(results);
      });
  });

}