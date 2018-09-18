"use strict";
export module textUtils {
    export function getTextArray(doc: string, delimitor: string[]): string[] {
        var rt: string[] = [doc];
        delimitor.forEach(element => {
            rt = splitWith(rt, element);
        });

        return rt;
    }

    export function splitWith(array: string[], dlm: string): string[] {
        var rt: string[] = [];

        array.forEach(element => {
            rt.push(...element.split(dlm));
        });

        return rt;
    }
}