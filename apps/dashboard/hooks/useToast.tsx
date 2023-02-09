import { useState } from 'react';
import toast from 'react-hot-toast';

import { sleep } from '~/utils/misc';

export const useToast = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const promise = async function <T>(promise: Promise<T>, delay?: number): Promise<T | undefined> {
    try {
      setIsLoading(true);
      return await toast.promise(
        (async () => {
          const result = await promise;
          if (delay) await sleep(delay);
          return result;
        })(),
        {
          loading: 'Loading...',
          success: (e: T) => {
            setIsLoading(false);
            toast.dismiss('tx.loading');
            return `Succecess`;
          },
          error: (err) => {
            setIsLoading(false);
            toast.dismiss('tx.loading');
            return `${err}`;
          }
        },
        {
          error: {
            id: 'tx.error'
          },
          success: {
            id: 'tx.success'
          },
          loading: {
            id: 'tx.loading'
          }
        }
      );
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  };

  const error = (err: string) => {
    toast.error(`${err}`, {
      id: 'tx.error'
    });
  };

  return {
    isLoading,
    toast: {
      promise,
      error
    }
  };
};
