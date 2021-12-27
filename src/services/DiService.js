import { createContext } from "react";
import { AppService } from './AppService';
import { AlarmService } from './AlarmService';
import { StopwatchService } from "./StopwatchService";
import { TimeService } from "./TimeService";

export class DiService {
  static timeService = new TimeService();

  static context = createContext({
    appService: new AppService(),
    alarmService: new AlarmService(),
    stopwatchService: new StopwatchService(DiService.timeService),
    timeService: DiService.timeService,
  });
}