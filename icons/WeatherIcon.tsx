import { useTheme } from '@mui/material';
import { useEffect } from 'react';
import { Skycons } from 'skycons-ts';
import { IconMapping, TimeOfDay } from '../utility/iconMapping';

interface Props {
  weatherStatusCode: number;
  isDay: number;
}

export const WeatherIcon = (props: Props): JSX.Element => {
    const theme = useTheme()

  const icon = props.isDay
    ? new IconMapping().mapIcon(props.weatherStatusCode, TimeOfDay.day)
    : new IconMapping().mapIcon(props.weatherStatusCode, TimeOfDay.night);

  useEffect(() => {
    const delay = setTimeout(() => {
      const skycons = new Skycons({ color: theme.palette.primary.main });
      skycons.add(`weather-icon`, icon);
      skycons.play();
    }, 1);

    return () => {
      clearTimeout(delay);
    };
  }, [props.weatherStatusCode, icon, theme.palette.primary.main]);

  return <canvas id={`weather-icon`} width="50" height="50"></canvas>;
};