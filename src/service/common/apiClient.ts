import axios from 'axios';
import {useMount} from 'react-use';
import {getApiUrl} from './util';

export const axiosInterceptor = () => {
  useMount(() => {
    axios.interceptors.request.use(request => {
      request.url = getApiUrl() + request.url;
      console.log(
        '\x1b[47mREQUEST_LOG_BEGIN:\x1b[0m   \n',
        JSON.stringify(request),
        '\n \x1b[47mREQUEST_LOG_END:\x1b[0m',
      );
      return request;
    });
  });
};
