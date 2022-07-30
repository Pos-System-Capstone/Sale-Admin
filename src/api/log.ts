import { TLog } from 'types/log';
import { generateAPIWithPaging } from './utils';

const logApi = {
  ...generateAPIWithPaging<TLog>('Logs')
};

export default logApi;
