import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

interface MovieQuote {
  movie: string;
  quote: string;
  $key?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  readonly quotesPath = '/quotes';

  // This was part of my solution / local only.
  // quoteList: MovieQuote[]  // or Array<MovieQuote>
  quoteList: FirebaseListObservable<MovieQuote[]>;
  movieQuote: MovieQuote = {
    movie: '',
    quote: ''
  };

  // This was my solution, fisher suggested using angularfire2 list feature in the constructor.
  // dbQuoteList = firebase.database().ref('/quotes').on('value', (data) => {
  //   this.quoteList = data.val();
  // });
  editMode: number = -1;
  constructor(db: AngularFireDatabase) { 
    this.quoteList = db.list(this.quotesPath)
  }

  addMovieQuote = () => {
    this.quoteList.push(this.movieQuote);
    let obj;
    if (this.editMode === -1) {
      obj = {
        movie: this.movieQuote.movie,
        quote: this.movieQuote.quote
      }
      console.log('this.quoteList', this.quoteList);
      // if (!this.quoteList) {
      //   this.quoteList = [obj];
      // } else {
      //   this.quoteList.unshift(obj);
      // }
      firebase.database().ref('/quotes').set(this.quoteList);
      // set is the way to go for arrays. Use int key, 1, 2, 3... if you want an object.
      // firebase.database().ref().update(this.quoteList);  
    } else {
      obj = this.quoteList[this.editMode];
      obj.movie = this.movieQuote.movie;
      obj.quote = this.movieQuote.quote;
      this.editMode = -1;
      firebase.database().ref(this.quotesPath).set(this.quoteList);
    }
    
    this.movieQuote = {
      movie: '',
      quote: ''
    }
  }
  editQuote = (quote) => {
    this.movieQuote = {
      movie: quote.movie,
      quote: quote.quote
    }
    // this.editMode = this.quoteList.indexOf(quote);
  }
  deleteQuote = (quote) => {
    // let i = this.quoteList.indexOf(quote);
    // this.quoteList.splice(i,1);
    // firebase.database().ref('/quotes').set(this.quoteList);
  }
}

