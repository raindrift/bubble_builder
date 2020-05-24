import React from 'react';  // eslint-disable-line no-unused-vars

import Link from '@material-ui/core/Link';

const styles = {
  home: {
    height: '100%',
    marginBottom: 56,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

export default function HomeScreen(props) {
  return (
    <Link href={'/new'}>
      <div style={styles.home}>
        (home screen)
      </div>
    </Link>
  )
}
