import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { SetupScreen } from './pages/setup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomeScreen } from './pages/HomeScreen';
import { SelectSensorsScreen } from './pages/SelectSensorsScreen';
import { ChangeOrderScreen } from './pages/ChangeOrderScreen';
import { ChangeNamesIconsScreen } from './pages/ChangeNamesIconsScreen';
import { ChangeSensorNameIconScreen } from './pages/ChangeSensorNameIconScreen';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );


  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/setup" element={<SetupScreen />} />
            <Route path="/select-sensors" element={<SelectSensorsScreen />} />
            <Route path="/change-order" element={<ChangeOrderScreen />} />
            <Route path="/change-names-icons" element={<ChangeNamesIconsScreen />} />
            <Route path="/change-names-icons/:sensor" element={<ChangeSensorNameIconScreen />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>

    </>
  )
}

export default App