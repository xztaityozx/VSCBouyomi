//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// import * as vscode from 'vscode';
// import * as myExtension from '../extension';
import * as textUtils from "../textUtil";

// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", function () {

    test("getTextArray",function(){
        const text="Text\nText";
        const actual = textUtils.textUtils.getTextArray(text,["\n"]);
        const expect = ["Text","Text"];

        assert.equal(actual,expect);
    });
    test("getTextArray2",function(){
        const text="Text\nText,Text.Text";
        const actual = textUtils.textUtils.getTextArray(text,["\n",",","."]);
        const expect = ["Text","Text","Text","Text"];

        assert.equal(actual,expect);
    });

    test("splitWith1",function(){
        const expect=["Text","ABC"];
        const actual=textUtils.textUtils.splitWith(["Text,ABC"],",");
        assert.equal(actual,expect);
    });
    test("splitWith2",function(){
        const expect=["Text,ABC"];
        const actual=textUtils.textUtils.splitWith(["Text,ABC"],"\n");
        assert.equal(actual,expect);
    });


});