// utils/api.js

import axios from 'axios';

export async function getCount(name:string){
    const response = await axios.get(`https://api.agify.io?name=${name}`);
    return response.data.count;
}

export async function getAge(name:string) {
  const response = await axios.get(`https://api.agify.io?name=${name}`);
  return response.data.age;
}

export async function getGender(name:string) {
  const response = await axios.get(`https://api.genderize.io?name=${name}`);
  return response.data.gender;
}

export async function getCountry(name:string) {
  const response = await axios.get(`https://api.nationalize.io?name=${name}`);
  if (response.data.country.length > 0) {
    return response.data.country;
  } else {
    return [{country_id: "NA", probability: 0}];
  }
}
