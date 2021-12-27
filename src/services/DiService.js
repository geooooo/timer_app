import { createContext } from "react";
import { AppService } from './AppService';
import { AlarmService } from './AlarmService';

export class DiService {
  static context = createContext({
    appService: new AppService(),
    alarmService: new AlarmService(),
  });
}