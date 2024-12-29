import clsx from 'clsx';
import { FC } from 'react';

const Achievement: FC<{ visible: boolean; achievement: number }> = ({
  visible,
  achievement,
}) => {
  return (
    <div
      className={clsx(
        'fixed bottom-10 right-6 ml-6 rounded-lg px-5 py-3 border-2 border-inherit bg-inherit transition duration-[400ms]',
        { 'translate-y-[calc(100%+2.5rem)]': !visible },
      )}
    >
      <div className="text-xl font-bold">Achievement unlocked!</div>
      You saw all Catppuccin colors {achievement}{' '}
      {achievement === 1 ? 'time' : 'times'}
      <span className="text-xl leading-none"> 🥳</span>
    </div>
  );
};

export default Achievement;
