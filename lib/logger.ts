import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info', // 何も設定しない場合は 'info' レベル
  formatters: {
    level: (label) => ({ level: label })
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});
