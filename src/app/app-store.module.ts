import {RuntimeChecks, StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule, StoreDevtoolsOptions} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";
import {NgModule} from "@angular/core";
import {EffectsModule} from "@ngrx/effects";
import {reducers} from "./store/reducers";
import {metaReducers} from "./store/meta-reducers";
import {effects} from "./store/effects";

const runtimeChecks: RuntimeChecks = {
  strictStateImmutability: true,
  strictActionImmutability: true,
  strictStateSerializability: true,
  strictActionSerializability: true,
  strictActionWithinNgZone: true,
  strictActionTypeUniqueness: true,
}

const options: StoreDevtoolsOptions = {
  maxAge: 30,
  logOnly: environment.production
}

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {metaReducers, runtimeChecks}),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument(options)
  ],
  exports: [
    StoreModule,
    EffectsModule,
    StoreDevtoolsModule
  ]
})
export class AppStoreModule {
}
