export class CanaVariable {
  static variables: Variable[] = [
    { text: 'Is enable retry on failed', key: 'IS_ENABLE_RETRY_ON_FAILED' },
    { text: 'Retry count on failed', key: 'RETRY_COUNT_ON_FAILED' },
    { text: 'Page load time out', key: 'PAGE_LOAD_TIME_OUT' },
    { text: 'Element time out', key: 'ELEMENT_TIME_OUT' }
  ];
  IS_ENABLE_RETRY_ON_FAILED = 'IS_ENABLE_RETRY_ON_FAILED';
  RETRY_COUNT_ON_FAILED = 'RETRY_COUNT_ON_FAILED';
  PAGE_LOAD_TIME_OUT = 'PAGE_LOAD_TIME_OUT';
  ELEMENT_TIME_OUT = 'ELEMENT_TIME_OUT';
}

export class Variable {
  key: string | undefined;
  text: string | undefined;
}
