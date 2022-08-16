"use strict";

const NUMBERS_API_URL = 'http://numbersapi.com/';



async function getNumFact (num) {
  const resp = axios.get(`${NUMBERS_API_URL}/${num}?json`);
  return resp;
}

async function appendToDom(){
  const resp = await getNumFact(15);
  $('#number-fact').append(resp.data.text);
}

async function getMultNum(nums){
  const numQueryString = nums.join(',')
  const resp = await axios.get(`http://numbersapi.com/${numQueryString}?json`);
  return resp.data;

}

async function appendMultToDom(){
  const resp = await getMultNum([1,2,3]);
  for(let fact in resp){
    const newFact = $('<div>').append(resp[fact]);
    $('#number-fact').append(newFact);

  }
}

async function diffFactSameNum(num, repeat){
  let i = 1;
  const facts = [];
  while(i <= repeat){
    const fact = axios.get(`http://numbersapi.com/${num}?json`);;
    facts.push(fact);
    i++;
  }
  return await Promise.allSettled(facts);
}

async function appendMultToDom2(num, repeat){
  const resp = await diffFactSameNum(num, repeat);
  const facts = resp.filter(x )
  console.log("response promises:",resp);
  for(let request of resp){
    const newFact = $('<div>').append(request.value.data.text);
    $('#number-fact').append(newFact);

  }
}

appendMultToDom2(15, 5)