import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 1}, // below normal load
    { duration: '50s', target: 1},
    { duration: '1m', target: 10 }, // below normal load
    { duration: '2m', target: 10 },
    { duration: '1m', target: 100 }, // around the breaking point
    { duration: '2m', target: 100 },
    { duration: '2m', target: 1000 }, // beyond the breaking point
    { duration: '5m', target: 1000},
    { duration: '10m', target: 0 }, // scale down. Recovery stage.
  ],
};

export default function () {
  const BASE_URL = 'http://localhost:1234'; // make sure this is not production

  const responses = http.batch([
    ['GET', `${BASE_URL}/qa/questions/:question_id/answers?question_id=10000`],
    ['GET', `${BASE_URL}/qa/questions/:question_id/answers?question_id=10001`],
    ['GET', `${BASE_URL}/qa/questions/:question_id/answers?question_id=10002`],
    ['GET', `${BASE_URL}/qa/questions/:question_id/answers?question_id=10003`],
  ]);

  sleep(1);
}