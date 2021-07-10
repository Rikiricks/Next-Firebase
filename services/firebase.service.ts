import firebase from 'firebase'
import { resolveHref } from 'next/dist/next-server/lib/router/router';


const firebaseConfig = {
    apiKey: "AIzaSyC6mu7yDiP1vmxqEPgI-htfdswurpS1l4A",
    authDomain: "next-firebase-66632.firebaseapp.com",
    projectId: "next-firebase-66632",
    storageBucket: "next-firebase-66632.appspot.com",
    messagingSenderId: "75659322457",
    appId: "1:75659322457:web:eea39aa17f026946cdbd48",
    measurementId: "G-NMQZ6GJFV6"
  };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);  
}

var dbRef = firebase.database().ref(); 

export class firebaseService {
  constructor(private name: string){
    
    }

    getAll = () => new Promise<any>((resolve,reject)=>{
      dbRef.child(this.name).once('value', snapshot => {  
        if (snapshot.val() != null) {  
          
          let items = snapshot.val();
         
          let newState = [];
          for (let item in items) {
            newState.push({
              id:item,
              data:items[item]
            });
          }
        resolve(newState);
            
        }  else{
          resolve([]);
        }
    })  
  });

  getById = (id: any) => new Promise<any>((resolve,reject)=>{
    dbRef.child(`${this.name}/${id}`).once('value', snapshot => {  
      if (snapshot.val() != null) {  
        debugger;
        let items = snapshot.val();
       
         let state = { id: id, data: items};
         console.log(JSON.stringify(state));
        // for (let item in items) {
        //   newState.push({
        //     id:item,
        //     data:items[item]
        //   });
        // }
      resolve(items);
          
      }  else{
        resolve([]);
      }
  })  
});

    

  create = (entity: any)=>{
    dbRef.child(this.name).push(  
      entity,  
      err => {  
          if (err)  
              console.log(err)
      })
  }
  
  update = (entity: any, id:any)=>{
    dbRef.child(`${this.name}/${id}`).set(  
      entity,  
      err => {  
          if (err)  
              console.log(err) 
      })  
    
  }
  
   delete = (id: any)=>{
    dbRef.child(`${this.name}/${id}`).remove(  
      err => {  
          if (err)  
              console.log(err)
      }) 
  }
  
}

