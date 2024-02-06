import API from "../API";
import Battlefield from "./Battlefield";
import Combatant from "./Combatant";
import Message from "./Message";
import { makeAutoObservable } from "mobx";

export enum View {
    LogIn,
    Register,
    Dashboard,
    Battlefield,
    Messages
}

export enum EntityType {
    Battlefield,
    Combatant,
    Message
}

export default class App {

    public static readonly instance: App = new App();
    private _currentView: View = View.LogIn;
    private _user: null | { id: number, user: string, profilePic: string } = null;
    private _viewContent = {
        [View.LogIn]: {},
        [View.Register]: {},
        [View.Dashboard]: {},
        [View.Battlefield]: null,
        [View.Messages]: {
            currentConversation: null,
        }
    }

    public readonly [EntityType.Battlefield]: Battlefield[] = []
    public readonly [EntityType.Combatant]: Combatant[] = []
    public readonly [EntityType.Message]: { [key: string]: Message[] } = {}

    private constructor() {
        makeAutoObservable(this);
    }

    public get currentView() {
        return this._currentView;
    }

    public set currentView(view: View) {
        if (view === View.Messages) {
            API.read[EntityType.Message].byUser()
        }
        this._currentView = view;
    }

    public get currentViewContent() {
        return this._viewContent[this._currentView];
    }

    public get user() {
        return this._user;
    }

    public set user(user: null | { id: number, user: string, profilePic: string }) {
        if (user !== null && (this.currentView === View.LogIn || this.currentView === View.Register)) {
            this.currentView = View.Dashboard;
        }
        this._user = user;
    }
}