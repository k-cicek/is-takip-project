import { Job } from "./types";

const KEY = "jobs";

export function readJobs(): Job[] {
  const read = localStorage.getItem(KEY);
  if (read === null) {
    localStorage.setItem(KEY, JSON.stringify([]));
    return [];
  } else {
    const parseResult = JSON.parse(read);
    return parseResult;
  }
}

export function addJob(job: Job): void {
  //veriyi localstorage dan al
  //job ı []' e ekle
  //localStorage geri yaz.
  const jobsArray = readJobs();
  jobsArray.push(job);
  localStorage.setItem(KEY, JSON.stringify(jobsArray));
}

export function deleteJob(name: string): void {
  //veriyi localstorage dan al
  //veriyi job [] den sil
  //localStorage geri yaz
  const jobsArray = readJobs();
  const index = jobsArray.findIndex((job) => job.name === name);
  jobsArray.splice(index, 1);
  localStorage.setItem(KEY, JSON.stringify(jobsArray));
}
