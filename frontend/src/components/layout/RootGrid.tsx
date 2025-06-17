import type { ReactNode } from 'react';
import styles from './RootGrid.module.css';

/**
 * RootGrid
 * --------------------------------------------------
 * 3-column responsive grid (27 % / 46 % / 27 %)
 * Provides the primary layout skeleton for the synth UI.
 *
 * children[0] → left sidebar
 * children[1] → centre workspace
 * children[2] → right sidebar
 */
interface RootGridProps {
  children: ReactNode;
}

export default function RootGrid({ children }: RootGridProps) {
  return <div className={styles.root}>{children}</div>;
}
