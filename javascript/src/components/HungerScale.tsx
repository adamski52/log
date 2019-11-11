import { IHungerScaleProps } from '../interfaces/HungerScale';
import ScalingSelector from './ScalingSelector';
import UtilService from '../services/Util';

export default class HungerScale extends ScalingSelector {       
    constructor(props:IHungerScaleProps) {
        super(props);

        this.state = {
            ...this.state,
            items: UtilService.getHungerScales()
        };
    }
}

