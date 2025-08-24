import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";

@Injectable()
export class PathStore extends ComponentStore<string[]> {
    constructor() {
        super([]);
    }

    readonly currentPath$ = this.select(state => state);


    readonly updatePath = this.updater((state, newPath: string[]) => {
        return newPath;
    });

    readonly addPathSegment = this.updater((state, segment: string) => {
        return [...state, segment];
    });
}