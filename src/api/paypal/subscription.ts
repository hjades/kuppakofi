import to from 'await-to-js';
import axios from 'axios';

export const getPlans = async () => {
  return to(
    axios({
      method: 'GET',
      url: '/api/billing/plans',
    }),
  );
};
