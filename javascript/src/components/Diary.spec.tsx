import React from 'react';
import { shallow } from "../../enzyme-init";
import Diary from './Diary';
import UtilService from '../services/Util';
import HttpService from '../services/Http';
import { IDiaryEntry } from '../interfaces/DiaryEntry';
import DiaryEntry from './DiaryEntry';

describe("App", () => {
    let showStatus = () => {

    };

    let onRedirect = (to:string) => {
        
    };

    let response:IDiaryEntry[] = [{
        id: 1,
        food: "something good",
        slot: 0,
        thoughts: "oh hi",
        hunger: 0,
        date: "2019/01/01",
        isProblematic: false,
        activity: "busy"
    }];


    it("should have a blank initial state", () => {
        spyOn(UtilService, "isAuthenticated").and.returnValue(true);

        let element = shallow(<Diary onRedirect={onRedirect} showStatus={showStatus} />);
        expect(element.state()).toEqual({
            entries: [],
            filters: []
        });
    });

    it("should fetch entries on load", async () => {
        spyOn(UtilService, "isAuthenticated").and.returnValue(true);

        let promise:Promise<IDiaryEntry[]> = Promise.resolve(response);
        
        spyOn(HttpService, "get").and.returnValue(promise);
        
        let element = shallow(<Diary onRedirect={onRedirect} showStatus={showStatus} />);
        
        await promise;

        expect(HttpService.get).toHaveBeenCalledWith("/api/diary");
                
        expect(element.state()).toEqual({
            entries: response,
            filters: []
        });
    });

    it("should not fetch if not authenticated", async () => {
        spyOn(UtilService, "isAuthenticated").and.returnValue(false);

        let promise:Promise<IDiaryEntry[]> = Promise.resolve(response);
        
        spyOn(HttpService, "get").and.returnValue(promise);
        
        let element = shallow(<Diary onRedirect={onRedirect} showStatus={showStatus} />);
        
        expect(HttpService.get).not.toHaveBeenCalledWith("/api/diary");
                
        expect(element.state()).toEqual({
            entries: [],
            filters: []
        });
    });

    it("should render a DiaryEntry for every entry", async () => {
        spyOn(UtilService, "isAuthenticated").and.returnValue(true);
        let promise:Promise<IDiaryEntry[]> = Promise.resolve(response);        
        spyOn(HttpService, "get").and.returnValue(promise);
        
        let element = shallow(<Diary onRedirect={onRedirect} showStatus={showStatus} />);

        await promise;
        element.update();

        let entries = element.find(DiaryEntry);
        expect(entries.length).toEqual(1);
    });

    it("Should not render a DiaryEntry for items not matching the single filter", async () => {
        spyOn(UtilService, "isAuthenticated").and.returnValue(true);
        let promise:Promise<IDiaryEntry[]> = Promise.resolve(response);        
        spyOn(HttpService, "get").and.returnValue(promise);
        
        let element = shallow(<Diary onRedirect={onRedirect} showStatus={showStatus} />);
        
        await promise;
        element.update();

        element.setState({
            filters: [{
                prop: "slot",
                value: 2
            }]
        });

        element.update();
        let entries = element.find(DiaryEntry);
        expect(entries.length).toEqual(0);
    });

    it("Should not render a DiaryEntry for items not matching all filters", async () => {
        spyOn(UtilService, "isAuthenticated").and.returnValue(true);
        response = [{
            id: 1,
            food: "something good",
            slot: 0,
            thoughts: "oh hi",
            hunger: 0,
            date: "2019/01/01",
            isProblematic: false,
            activity: "busy"
        }, {
            id: 2,
            food: "something else",
            slot: 2,
            thoughts: "hmm",
            hunger: 0,
            date: "2019/10/10",
            isProblematic: true,
            activity: "bored"
        }, {
            id: 3,
            food: "something else again",
            slot: 2,
            thoughts: "i match",
            hunger: 3,
            date: "2019/02/02",
            isProblematic: true,
            activity: "bored again"
        }, {
            id: 4,
            food: "something else again",
            slot: 2,
            thoughts: "i match",
            hunger: 3,
            date: "2019/02/02",
            isProblematic: true,
            activity: "bored again"
        }];

        let promise:Promise<IDiaryEntry[]> = Promise.resolve(response);        
        spyOn(HttpService, "get").and.returnValue(promise);
        
        let element = shallow(<Diary onRedirect={onRedirect} showStatus={showStatus} />);
        
        await promise;
        element.update();

        element.setState({
            filters: [{
                prop: "slot",
                value: 2
            }, {
                prop: "hunger",
                value: 3
            }]
        });

        element.update();
        let entries = element.find(DiaryEntry);
        expect(entries.length).toEqual(2);
    });

    it("Should treat a value of -1 on a filter like 'show me'", async () => {
        spyOn(UtilService, "isAuthenticated").and.returnValue(true);
        response = [{
            id: 1,
            food: "something good",
            slot: 0,
            thoughts: "oh hi",
            hunger: 0,
            date: "2019/01/01",
            isProblematic: false,
            activity: "busy"
        }, {
            id: 2,
            food: "something else",
            slot: 2,
            thoughts: "hmm",
            hunger: 3,
            date: "2019/10/10",
            isProblematic: true,
            activity: "bored"
        }, {
            id: 3,
            food: "something else again",
            slot: 2,
            thoughts: "i match",
            hunger: 3,
            date: "2019/02/02",
            isProblematic: true,
            activity: "bored again"
        }, {
            id: 4,
            food: "something else again",
            slot: 2,
            thoughts: "i match",
            hunger: 3,
            date: "2019/02/02",
            isProblematic: true,
            activity: "bored again"
        }];

        let promise:Promise<IDiaryEntry[]> = Promise.resolve(response);        
        spyOn(HttpService, "get").and.returnValue(promise);
        
        let element = shallow(<Diary onRedirect={onRedirect} showStatus={showStatus} />);
        
        await promise;
        element.update();

        element.setState({
            filters: [{
                prop: "slot",
                value: -1
            }, {
                prop: "hunger",
                value: 3
            }]
        });

        element.update();
        let entries = element.find(DiaryEntry);
        expect(entries.length).toEqual(3);
    });
});

