import http from 'k6/http';
import { check } from 'k6';
import { Options } from 'k6/options';

const BASE_URL = 'http://localhost:3333/api/v1';

export const options: Options = {};

export default function () {
  const response = http.get(`${BASE_URL}/health`);

  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  });
}
