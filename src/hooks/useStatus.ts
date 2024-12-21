import { useEffect, useState } from 'react';

export type Status = 'up' | 'down' | 'unknown';

const useStatus = (url: string): Status => {
  const [status, setStatus] = useState<Status>('unknown');

  useEffect(() => {
    setStatus('unknown');

    let ignore = false;
    fetch(url)
      .then((res) => {
        if (!ignore) {
          setStatus(res.status === 200 ? 'up' : 'down');
        }
      })
      .catch(() => {
        if (!ignore) {
          setStatus('down');
        }
      });

    return () => {
      ignore = true;
    };
  }, [url]);

  return status;
};

export default useStatus;
