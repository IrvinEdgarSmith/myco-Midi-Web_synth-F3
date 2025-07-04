import { useTheme } from '../../contexts/ThemeContext';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        <input
          type="checkbox"
          checked={theme === 'light'}
          onChange={toggleTheme}
          className={styles.checkbox}
          aria-label="Toggle between dark and light theme"
        />
        <span className={styles.toggle}>
          <span className={styles.slider}></span>
        </span>
        <span className={styles.text}>
          {theme === 'dark' ? '🌙' : '☀️'} {theme === 'dark' ? 'Dark' : 'Light'}
        </span>
      </label>
    </div>
  );
}