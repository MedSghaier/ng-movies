import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from "@angular/core";
import * as firebase from 'firebase' ;

@Injectable()
export class UserService {
    constructor(private db: AngularFireDatabase){}

    save(user: firebase.User, movies: any[]){
        this.db.object('/users/'+user.uid).update({
            movies: movies
        })
    }

    get(uid: string): FirebaseObjectObservable<any>{
        return this.db.object('/users/'+uid);
    }

}