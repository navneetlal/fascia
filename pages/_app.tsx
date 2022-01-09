import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider } from '@mui/material/styles';
import { motion } from 'framer-motion';

import '../styles/globals.css'
import theme from '../theme';

function MyApp({ Component, pageProps, router }) {
  return (
    <ThemeProvider theme={theme}>
      {/* <motion.div
        key={router.route}
        initial={{ x: "100vw" }}
        animate={{ x: "0", opacity: 1, height: '94vh' }}
        transition={{
          delay: 0,
          x: { type: "tween", stiffness: 100 },
          default: { duration: 0.5 },
        }}> */}
        <Component {...pageProps} />
      {/* </motion.div> */}
    </ThemeProvider>
  )
}

export default MyApp
