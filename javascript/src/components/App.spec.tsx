import React from 'react';
import App from './App';
import { mount } from "../../enzyme-init";
import StatusBanner from './StatusBanner';
import UtilService from '../services/Util';

describe("App", () => {
    it("should have a blank initial state", () => {
        spyOn(UtilService, "isAuthenticated").and.returnValue(true);

        let app = mount(<App />);
        expect(app.state()).toEqual({
            status: {
                message: "",
                type: ""
            }
        });
    });

    it("should update the banner when state changes", () => {
        let app = mount(<App />);
        let banner = app.find(StatusBanner);
        expect(banner.state()).toEqual({
            status: {
                message: "",
                type: ""
            }
        });

        app.setState({
            status: {
                message: "oh no",
                type: "error"
            }
        });

        banner.update();

        expect(banner.state()).toEqual({
            status: {
                message: "oh no",
                type: "error"
            }
        });
    });
});

