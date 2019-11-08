import {all, spawn, call} from "@redux-saga/core/effects";

export function* rootSaga() {
    const sagas = [];

    yield all(sagas.map(saga =>
        spawn(function* () {
            while (true) {
                try {
                    yield call(saga);
                    break
                } catch (e) {
                    console.error(e)
                }
            }
        }))
    );
}