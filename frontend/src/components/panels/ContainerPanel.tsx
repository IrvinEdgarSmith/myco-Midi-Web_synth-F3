// ContainerPanel.tsx
// Generic UI container with optional advanced toggle
import { useState } from 'react';
import type { ReactNode } from 'react';
import styles from './ContainerPanel.module.css';

interface ContainerPanelProps {
  title: string;
  /** children shown in the main (always-visible) area */
  children: ReactNode;
  /** set true if the panel has an advanced section */
  hasAdvanced?: boolean;
  /** advanced-only content (rendered when toggled) */
  advancedChildren?: ReactNode;
}

export default function ContainerPanel({
  title,
  children,
  hasAdvanced = false,
  advancedChildren,
}: ContainerPanelProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <section className={styles.panel}>
      <header className={styles.header}>
        <h3 className={styles.title}>{title}</h3>

        {hasAdvanced && (
          <button
            className={styles.advancedToggle}
            type="button"
            onClick={() => setShowAdvanced((s) => !s)}
          >
            {showAdvanced ? 'Hide' : 'Advanced'}
          </button>
        )}
      </header>

      <div className={styles.body}>{children}</div>

      {hasAdvanced && showAdvanced && advancedChildren && (
        <div className={styles.advanced}>{advancedChildren}</div>
      )}
    </section>
  );
}
