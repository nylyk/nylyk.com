import clsx from 'clsx';
import { MouseEvent, useEffect, useState } from 'react';
import { themes } from './themes';
import useLocalStorage from './useLocalStorage';

const App = () => {
  const [themeIndex, setThemeIndex] = useLocalStorage('themeIndex', 0);
  const [themesVisited, setThemesVisited] = useLocalStorage<number[]>(
    'themesVisited',
    new Array(themes.length).fill(0),
  );

  const [achievementGoal, setAchievementGoal] = useLocalStorage(
    'achievementGoal',
    1,
  );
  const [achievementVisible, setAchievementVisible] = useState(false);

  const onClick = (event: MouseEvent) => {
    const element = event.target as HTMLHeadingElement;
    if (!element.classList.contains('animate-spin-once')) {
      setThemeIndex((index) => {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * themes.length);
        } while (
          newIndex === index ||
          themesVisited[newIndex] >= achievementGoal * 2
        );
        return newIndex;
      });

      element.classList.add('animate-spin-once');
      setTimeout(() => {
        element.classList.remove('animate-spin-once');
      }, 500);
    }
  };

  useEffect(() => {
    const newThemesVisited = [...themesVisited];
    newThemesVisited[themeIndex] += 1;
    setThemesVisited(newThemesVisited);
  }, [themeIndex]);

  useEffect(() => {
    if (themesVisited.findIndex((visits) => visits < achievementGoal) === -1) {
      setAchievementGoal(achievementGoal * 2);

      setAchievementVisible(true);
      setTimeout(() => setAchievementVisible(false), 5000);
    }
  }, [themesVisited]);

  return (
    <div
      className={clsx(
        'w-screen h-screen flex flex-col gap-6 justify-center items-center font-mono font-medium transition-colors duration-500',
        themes[themeIndex],
      )}
    >
      <h1 className="text-5xl tracking-tight ease-in-out" onClick={onClick}>
        nylyk
      </h1>
      <div className="flex gap-2">
        not much to see here yet
        <div className="text-2xl leading-none hover:-scale-x-100">🧐</div>
      </div>
      <div
        className={clsx(
          'fixed bottom-10 right-6 ml-6 rounded-lg px-5 py-3 border-2 border-inherit transition duration-300',
          { 'translate-y-[calc(100%+2.5rem)]': !achievementVisible },
        )}
      >
        <div className="text-xl font-bold">Achievement unlocked!</div>
        You saw all Catppuccin colors {achievementGoal / 2}{' '}
        {achievementGoal / 2 === 1 ? 'time' : 'times'}
        <span className="text-xl leading-none"> 🥳</span>
      </div>
    </div>
  );
};

export default App;
