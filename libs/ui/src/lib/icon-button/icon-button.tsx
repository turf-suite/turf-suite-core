import styles from './icon-button.module.css';

/* eslint-disable-next-line */
export interface IconButtonProps {}

export function IconButton(props: IconButtonProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to IconButton!</h1>
    </div>
  );
}

export default IconButton;
