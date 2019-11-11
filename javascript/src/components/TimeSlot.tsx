import { ITimeSlotProps } from '../interfaces/TimeSlot';
import ScalingSelector from './ScalingSelector';
import UtilService from '../services/Util';

export default class TimeSlot extends ScalingSelector {
    constructor(props:ITimeSlotProps) {
        super(props);
        
        this.state = {
            ...this.state,
            items: UtilService.getTimeSlots()
        };
    }
}