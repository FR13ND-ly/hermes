import { provideState } from "@ngrx/store";
import { userFeature } from "./user/user.reducer";
import { loadingFeature } from "./loading/loading.reduce";

export const stateProviders = [
    provideState(userFeature),
    provideState(loadingFeature)
]