import { action, makeAutoObservable, observable } from "mobx";

class AppStore {
    constructor() {
        makeAutoObservable(this)
    }

    @observable token = ''

    @action changeToken(value: string) {
        this.token = value
    }
}

export default new AppStore();