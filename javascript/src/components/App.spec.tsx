import React from 'react';
import App from './App';
import {mount} from "../../enzyme-init";
import StatusBanner from './StatusBanner';

describe("App", () => {
  it("should have a blank initial state", () => {
    let element = mount(<App />);
    // await promise;
    // element.update();
    // expect(MenuService.getMenuState).toHaveBeenCalledWith(menuId, undefined);

      expect(element.state()).toEqual({
          status: {
            message: "",
            type: ""
          }
      });

      // expect(selectorSet.find(Selector).length).toEqual(2);
  });

  it("should update the banner's when state changes", () => {
    let element = mount(<App />);
    let banner = element.find(StatusBanner);
    expect(banner.state()).toEqual({
      status: {
        message: "",
        type: ""
      }
    });

    element.setState({
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

