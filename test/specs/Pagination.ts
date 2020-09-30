import {HomePage} from '../pageobjects/FlightSearch'
import {HotelSearch} from '../pageobjects/HotelSearch'
import {HotelResults} from '../pageobjects/HotelResults'
import {HotelResultsFor} from '../pageobjects/hotelResultsFor'
import {PaginationHelper} from '../helpers/paginationHelper'
var assert=require('assert');


describe('test Hotel results', () => {
    var hotelSearch:HotelSearch;
    var hotelResults:HotelResults;
    var hotelResultFor:HotelResultsFor;
    var helper:PaginationHelper;
    var allHotelNames:Map<any,any>;

    before(()=>{
        helper=new PaginationHelper();
        hotelSearch=new HotelSearch();
        hotelResults=new HotelResults();
        hotelResultFor=new HotelResultsFor();
        hotelSearch.open();
        browser.maximizeWindow();
        hotelSearch.divertToHotelSearch();
        browser.pause(5000)
        hotelSearch.setDestination('Vancouver, BC, CA');
        hotelSearch.setCheckInCheckOutDate('10-20-20','10-25-20');
        hotelSearch.setAdult('3');
        hotelSearch.clickOnSearch();
        hotelSearch.wait();
        allHotelNames= helper.getAllHotelName();
      
    })

         it('test forword pagination ',()=>{
        let pageNo=11;

        hotelResults.clickOnPage(pageNo);
        browser.pause(10000);
        expect(hotelResults.getStartingIndexOfHotelOnPage()).toBe(helper.getStartingIndexOfHotel(pageNo).toString());
        browser.pause(5000)
    })

    it('test backword pagination ',()=>{
        hotelResults.clickOnPage(2);
        expect(hotelResults.getStartingIndexOfHotelOnPage()).toBe(helper.getStartingIndexOfHotel(2).toString());
        browser.pause(5000)
    })

    it('asscending sort by price',()=>{
       let sortedHotelName:Map<any,any>=helper.asscendingSort(allHotelNames,"price");
       hotelResults.clickOnSortByPrice();
       browser.pause(5000);
       let afterSort:Map<any,any>=helper.getAllHotelName();
       expect(helper.compareTwoPages(afterSort,sortedHotelName,0)).toBe(true);
    })

    it("asscending sort by distance",()=>{
        let sortedHotelName=helper.asscendingSort(allHotelNames,"distance");;
        hotelResults.clickOnSortByDistance();
        browser.pause(5000);
        let afterSort:Map<any,any>=helper.getAllHotelName();
        expect(helper.compareTwoPages(afterSort,sortedHotelName,1)).toBe(true);
      })

    

    it("descendingSort sort by starRaiting",()=>{
        let sortedHotelName=helper.descendingSort(allHotelNames,"raiting");;
        hotelResults.clickOnSortByRaiting();
        browser.pause(5000);
        let afterSort:Map<any,any>=helper.getAllHotelName();
        expect(helper.compareTwoPages(afterSort,sortedHotelName,2)).toBe(true);
    })

    it('asscending sort by hotel name',()=>{
        let sorted=new Map([...Array.from(allHotelNames.entries())].sort());
        hotelResults.clickOnSortByHotelName();
        browser.pause(5000);
        let afterSorting:Map<any,any>= helper.getAllHotelName();
        expect(helper.compareTwoPages(afterSorting,sorted,3)).toBe(true);
    })

    it("descending sort by price",()=>{
        let sortedHotelName:Map<any,any>=helper.descendingSort(allHotelNames,"price");
        hotelResults.clickOnSortByPrice();
        browser.pause(5000)
        hotelResults.clickOnSortByPrice();
        browser.pause(5000);
        let afterSort:Map<any,any>=helper.getAllHotelName();
        expect(helper.compareTwoPages(afterSort,sortedHotelName,0)).toBe(true);
    })

    it("descending sort by distance",()=>{
        let sortedHotelName:Map<any,any>=helper.descendingSort(allHotelNames,"distance");
        hotelResults.clickOnSortByDistance();
        browser.pause(5000)
        hotelResults.clickOnSortByDistance();
        browser.pause(5000);
        let afterSort:Map<any,any>=helper.getAllHotelName();
        expect(helper.compareTwoPages(afterSort,sortedHotelName,0)).toBe(true);
    })

    it("asscending sort by raiting",()=>{
        let sortedHotelName:Map<any,any>=helper.asscendingSort(allHotelNames,"raiting");
        hotelResults.clickOnSortByRaiting();
        browser.pause(5000)
        hotelResults.clickOnSortByRaiting();
        browser.pause(5000);
        let afterSort:Map<any,any>=helper.getAllHotelName();
        expect(helper.compareTwoPages(afterSort,sortedHotelName,0)).toBe(true);
    })
})

